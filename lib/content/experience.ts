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

// TODO: replace the placeholder highlights with the owner's real ones.
const placeholderHighlights = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
]

export const experience: Experience = {
  title: 'Experience',
  jobs: [
    {
      period: '2025 — now',
      role: 'AI Practice Lead',
      organisation: 'SolutionLab',
      highlights: placeholderHighlights,
      tags: ['LLMs', 'LangChain', 'FastAPI', 'Tech leadership'],
    },
    {
      period: '2025',
      role: 'ML/AI Engineer',
      organisation: 'Freelance',
      highlights: placeholderHighlights,
      tags: ['NLP', 'Vision Transformers', 'LangChain', 'FastAPI'],
    },
    {
      period: '2021 — 2025',
      role: 'Machine Learning Engineer',
      organisation: 'AAI Labs',
      highlights: placeholderHighlights,
      tags: ['PyTorch', 'scikit-learn', 'Docker', 'Azure'],
    },
    {
      period: '2017 — 2021',
      role: 'Software Engineer',
      organisation: 'SolutionLab',
      highlights: placeholderHighlights,
      tags: ['React', 'React Native', 'Laravel', 'ASP.NET'],
    },
  ],
}
