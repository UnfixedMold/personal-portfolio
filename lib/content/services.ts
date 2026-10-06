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
  subtitle: 'From the first idea to a product running in production.',
  items: [
    {
      icon: Sparkles,
      title: 'AI applications',
      text: 'Software built on LLMs: agents that use your tools, search your documents and data, and handle text, voice and images.',
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
      text: "When an off-the-shelf model isn't accurate enough, I train one on your data: data pipelines, training and fine-tuning, evaluation, and deploying it as an API your product can call.",
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
      text: 'Websites, web platforms and mobile apps built end to end: interface design, frontend, backend and APIs, database and authentication, through to deployment and launch.',
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
