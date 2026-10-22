# AzurePath — AZ-900 Mission Control

AzurePath is an AI-powered AZ-900 readiness coach designed to help beginner cloud learners understand not only what they got wrong, but why they got it wrong and what they should study next.

Most quiz applications stop at a score.

AzurePath turns mistakes into a learning strategy.

## The Problem

Beginner cloud learners can complete practice questions and still struggle to identify the reason behind their mistakes.

A score such as 60% tells a learner how they performed, but it does not explain:

- which concepts are causing difficulty,
- what type of mistakes they repeatedly make,
- how the concept could be explained differently,
- or whether they genuinely understand the concept afterward.

AzurePath was built around this learning loop:

**Question → Mistake → Diagnose → Explain → Retest → Improve**

## Core Features

### Mission Control

A dynamic readiness dashboard that uses learner history to show:

- questions attempted,
- accuracy,
- topic performance,
- weak areas,
- Mistake DNA,
- and a prototype readiness estimate.

The readiness estimate is an AzurePath learning indicator and is not an official Microsoft certification score or pass prediction.

### Smart Practice

AZ-900 fundamentals practice across areas including:

- Cloud Concepts
- Azure Architecture & Services
- Management & Governance

Practice content is created for learning purposes and does not contain real certification exam questions.

### Mistake DNA

Instead of recording only whether an answer was wrong, AzurePath classifies the type of mistake.

Examples include:

- Concept Gap
- Service Confusion
- Terminology Trap
- Scenario Error

This helps transform incorrect answers into targeted study recommendations.

### Explain It My Way

Learners can approach difficult Azure concepts through different explanation styles:

- Simple
- Exam Ready
- African Context
- Compare It

AzurePath also supports AI-generated explanations so the learner can receive a fresh explanation based on the selected learning style.

Built-in explanations remain available as a fallback.

### Teach It Back

Learners explain an Azure concept in their own words.

AzurePath provides two forms of evaluation:

1. A deterministic concept-coverage check.
2. AI-powered semantic evaluation.

The AI evaluator examines meaning rather than simply checking for keywords.

Feedback includes:

- understanding score,
- concepts understood,
- missing ideas,
- misconceptions,
- and targeted coaching.

### 5-Minute Rescue

AzurePath identifies the learner's dominant mistake pattern and creates a short targeted recovery path:

**Diagnosis → Refresh → Compare → Challenge → Debrief**

## AI Design

AzurePath deliberately does not use generative AI for every feature.

Deterministic application logic is used where predictable behaviour is valuable, including:

- practice scoring,
- learning-history tracking,
- mistake classification,
- dashboard calculations,
- and concept coverage.

Generative AI is used where natural-language understanding adds meaningful value:

- generating alternative explanations,
- and semantically evaluating Teach It Back responses.

This creates a hybrid learning system rather than a generic chatbot.

## Example Learning Journey

A learner explains elasticity incorrectly:

> Elasticity means Azure permanently adds more servers to an application whenever the application is running.

AzurePath's semantic evaluator identifies that the learner understands that resources can be added but detects the misconception that the change is permanent.

The learner receives targeted coaching and tries again.

A stronger explanation can then demonstrate understanding that cloud resources can increase or decrease as demand changes.

This turns assessment into a feedback loop rather than a final score.

## Architecture

```text
Learner
   |
   v
React + Vite
   |
   +---- Local learning history
   |
   v
Supabase
   |
   v
Supabase Edge Function
   |
   v
OpenAI API