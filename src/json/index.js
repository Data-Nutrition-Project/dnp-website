const data = {
  overview: {
    description: [
      {
        question:
          "Why was this dataset created? Was there a specific intended purpose? ",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Are there tasks for which the dataset should not be used? If so, please provide a description.",
        type: "markdown",
        content: "",
      },
      {
        question:
          "Has the dataset been used for any tasks already? If so, please provide a description and links to papers or systems using the dataset",
        type: "markdown",
        answer: "",
      },
    ],
    composition: [
      {
        question:
          "What does each field mean? Link to Data Dictionary if applicable.",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Are there fields that have explicit or implicit relationships? What are those fields?",
        type: "markdown",
        content: "",
      },
      {
        question:
          "What do the instances that comprise the dataset represent (e.g., documents, photos, people, countries)? Are there multiple types of instances (e.g., movies, users, and ratings; people and interactions between them; nodes and edges)? Please provide a description",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "How many instances are there in total (of each type, if appropriate)?",
        type: "markdown",
        content: "",
      },
      {
        question: "Is there a label or target associated with each instance?",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Is any information missing from individual instances? If so, what is missing and why?",
        type: "markdown",
        content: "",
      },
      {
        question:
          "Has your system been trained on data that accurately represents your entire user base?",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Was any preprocessing/cleaning/labeling of the data done (e.g., discretization or bucketing, tokenization, part-of-speech tagging, SIFT feature extraction, removal of instances, processing of missing values)? If so, please provide a description. ",
        type: "markdown",
        content: "",
      },
      {
        question:
          "Are there any errors, sources of noise, or redundancies in the dataset? If so, please provide a description",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Is the dataset self-contained or is it dependent upon upstream data sources?",
        type: "markdown",
        answer: "",
      },
      {
        question: "Is there confidential data included in this dataset?",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Does the dataset identify any subpopulations (e.g., by age, gender)? If yes, mark their distributions within the dataset.",
        type: "markdown",
        answer: "",
      },
    ],
    provenance: [
      {
        question:
          "Who created the dataset (e.g., which team, research group) and on behalf of which entity (e.g., company, institution, organization)?",
        type: "markdown",
        answer: "",
      },
      {
        question: "Who funded the creation of the dataset?",
        type: "markdown",
        content: "",
      },
    ],
    collection: [
      {
        question: "Over what timeframe was the data collected?",
        type: "markdown",
        answer: "",
      },
      {
        question: "How was the data being used for the system collected?",
        type: "markdown",
        content: "",
      },
      {
        question:
          "Did the individuals in question consent to the collection and use of their data? If so, please describe",
        type: "markdown",
        answer: "",
      },
      {
        question:
          "Has training and implementation data been reviewed for quality?",
        type: "markdown",
        content: "",
      },
      {
        question:
          "Were any ethical review processes conducted (e.g., by an institutional review board)? If so, please provide a description of these review processes, including the outcomes, as well as a link or other access point to any supporting documentation.",
        type: "markdown",
        content: "",
      },
    ],
  },
  "use-cases-section": {
    alerts: {
      "no-racial-breakdown": {
        title: "",
        severity: "high",
        type: "markdown",
        tags: [], //at least has one tag that is on it's filter list , and that,
        content:
          "[Recent studies have shown](url) that there are racial disparities in who the virus impacts. While some new data is starting to be reported on this in this dataset, it's not comprehensive, since not all states are including this data in their reports.",
      },
      "no-gender-breakdown": {
        title: "",
        type: "markdown",
        tags: [],
        content: "",
      },
      "no-worktype-breakdown": {
        title: "",
        type: "markdown",
        tags: [],
        content:
          "There is no breakdown by type of work, and therefore we cannot tell if essential workers are being adversely impacted, and if how they're impacted is tied to access to PPE. This is important data when considering reopening guidelines.",
      },
      "county-level-data-only": {
        title: "",
        type: "markdown",
        tags: [],
        content: "blah blah blah disparities blah blah blah",
      },
      "testing-dependency": {
        title: "",
        type: "markdown",
        tags: [],
        content: "",
      },
      "death-report-delays": {
        title: "",
        type: "markdown",
        tags: [],
        content: "",
      },
      "update-frequency": {
        title: "",
        type: "markdown",
        tags: [],
        content: "",
      },
      "case-definition": {
        title: "",
        type: "markdown",
        tags: [],
        content: "",
      },
    },
    "use-cases": {
      "reopening-guidelines": {
        variable: {
          alerts: [
            {
              alert: "no-worktype-breakdown",
              level: 3,
            },
            {
              alert: "no-racial-breakdown",
              level: 3,
            },
          ],
        },
      },
      "capacity-planning": {
        variable: {
          alerts: [
            {
              alert: "no-worktype-breakdown",
              level: 3,
            },
            {
              alert: "no-racial-breakdown",
              level: 3,
            },
          ],
        },
      },
    },
  },
  maintenance: [
    {
      question: "How is the data being mananged?",
      type: "markdown",
      answer: "",
    },
    {
      question:
        "What is the license under which the dataset is made available? ",
      type: "markdown",
      content: "",
    },
    {
      question:
        "Are there any restrictions under which the dataset is made available? ",
      type: "markdown",
      content: "",
    },
    {
      question:
        "Will the dataset be updated (e.g., to correct labeling errors, add new instances, delete instances)? If so, please describe how often, by whom, and how updates will be communicated to users (e.g., mailing list, GitHub)?",
      type: "markdown",
      content: "",
    },
    {
      question:
        "How can the owner/curator/manager of the dataset be contacted (e.g., email address)?",
      type: "markdown",
      content: "",
    },
  ],
}

export default data
