import { CheckCheckIcon, Loader2Icon, PersonStanding } from "lucide-react";
import { BarLoader } from "react-spinners";

interface StepperProps {
  steps: [];
  currentStep: number;
  isFinished?: boolean;
}

const Stepper = ({ steps, currentStep, isFinished }: StepperProps) => {
  return (
    <div data-hs-stepper>
      <ul className="relative flex flex-row gap-x-2">
        {steps.map((_, index) => (
          <li
            key={index}
            className={`flex items-center gap-x-2 shrink basis-0 flex-1 group`}
            data-hs-stepper-nav-item={`{
              "index": ${index + 1}
            }`}
          >
            <span
              className={`min-w-7 min-h-7 group inline-flex items-center text-xs align-middle ${
                index + 1 === currentStep
                  ? "text-primary"
                  : index + 1 < currentStep
                  ? "text-primary"
                  : "text-gray-300"
              }`}
            >
              <span
                className={`size-7 flex justify-center items-center flex-shrink-0 font-medium text-gray-800 rounded-full group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600
                  ${index + 1 < currentStep ? "bg-teal-500 text-white" : ""} 
                  ${
                    index + 1 === currentStep
                      ? "hs-stepper-active:bg-blue-600 hs-stepper-active:text-white"
                      : ""
                  } 
                  ${
                    (index + 1 < currentStep && isFinished) || (index === steps.length - 1 && currentStep <= 2)
                      ? "hs-stepper-success:bg-blue-600 hs-stepper-success:text-white"
                      : ""
                  } 
                  ${
                    (index + 1 === currentStep && isFinished) || (index !== steps.length - 1 && currentStep <= 2) || (isFinished)
                      ? "hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600"
                      : ""
                  }`}
              >
                {index + 1 < currentStep ? (
                  <CheckCheckIcon size={18} />
                ) : index + 1 === currentStep ? (
                  index === steps.length - 1 && currentStep <= 2 ? (
                    <div className="flex flex-col justify-center items-center w-full">
                      <BarLoader width={80} color="#4F46E5" />
                      <CheckCheckIcon size={18} />
                    </div>
                  ) : (
                    isFinished ? <CheckCheckIcon size={18} /> : <BarLoader width={80} color="#4F46E5" />
                  )
                ) : (
                  <span
                    className={`hs-stepper-success:hidden hs-stepper-completed:hidden`}
                  >
                    
                  </span>
                )}
                <svg
                  className={`hidden flex-shrink-0 size-3 hs-stepper-success:block`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="ms-2 text-sm font-medium text-gray-800">Step {index}</span>
            </span>
            <div
              className={`w-full h-px flex-1 bg-gray-200 group-last:hidden hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stepper;
