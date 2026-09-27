export type Step = {
  number: string
  title: string
  text: string
}

export type Method = {
  title: string
  subtitle: string
  steps: readonly Step[]
}

export const method: Method = {
  title: 'How I work',
  subtitle:
    'Spec‑driven development. We agree on what we’re building before I build it.',
  steps: [
    {
      number: '01',
      title: 'Spec',
      text: 'We write down what the thing should do before any code. You get a document you can read and comment on.',
    },
    {
      number: '02',
      title: 'Plan',
      text: 'Slices, order, estimate. You get a timeline and know what lands when.',
    },
    {
      number: '03',
      title: 'Build',
      text: 'One piece at a time, always runnable. You see progress every step, not at the end.',
    },
    {
      number: '04',
      title: 'Verify',
      text: 'Every piece is checked against the spec before we move on.',
    },
  ],
}
