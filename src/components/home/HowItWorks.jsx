import React, { useState } from "react";

const HowItWorks = () => {
  const [openStep, setOpenStep] = useState(null);

  const steps = [
    {
      number: 1,
      title: "Create an account",
      description:
        "Sign up and create a profile to start bookmarking your favorite listings and unlock all your listings.",
    },
    {
      number: 2,
      title: "Start a trial subscription",
      description:
        "Choose from our flexible plans and start your journey to finding the perfect rental property.",
    },
    {
      number: 3,
      title: "Contact all landlords",
      description:
        "Connect directly with property owners through our platform - no middlemen, no agent fees.",
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="max-w-xl">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                Find your next perfect place to live in just 3 steps
              </h2>
              <p className="text-gray-600 text-sm mb-5">
                Start your home search journey with ease
              </p>

              {/* Accordion Steps */}
              <div className="space-y-0">
                {steps.map((step) => (
                  <div key={step.number}>
                    <button
                      onClick={() =>
                        setOpenStep(
                          openStep === step.number ? null : step.number,
                        )
                      }
                      className="w-full py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-2"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                          {step.number}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                          {step.title}
                        </span>
                      </div>
                      <svg
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openStep === step.number ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openStep === step.number && (
                      <div className="pb-6 px-2 animate-slide-down">
                        <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="relative w-full max-w-md mx-auto">
                {/* Animated blob background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-[40%_60%_70%_30%/50%_60%_40%_50%] blur-2xl opacity-70 animate-pulse"></div>

                {/* Main blob border */}
                <div className="relative p-2 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 rounded-[40%_60%_70%_30%/50%_60%_40%_50%] shadow-2xl animate-[morph_8s_ease-in-out_infinite]">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.Y_xBGEybRO31NErE1f1mMQHaE7?cb=defcache2&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Realtor"
                    className="rounded-[38%_62%_68%_32%/48%_58%_42%_52%] w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Add this to your CSS/Tailwind config or index.css */}
              <style jsx>{`
                @keyframes morph {
                  0%,
                  100% {
                    border-radius: 40% 60% 70% 30% / 50% 60% 40% 50%;
                  }
                  25% {
                    border-radius: 60% 40% 30% 70% / 40% 50% 60% 50%;
                  }
                  50% {
                    border-radius: 30% 70% 60% 40% / 60% 40% 50% 50%;
                  }
                  75% {
                    border-radius: 70% 30% 40% 60% / 50% 60% 40% 50%;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
