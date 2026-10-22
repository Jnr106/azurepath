const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

const allowedModes = [
  "simple",
  "examReady",
  "africanContext",
  "compare",
]

function jsonResponse(
  body: unknown,
  status = 200
) {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  )
}

function getOutputText(result: any) {
  return (
    result.output
      ?.flatMap(
        (item: any) => item.content || []
      )
      ?.find(
        (content: any) =>
          content.type === "output_text"
      )
      ?.text || ""
  )
}

function buildExplanationInstructions(
  mode: string
) {
  const baseInstructions = `
You are AzurePath, an unofficial AZ-900 learning coach.

Help a beginner understand Microsoft Azure fundamentals accurately.

Rules:
- Focus only on AZ-900-level concepts.
- Never claim to provide real Microsoft exam questions.
- Never claim affiliation with Microsoft.
- Use clear beginner-friendly language.
- Avoid unnecessary advanced detail.
- Keep the explanation roughly 100 to 170 words.
- Accuracy matters more than sounding impressive.
- Carefully distinguish Azure regions, Availability Zones, and region pairs.
`

  const modeInstructions: Record<
    string,
    string
  > = {
    simple: `
Explain the concept as if the learner is completely new to cloud computing.

Use plain language.
Avoid unnecessary jargon.
Use one simple analogy when useful.
`,

    examReady: `
Use terminology appropriate for AZ-900 preparation.

Highlight important distinctions and clues a learner should recognise in fundamentals-level scenarios.

Do not create or reproduce real certification exam questions.
`,

    africanContext: `
Use a relatable African business or everyday-life example.

Keep the example realistic and respectful.
Avoid stereotypes.
Clearly connect the example back to the Azure concept.
`,

    compare: `
Compare the concept with another Azure or cloud concept learners commonly confuse it with.

Clearly explain the difference.
Finish with a short memory clue.
`,
  }

  return (
    baseInstructions +
    (modeInstructions[mode] ||
      modeInstructions.simple)
  )
}

async function callOpenAI(
  openAIKey: string,
  instructions: string,
  input: string,
  maxOutputTokens = 350
) {
  const response = await fetch(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${openAIKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: "gpt-6-luna",
        instructions,
        input,
        max_output_tokens: maxOutputTokens,
      }),
    }
  )

  const result = await response.json()

  if (!response.ok) {
    console.error(
      "OpenAI API error:",
      result
    )

    throw new Error(
      result?.error?.message ||
        "The AI provider returned an error."
    )
  }

  return result
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    })
  }

  try {
    const openAIKey =
      Deno.env.get("OPENAI_API_KEY")

    if (!openAIKey) {
      return jsonResponse(
        {
          success: false,
          error:
            "OPENAI_API_KEY is not configured.",
        },
        500
      )
    }

    const body = await req.json()

    const {
      action,
      topic,
      mode,
      learnerAnswer,
      keyIdeas,
    } = body

    if (
      action !== "explain" &&
      action !== "teach-back"
    ) {
      return jsonResponse(
        {
          success: false,
          error: "Unsupported action.",
        },
        400
      )
    }

    // =====================================
    // EXPLAIN IT MY WAY
    // =====================================

    if (action === "explain") {
      if (
        typeof topic !== "string" ||
        !topic.trim()
      ) {
        return jsonResponse(
          {
            success: false,
            error: "A topic is required.",
          },
          400
        )
      }

      if (!allowedModes.includes(mode)) {
        return jsonResponse(
          {
            success: false,
            error:
              "Invalid explanation mode.",
          },
          400
        )
      }

      const result = await callOpenAI(
        openAIKey,
        buildExplanationInstructions(mode),
        `Explain this AZ-900 concept: ${topic}`,
        300
      )

      const explanation =
        getOutputText(result)

      if (!explanation) {
        throw new Error(
          "The AI response did not contain explanation text."
        )
      }

      return jsonResponse({
        success: true,
        explanation,
        topic,
        mode,
      })
    }

    // =====================================
    // TEACH IT BACK
    // =====================================

    if (action === "teach-back") {
      if (
        typeof topic !== "string" ||
        !topic.trim()
      ) {
        return jsonResponse(
          {
            success: false,
            error: "A topic is required.",
          },
          400
        )
      }

      if (
        typeof learnerAnswer !==
          "string" ||
        learnerAnswer.trim().length < 10
      ) {
        return jsonResponse(
          {
            success: false,
            error:
              "The learner explanation is too short to evaluate.",
          },
          400
        )
      }

      const teachBackInstructions = `
You are AzurePath, an unofficial AZ-900 learning coach.

Evaluate whether a beginner genuinely understands an Azure concept from their own explanation.

Evaluate understanding, not writing quality.

Rules:
- Focus only on AZ-900-level knowledge.
- Do not reward an answer merely for containing technical keywords.
- Judge whether the learner understands the meaning.
- Identify factual misconceptions.
- Do not penalize minor grammar or spelling mistakes.
- Be encouraging but accurate.
- Never claim affiliation with Microsoft.
- Never reproduce or create real certification exam questions.

Return ONLY valid JSON.

Use exactly this structure:

{
  "score": 0,
  "level": "Needs Work",
  "understood": "What the learner understands correctly.",
  "missing": "The most important idea they missed.",
  "misconception": "Any factual misconception, or None.",
  "feedback": "Short coaching feedback telling them what to improve."
}

score must be an integer from 0 to 100.

level must be exactly one of:
"Needs Work"
"Developing"
"Strong"

Score ranges:
0-49 = Needs Work
50-74 = Developing
75-100 = Strong
`

      const expectedIdeas =
        Array.isArray(keyIdeas)
          ? keyIdeas.join(", ")
          : "Evaluate using AZ-900 fundamentals."

      const input = `
AZ-900 concept:
${topic}

Important ideas the learner should understand:
${expectedIdeas}

Learner's explanation:
${learnerAnswer}
`

      const result = await callOpenAI(
        openAIKey,
        teachBackInstructions,
        input,
        350
      )

      const outputText =
        getOutputText(result)

      if (!outputText) {
        throw new Error(
          "The AI response did not contain evaluation text."
        )
      }

      let evaluation

      try {
        const cleanedOutput =
          outputText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim()

        evaluation =
          JSON.parse(cleanedOutput)
      } catch {
        console.error(
          "Invalid Teach It Back JSON:",
          outputText
        )

        throw new Error(
          "The AI evaluation could not be processed."
        )
      }

      const score = Math.max(
        0,
        Math.min(
          100,
          Math.round(
            Number(evaluation.score) || 0
          )
        )
      )

      let level = "Needs Work"

      if (score >= 75) {
        level = "Strong"
      } else if (score >= 50) {
        level = "Developing"
      }

      return jsonResponse({
        success: true,

        evaluation: {
          score,
          level,

          understood:
            evaluation.understood ||
            "No clear strengths identified.",

          missing:
            evaluation.missing ||
            "No major missing concept identified.",

          misconception:
            evaluation.misconception ||
            "None",

          feedback:
            evaluation.feedback ||
            "Review the concept and explain it again in your own words.",
        },
      })
    }

    return jsonResponse(
      {
        success: false,
        error: "Unsupported action.",
      },
      400
    )
  } catch (error) {
    console.error(
      "AzurePath function error:",
      error
    )

    return jsonResponse(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown server error.",
      },
      500
    )
  }
})