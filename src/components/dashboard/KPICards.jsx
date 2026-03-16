import { FiPhone, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FaPoundSign } from "react-icons/fa";

export default function KPICards({ kpis }) {
  const cards = [
    {
      label: "Total Calls",
      value: kpis.totalCalls,
      icon: <FiPhone />,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      label: "Total Cost",
      value: `£${kpis.totalCost}`,
      icon: <FaPoundSign />,
      color: "from-green-500 to-green-700",
    },
    {
      label: "Avg Duration",
      value: `${kpis.avgDuration}s`,
      icon: <FiClock />,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      label: "Successful",
      value: kpis.successfulCalls,
      icon: <FiCheckCircle />,
      color: "from-teal-400 to-teal-600",
    },
    {
      label: "Failed",
      value: kpis.failedCalls,
      icon: <FiXCircle />,
      color: "from-red-500 to-red-700",
    },
  ];

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">

      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 sm:gap-4
                      p-4 sm:p-5 md:p-6
                      rounded-xl shadow-lg
                      bg-gradient-to-br ${card.color}
                      text-white
                      hover:scale-[1.02] hover:shadow-xl
                      transition-all duration-300`}
        >
          {/* Icon */}
          <div className="flex items-center justify-center
                          w-10 h-10 sm:w-12 sm:h-12
                          bg-white/20 rounded-full
                          text-lg sm:text-xl">
            {card.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm opacity-90 truncate">
              {card.label}
            </span>

            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}