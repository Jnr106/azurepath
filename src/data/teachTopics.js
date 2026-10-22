export const teachTopics = [
  {
    id: "elasticity",
    name: "Elasticity",
    category: "Cloud Concepts",
    prompt:
      "Explain cloud elasticity in your own words. Try to explain what happens when demand increases and when it decreases.",
    keywords: [
      ["demand", "traffic", "usage", "workload"],
      ["increase", "grow", "more", "scale up", "scale out"],
      ["decrease", "reduce", "less", "scale down", "scale in"],
      ["resource", "capacity", "computing"],
    ],
    keyIdeas: [
      "Responds to changing demand",
      "Resources can increase",
      "Resources can decrease",
      "Computing capacity changes with demand",
    ],
  },

  {
    id: "availability-zones",
    name: "Availability Zones",
    category: "Azure Architecture & Services",
    prompt:
      "Explain what Availability Zones are and why an organisation might use them.",
    keywords: [
      ["separate", "independent", "different"],
      ["datacenter", "data center", "location"],
      ["region"],
      ["availability", "failure", "resilience", "resiliency"],
    ],
    keyIdeas: [
      "Physically separate locations",
      "Datacenter infrastructure",
      "Located within an Azure region",
      "Help protect workloads from failures",
    ],
  },

  {
    id: "iaas",
    name: "Infrastructure as a Service",
    category: "Cloud Concepts",
    prompt:
      "Explain IaaS and describe what the cloud provider manages versus what the customer still manages.",
    keywords: [
      ["infrastructure", "virtual machine", "vm", "server"],
      ["provider", "azure", "microsoft"],
      ["operating system", "os"],
      ["customer", "user", "manage", "control"],
    ],
    keyIdeas: [
      "Cloud infrastructure is provided",
      "Azure manages physical infrastructure",
      "Customer can manage the operating system",
      "Customer retains significant control",
    ],
  },

  {
    id: "azure-policy",
    name: "Azure Policy",
    category: "Management & Governance",
    prompt:
      "Explain what Azure Policy does and give an example of why an organisation would use it.",
    keywords: [
      ["rule", "rules", "standard", "standards"],
      ["resource", "resources"],
      ["compliance", "comply", "governance"],
      ["enforce", "require", "control"],
    ],
    keyIdeas: [
      "Defines organisational rules or standards",
      "Applies to Azure resources",
      "Supports governance and compliance",
      "Can enforce requirements",
    ],
  },
]