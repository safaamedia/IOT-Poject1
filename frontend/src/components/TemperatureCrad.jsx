import React from "react";
import PropTypes from "prop-types";

/* Icons */
import { ArrowDownIcon, ArrowUpIcon, ThermometerIcon } from "lucide-react";

const TemperatureCrad = ({ time, temperature, trend }) => {
  return (
    <div 
      className="flex flex-col gap-6 max-w-96 py-8 px-6 rounded-xl shadow-2xl"
      style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      <div className="flex justify-between items-center gap-4">
        <div className="w-full flex flex-col gap-2 text-left">
          <h2 className="text-xl font-medium leading-none text-white">
            Current Temperature
          </h2>
          <p className="font-light text-gray-200 text-base leading-none">
            Live reading from sensor
          </p>
        </div>

        <div className="text-sm text-gray-200 text-nowrap">{time}</div>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <div className="flex items-center">
          <ThermometerIcon className="h-8 w-8 mr-2 text-red-400" />
          <span className="text-5xl font-bold text-white">
            {temperature !== null ? temperature : "--"}
          </span>
          <span className="text-2xl font-semibold ml-1 text-white">°C</span>
        </div>

        {trend !== "stable" && (
          <div className="flex items-center mt-2 text-sm font-medium">
            {trend === "up" ? (
              <>
                <ArrowUpIcon className="h-4 w-4 mr-1 text-red-400" />
                <span className="text-red-400">Rising</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="h-4 w-4 mr-1 text-blue-400" />
                <span className="text-blue-400">Falling</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

TemperatureCrad.PropTypes = {
  time: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  trend: PropTypes.oneOf(["up", "down", "stable"]).isRequired,
};

export default TemperatureCrad;
