import {
  BrainCircuit,
  MonitorSmartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

export type Service = {
  icon: LucideIcon
  title: string
  text: string
  stack: readonly string[]
}

export type Services = {
  title: string
  subtitle: string
  items: readonly Service[]
}

export const services: Services = {
  title: 'What I build',
  subtitle:
    'I build with a team of AI agents, so big projects get done fast, by one person.',
  items: [
    {
      icon: Sparkles,
      title: 'AI applications',
      text: 'Software built on LLMs: agents that use your tools, search your data and handle text, voice and images.',
      stack: [
        'LangGraph',
        'MCP',
        'RAG',
        'Vector databases',
        'LangSmith',
        'Evals',
      ],
    },
    {
      icon: BrainCircuit,
      title: 'ML models',
      text: "When a general model isn't enough, I train one on your data: data pipelines, training and fine-tuning, evaluation, and deploying it as an API your product can use.",
      stack: [
        'Azure ML',
        'PyTorch',
        'scikit-learn',
        'Hugging Face',
        'MLflow',
        'FastAPI',
      ],
    },
    {
      icon: MonitorSmartphone,
      title: 'Web & mobile apps',
      text: 'Websites, web platforms and mobile apps built end to end: interface design, frontend, backend and APIs, through to deployment and launch.',
      stack: [
        'Claude Design',
        'Next.js',
        'Svelte',
        'React Native',
        'ASP.NET',
        'Docker',
      ],
    },
  ],
}
