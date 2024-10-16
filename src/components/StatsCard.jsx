export default function PlanSummaryCard({
  title,
  title2,
  usedValue,
  maxValue,
  icon,
  color,
}) {
  // Calculate the percentage used for the progress bar
  const percentage = (usedValue / maxValue) * 100;
  const circumference = 2 * Math.PI * 40; // Assuming the radius is 40
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-2 p-4 flex flex-col justify-center items-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />

          <circle
            className={`${color} stroke-current`}
            strokeWidth="10"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset: offset }}
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            transform="rotate(-90 50 50)"
          />
          {/* Center text */}
          <image href={icon} x="38" y="38" height="24" width="24" />
        </svg>
      </div>
      <div className="py-4 px-1 font-custom flex place-content-between w-full">
        <div className=""></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-700 text-sm lg:text-base mb-2">{title2}</p>
          <p className="font-bold  text-sm md:text-xl ">{usedValue}</p>
        </div>
        <div className="border border-r h-6"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-700 text-sm lg:text-base mb-2 ">{title}</p>
          <p className="font-bold text-sm md:text-xl ">{maxValue}</p>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
