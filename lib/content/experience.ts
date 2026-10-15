export type Job = {
  period: string
  role: string
  organisation: string
  highlights: readonly string[]
  tags: readonly string[]
}

export type Experience = {
  title: string
  jobs: readonly Job[]
}

export const experience: Experience = {
  title: 'Experience',
  jobs: [
    {
      period: '2025 — now',
      role: 'AI Practice Lead',
      organisation: 'SolutionLab',
      highlights: [
        'Built an internal LLM tool that migrates content from outdated HTML sites into a new Umbraco content structure.',
        'Help shape and present the company’s spec-driven development practices and AI tech stack.',
        'Help develop Umbraco CMS sites for clients.',
        'Pitch AI/ML features for clients’ existing projects to help them grow sales.',
      ],
      tags: ['LLMs', 'LangChain', 'Umbraco', 'SDD'],
    },
    {
      period: '2025 — now',
      role: 'AI/ML Engineer',
      organisation: 'Freelance',
      highlights: [
        'Develop AI/NLP pipelines for Zubrus, an early-stage Lithuanian edtech startup.',
        'Build an MVP for a calorie estimation platform with Vision Transformers, LangChain and FastAPI.',
      ],
      tags: ['NLP', 'Vision Transformers', 'LangChain', 'FastAPI'],
    },
    {
      period: '2021 — 2025',
      role: 'Machine Learning Engineer',
      organisation: 'AAI Labs',
      highlights: [
        'Led teams of 3 to 4 people on short-term research projects.',
        'Built time series forecasting and image recognition models in Python with scikit-learn, pandas and PyTorch.',
        'Built Streamlit and Next.js apps for model demos and government systems.',
        'Packaged models and apps with Docker and deployed them on Azure.',
      ],
      tags: ['PyTorch', 'scikit-learn', 'Docker', 'Azure'],
    },
    {
      period: '2017 — 2021',
      role: 'Software Engineer',
      organisation: 'SolutionLab',
      highlights: [
        'Developed web and mobile apps using React and React Native.',
        'Built and maintained APIs with PHP (Laravel) and C# (ASP.NET, Umbraco).',
        'Worked on a brand and retail collaboration platform, internal tooling for architecture project management and B2B systems.',
      ],
      tags: ['React', 'React Native', 'Laravel', 'ASP.NET'],
    },
  ],
}
