export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="animate-glow-1 from-ring/35 absolute -top-[180px] -right-[120px] size-[640px] rounded-full bg-radial to-transparent to-65% blur-[30px]" />
      <div className="animate-glow-2 from-primary-end/28 absolute top-[520px] -left-[220px] size-[560px] rounded-full bg-radial to-transparent to-65% blur-[30px]" />
      <div className="from-ring/22 absolute top-[1900px] -right-[160px] size-[520px] rounded-full bg-radial to-transparent to-65% blur-[30px]" />
      <div className="from-primary-end/22 absolute top-[3200px] -left-[120px] size-[520px] rounded-full bg-radial to-transparent to-65% blur-[30px]" />
    </div>
  )
}
