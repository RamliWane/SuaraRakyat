"use client";

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},

  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",

  backButtonProps = {},
  nextButtonProps = {},

  backButtonText = "Back",
  nextButtonText = "Continue",

  disableStepIndicators = false,
  renderStepIndicator,

  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = Children.toArray(children);
  const totalSteps = steps.length;

  const isLastStep = currentStep === totalSteps;

  const goToStep = (step) => {
    setCurrentStep(step);
    onStepChange(step);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setSlideDirection(-1);
      goToStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setSlideDirection(1);
      goToStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setSlideDirection(1);
    setIsCompleted(true);
    onFinalStepCompleted();
  };

  return (
    <div className="w-full" {...rest}>
      <div
        className={`
          w-full
          max-w-5xl
          rounded-[10px]
          border
          border-gray-200
          bg-white
          text-white
          shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
          ${stepCircleContainerClassName}
        `}
      >
        {/* STEP HEADER */}
        <div
          className={`
            flex
            w-full
            items-center
            px-6
            pt-6
            ${stepContainerClassName}
          `}
        >
          {steps.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;

            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,

                    onStepClick: (clickedStep) => {
                      setSlideDirection(
                        clickedStep > currentStep ? 1 : -1
                      );

                      goToStep(clickedStep);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    currentStep={currentStep}
                    disableStepIndicators={disableStepIndicators}
                    onClickStep={(clickedStep) => {
                      setSlideDirection(
                        clickedStep > currentStep ? 1 : -1
                      );

                      goToStep(clickedStep);
                    }}
                  />
                )}

                {isNotLastStep && (
                  <StepConnector
                    isComplete={currentStep > stepNumber}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* CONTENT */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={slideDirection}
          className={`
            space-y-3
            px-6
            pb-4
            text-white
            ${contentClassName}
          `}
        >
          {steps[currentStep - 1]}
        </StepContentWrapper>

        {/* FOOTER */}
        {!isCompleted && (
          <div
            className={`
              px-6
              pb-6
              ${footerClassName}
            `}
          >
            <div
              className={`
                mt-6
                flex
                ${
                  currentStep !== 1
                    ? "justify-between"
                    : "justify-end"
                }
              `}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="
                    rounded-full
                    border
                    border-gray-200
                    bg-gray-200
                    px-4
                    py-2
                    text-sm
                    text-black
                    transition-all
                    duration-300
                    hover:border-[#2A2A2A]
                    hover:bg-[#1A1A1A]
                    hover:text-white
                  "
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}

              <button
                onClick={
                  isLastStep ? handleComplete : handleNext
                }
                className="
                  rounded-full
                  bg-[#A2CB8B]
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#a2cb8b]/80
                  active:scale-[0.98]
                "
                {...nextButtonProps}
              >
                {isLastStep
                  ? "Complete"
                  : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      animate={{
        height: isCompleted ? 0 : parentHeight,
      }}
      transition={{
        type: "spring",
        duration: 0.4,
      }}
      style={{
        overflow: "hidden",
        position: "relative",
      }}
      className={className}
    >
      <AnimatePresence
        initial={false}
        mode="wait"
        custom={direction}
      >
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(height) =>
              setParentHeight(height)
            }
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.35,
      }}
      style={{
        width: "100%",
      }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: (direction) => ({
    x: direction >= 0 ? "30%" : "-30%",
    opacity: 0,
  }),

  center: {
    x: "0%",
    opacity: 1,
  },

  exit: (direction) => ({
    x: direction >= 0 ? "-15%" : "15%",
    opacity: 0,
  }),
};

export function Step({ children }) {
  return <div className="py-2 text-white">{children}</div>;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
}) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  const handleClick = () => {
    if (
      step !== currentStep &&
      !disableStepIndicators
    ) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      animate={status}
      initial={false}
      className={`
        relative
        ${
          disableStepIndicators
            ? "pointer-events-none opacity-50"
            : "cursor-pointer"
        }
      `}
    >
      <motion.div
        variants={{
          inactive: {
            backgroundColor: "#ababab",
            color: "#ffffff",
          },

          active: {
            backgroundColor: "#A2CB8B",
            color: "#ffffff",
          },

          complete: {
            backgroundColor: "#A2CB8B",
            color: "#ffffff",
          },
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          text-xs
          font-semibold
        "
      >
        {status === "complete" ? (
          <CheckIcon className="h-3.5 w-3.5 text-white" />
        ) : status === "active" ? (
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        ) : (
          <span>{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  return (
    <div className="relative mx-1 h-[1px] flex-1 overflow-hidden rounded bg-gray-300">
      <motion.div
        initial={false}
        animate={{
          width: isComplete ? "100%" : "0%",
          backgroundColor: "#A2CB8B",
        }}
        transition={{
          duration: 0.35,
        }}
        className="absolute left-0 top-0 h-full"
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />
    </svg>
  );
}