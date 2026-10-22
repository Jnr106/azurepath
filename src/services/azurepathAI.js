import { supabase } from "../lib/supabase"

export async function generateExplanation(
  topic,
  mode
) {
  const { data, error } =
    await supabase.functions.invoke(
      "azurepath-ai",
      {
        body: {
          action: "explain",
          topic,
          mode,
        },
      }
    )

  if (error) {
    console.error(
      "AzurePath AI error:",
      error
    )

    throw new Error(
      "AzurePath couldn't generate an explanation."
    )
  }

  if (!data?.success) {
    throw new Error(
      data?.error ||
        "AzurePath couldn't generate an explanation."
    )
  }

  return data.explanation
}

export async function evaluateTeachBack({
  topic,
  learnerAnswer,
  keyIdeas,
}) {
  const { data, error } =
    await supabase.functions.invoke(
      "azurepath-ai",
      {
        body: {
          action: "teach-back",
          topic,
          learnerAnswer,
          keyIdeas,
        },
      }
    )

  if (error) {
    console.error(
      "Teach It Back AI error:",
      error
    )

    throw new Error(
      "AzurePath couldn't evaluate your explanation."
    )
  }

  if (!data?.success) {
    throw new Error(
      data?.error ||
        "AzurePath couldn't evaluate your explanation."
    )
  }

  return data.evaluation
}