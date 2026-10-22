export const explanationTopics = [
  {
    id: "availability-zones",
    name: "Availability Zones",
    category: "Azure Architecture & Services",

    simple:
      "Availability Zones are separate physical locations inside the same Azure region. If something goes wrong in one location, resources in another zone can continue working.",

    examReady:
      "Availability Zones are physically separate datacenter locations within an Azure region. Each zone has independent power, cooling, and networking. They can help improve resiliency and availability for supported Azure workloads.",

    africanContext:
      "Imagine a company operating from three separate office buildings in Johannesburg. Each building has its own electricity and internet connection. If one building loses power, employees in the other buildings can continue working. Availability Zones use a similar idea for datacenters within an Azure region.",

    compare:
      "Region = a geographic area containing Azure datacenters. Availability Zone = a physically separate datacenter location within a region. Region pairs involve separate Azure regions, while Availability Zones provide separation inside one region.",
  },

  {
    id: "iaas-paas-saas",
    name: "IaaS vs PaaS vs SaaS",
    category: "Cloud Concepts",

    simple:
      "IaaS gives you the most control, but you manage more yourself. PaaS lets you focus mainly on your application. SaaS gives you finished software that you simply use.",

    examReady:
      "IaaS provides virtualized computing infrastructure and gives the customer responsibility for areas such as the operating system and applications. PaaS provides a managed platform for developing and deploying applications. SaaS delivers complete applications managed primarily by the service provider.",

    africanContext:
      "Think about accommodation. IaaS is like renting an empty house and managing most things yourself. PaaS is like renting a serviced apartment where much of the infrastructure is handled for you. SaaS is like staying in a hotel where you mainly use the finished service.",

    compare:
      "IaaS: most customer control and management responsibility. PaaS: focus on applications and data while the platform is managed for you. SaaS: use a finished application with the least infrastructure management responsibility.",
  },

  {
    id: "capex-opex",
    name: "CapEx vs OpEx",
    category: "Cloud Concepts",

    simple:
      "CapEx means spending a large amount upfront to buy something. OpEx means paying ongoing costs as you use a service.",

    examReady:
      "Capital expenditure involves an upfront investment in physical infrastructure and assets. Operational expenditure involves ongoing spending on services and resources as they are consumed. Cloud computing commonly supports consumption-based OpEx models.",

    africanContext:
      "Imagine a small business needs delivery vehicles. Buying several vehicles upfront is similar to CapEx. Paying for a delivery service each month based on usage is closer to OpEx.",

    compare:
      "CapEx = upfront investment, ownership and maintenance of assets. OpEx = ongoing operational spending, usually tied more closely to consumption. Cloud services can reduce the need for large upfront infrastructure purchases.",
  },

  {
    id: "scaling-elasticity",
    name: "Scaling vs Elasticity",
    category: "Cloud Concepts",

    simple:
      "Scaling changes how much computing power you have. Elasticity means those resources can grow when demand increases and shrink when demand decreases.",

    examReady:
      "Scaling adjusts computing capacity. Vertical scaling changes the capacity of an individual resource, while horizontal scaling changes the number of resources. Elasticity refers to dynamically adjusting resources in response to changing demand.",

    africanContext:
      "Imagine an online retailer during a major sale. Adding more checkout counters is like scaling out. Using larger, faster checkout counters is like scaling up. Opening extra counters during the rush and closing them afterward demonstrates elasticity.",

    compare:
      "Vertical scaling = scale up or down by changing resource capacity. Horizontal scaling = scale out or in by changing the number of resources. Elasticity = dynamically matching resources to changing demand.",
  },

  {
    id: "resource-hierarchy",
    name: "Azure Resource Hierarchy",
    category: "Management & Governance",

    simple:
      "Azure organises resources in levels. Resources belong to resource groups, resource groups belong to subscriptions, and subscriptions can belong to management groups.",

    examReady:
      "Azure's management hierarchy can include management groups, subscriptions, resource groups, and resources. Management groups help manage multiple subscriptions, subscriptions provide management and billing boundaries, and resource groups logically organise related resources.",

    africanContext:
      "Think of a large company with several branches. The entire company is like a management group, individual business divisions can resemble subscriptions, departments can resemble resource groups, and the actual equipment used by those departments represents resources.",

    compare:
      "Management Group → can organise multiple subscriptions. Subscription → management and billing boundary. Resource Group → logical container for resources. Resource → an individual Azure service instance.",
  },
]