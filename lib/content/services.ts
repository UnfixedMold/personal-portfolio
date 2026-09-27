export type Service = {
  glyph: string
  title: string
  text: string
  examples: string
  stack: readonly string[]
}

export type Services = {
  title: string
  subtitle: string
  items: readonly Service[]
}

export const services: Services = {
  title: 'What I build',
  subtitle: 'Design, frontend, backend, models, deployment.',
  items: [
    {
      glyph: '</>',
      title: 'Web & mobile apps',
      text: 'Customer-facing sites, internal tools, mobile apps — with the backend and API behind them, deployed and running.',
      examples:
        'e.g. an online store, a booking or admin system, a B2B platform, a companion mobile app.',
      stack: [
        'Next.js',
        'React Native',
        'Node / Python APIs',
        'PostgreSQL',
        'Docker',
      ],
    },
    {
      glyph: 'AI',
      title: 'AI applications',
      text: 'Products with an LLM inside: assistants over your documents, content generation, document processing, agents that take actions.',
      examples:
        'e.g. quiz generation from course material, speech translation, a support assistant grounded in your data.',
      stack: [
        'LangChain',
        'OpenAI / open models',
        'FastAPI',
        'RAG',
        'Evaluation',
      ],
    },
    {
      glyph: 'ML',
      title: 'ML models',
      text: 'Custom models trained on your data, properly evaluated, and served as an API your product can call.',
      examples:
        'e.g. image & video recognition, time-series forecasting, recommendation, clustering users or content.',
      stack: ['PyTorch', 'Transformers', 'scikit-learn', 'MLflow', 'Azure'],
    },
  ],
}
