export const questions = [
  {
    id: 1,
    topic: "Cloud Concepts",
    difficulty: "Foundation",
    question:
      "A growing online store experiences a huge increase in visitors during a weekend sale. Which cloud concept allows resources to increase when demand rises and reduce when demand falls?",
    options: [
      "High availability",
      "Elasticity",
      "Capital expenditure",
      "Governance",
    ],
    correctAnswer: "Elasticity",
    mistakeType: "Concept Gap",
    explanation:
      "Elasticity means cloud resources can expand when demand increases and shrink again when demand decreases.",
    simpleExplanation:
      "Think of elasticity as stretching and shrinking. Azure can use more resources when the store gets busy and fewer when traffic drops.",
    localExample:
      "Imagine a South African online retailer during Black Friday. Traffic suddenly increases, so extra cloud resources are added to handle shoppers and reduced again after the rush.",
  },

  {
    id: 2,
    topic: "Azure Architecture & Services",
    difficulty: "Foundation",
    question:
      "A company wants to run its application in Azure while keeping full control of the operating system. Which cloud service model best fits this requirement?",
    options: [
      "Software as a Service (SaaS)",
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Serverless computing",
    ],
    correctAnswer: "Infrastructure as a Service (IaaS)",
    mistakeType: "Service Confusion",
    explanation:
      "IaaS provides virtualized infrastructure while leaving the customer responsible for areas such as the operating system and applications.",
    simpleExplanation:
      "With IaaS, Azure provides the virtual computer, but you still manage much of what runs inside it.",
    localExample:
      "Imagine renting an empty office in Johannesburg. The building is provided, but you decide how the inside is configured. IaaS works in a similar way.",
  },

  {
    id: 3,
    topic: "Azure Architecture & Services",
    difficulty: "Exam Ready",
    question:
      "An organisation wants its application to remain available if one Azure datacenter in a region experiences a failure. Which Azure feature is designed for this scenario?",
    options: [
      "Resource groups",
      "Availability Zones",
      "Azure Policy",
      "Management groups",
    ],
    correctAnswer: "Availability Zones",
    mistakeType: "Scenario Error",
    explanation:
      "Availability Zones are physically separate datacenter locations within an Azure region, helping workloads remain available if one location fails.",
    simpleExplanation:
      "Availability Zones let you spread resources across separate locations so one datacenter problem does not have to stop your application.",
    localExample:
      "Think of a business operating from multiple independent buildings in the same city. If one building loses power, another can continue operating.",
  },

  {
    id: 4,
    topic: "Management & Governance",
    difficulty: "Foundation",
    question:
      "Which Azure feature can enforce rules such as requiring specific tags on newly created resources?",
    options: [
      "Microsoft Entra ID",
      "Azure Policy",
      "Azure Functions",
      "Azure Monitor",
    ],
    correctAnswer: "Azure Policy",
    mistakeType: "Service Confusion",
    explanation:
      "Azure Policy helps organisations enforce standards and assess whether Azure resources comply with defined rules.",
    simpleExplanation:
      "Azure Policy acts like a rulebook for your Azure resources.",
    localExample:
      "Imagine a company rule saying every new asset must be labelled with its department and owner. Azure Policy can enforce similar rules for cloud resources.",
  },

  {
    id: 5,
    topic: "Cloud Concepts",
    difficulty: "Exam Ready",
    question:
      "A business pays for cloud computing resources as it uses them instead of buying servers upfront. Which financial model does this best represent?",
    options: [
      "Capital expenditure (CapEx)",
      "Operational expenditure (OpEx)",
      "High availability",
      "Fault tolerance",
    ],
    correctAnswer: "Operational expenditure (OpEx)",
    mistakeType: "Terminology Trap",
    explanation:
      "OpEx involves ongoing spending on services as they are consumed instead of making a large upfront investment in infrastructure.",
    simpleExplanation:
      "OpEx means paying as you use something instead of buying expensive equipment first.",
    localExample:
      "It is similar to a small business paying monthly for a service rather than purchasing and maintaining expensive equipment upfront.",
  },
]