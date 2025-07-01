import React from "react";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <div
        className={`${
          step1 ? "bg-green-500" : "bg-gray-300"
        } w-[100px] flex justify-center items-center flex-col  `}
      >
        <div className="ml-1 font-serif font-semibold ">Login</div>
        <div className="mt-2 text-lg text-center">✅</div>
      </div>
      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
          <div
            className={`${
              step1 ? "bg-green-500" : "bg-gray-300"
            } w-[100px] flex justify-center items-center flex-col `}
          >
            <div className="ml-1 font-serif font-semibold">Shipping</div>
            <div className="mt-1 text-lg text-center">✅</div>
          </div>
        </>
      )}
      <>
        {step1 && step2 && step3 ? (
          <div className="h-0.5 w-[10rem] bg-green-500 "></div>
        ) : (
          ""
        )}
        <div
          className={`${
            step3 ? "text-green-500" : "text-gray-500 font-medium"
          }`}
        >
          <span className={`${!step3 ? "ml-[10rem]" : ""}`}>Summary</span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center">✅</div>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
};

export default ProgressSteps;
