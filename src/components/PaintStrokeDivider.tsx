export default function PaintStrokeDivider() {
  return (
    <div className="w-full my-16 overflow-hidden">
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C200,20 400,70 600,40 C800,10 1000,65 1200,35 C1320,20 1400,50 1440,30 L1440,80 L0,80 Z"
          fill="#00A896"
          fillOpacity="0.7"
        />
        <path
          d="M0,70 C300,30 600,75 900,45 C1100,25 1300,60 1440,40 L1440,80 L0,80 Z"
          fill="#2B9FD8"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  )
}
