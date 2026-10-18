const leaves = [
  { left: "6%", delay: "0s", duration: "9s", size: 22 },
  { left: "18%", delay: "3.5s", duration: "11s", size: 16 },
  { left: "34%", delay: "1.8s", duration: "10s", size: 28 },
  { left: "52%", delay: "5s", duration: "12s", size: 18 },
  { left: "68%", delay: "2.6s", duration: "9.5s", size: 24 },
  { left: "82%", delay: "4.2s", duration: "10.5s", size: 15 },
  { left: "93%", delay: "0.9s", duration: "12.5s", size: 20 },
];

export default function PandanLeaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-fall absolute -top-8 text-pandan/50"
          style={{
            left: l.left,
            width: l.size,
            height: l.size,
            animationDelay: l.delay,
            animationDuration: l.duration,
          }}
        >
          <path fill="currentColor" d="M12 2C7 7 4 12 4 16a8 8 0 0 0 16 0c0-4-3-9-8-14z" />
        </svg>
      ))}
    </div>
  );
}
