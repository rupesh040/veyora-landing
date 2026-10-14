"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Target,
  Layers3,
  Send,
  Search,
} from "lucide-react";

const iconMap: Record<string, any> = { Search, Target, Layers3, Send };

import content from '../data';
const data = content.processSection;
const { steps } = data;

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <section className="relative overflow-hidden bg-[#fcfaf8] px-5 py-4 sm:px-8 sm:py-8 md:px-10 lg:px-12 lg:py-12 xl:px-16 xl:py-14">
      <div className="mx-auto max-w-[1200px]">
        <Header data={data} />

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <ProgressLine activeStep={activeStep} />

          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {steps.map((step: any, index: number) => (
              <ProcessStep
                key={step.number}
                step={step}
                index={index}
                activeStep={activeStep}
                onSelect={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ data }: { data: any }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto max-w-[1050px] text-center"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
        className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:px-7"
      >
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d8003f] sm:text-sm">
          {data.badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-6 text-[56px] font-bold leading-[1.03] tracking-[-0.05em] text-[#101522]"
      >
        {data.headingStart}
        <br className="hidden sm:block" />{" "}
        <span className="text-[#d8003f]">{data.headingHighlight}</span>
      </motion.h2>

      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.35,
        }}
        className="mx-auto mt-5 max-w-[850px] text-[15px] leading-[1.5] text-[#17191f] sm:text-[17px] md:text-[19px]"
      >
        {data.description}
      </motion.p>
    </motion.div>
  );
}

function ProgressLine({
  activeStep,
}: {
  activeStep: number;
}) {
  const progress = `${(activeStep / (steps.length - 1)) * 100}%`;

  return (
    <>
      {/* Horizontal Line for Large Screens */}
      <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[37px] hidden h-[3px] bg-[#d7d7d7] lg:block">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#d8003f]"
          animate={{
            width: progress,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Vertical Line for Mobile Screens (1 column) */}
      <div className="pointer-events-none absolute bottom-[15%] left-[33px] top-[34px] block w-[2px] bg-[#d7d7d7] sm:hidden">
        <motion.div
          className="absolute left-0 top-0 w-full bg-[#d8003f]"
          animate={{
            height: progress,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </>
  );
}

function ProcessStep({
  step,
  index,
  activeStep,
  onSelect,
}: {
  step: (typeof steps)[number];
  index: number;
  activeStep: number;
  onSelect: () => void;
}) {
  const Icon = iconMap[step.icon as string];
  const isActive = activeStep === index;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <button
        type="button"
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
        className="group block w-full cursor-pointer text-left lg:text-center"
      >
        <div className="relative z-20 flex justify-start lg:justify-center">
          <motion.div
            animate={{
              scale: isActive ? 1.08 : 1,
              backgroundColor: isActive
                ? "#d8003f"
                : "#fcfaf8",
              color: isActive ? "#ffffff" : "#101522",
            }}
            transition={{
              duration: 0.35,
            }}
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-[#20232a] text-xl font-bold shadow-sm sm:h-[74px] sm:w-[74px] sm:text-2xl"
          >
            {step.number}
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: isActive ? -4 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`relative mt-6 overflow-hidden rounded-[20px] px-5 py-6 transition-all duration-500 sm:px-7 sm:py-7 lg:min-h-[280px] lg:px-6 ${
            isActive
              ? "bg-[#191b1f] text-white shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
              : "bg-transparent text-[#101522] hover:bg-white/70"
          }`}
        >
          <div className="flex flex-row items-start gap-5 lg:flex-col lg:items-center">
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? 0 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
                isActive
                  ? "bg-[#d8003f] text-white"
                  : "text-[#c9003b]"
              }`}
            >
              <Icon
                size={34}
                strokeWidth={1.8}
              />
            </motion.div>

            <div className="min-w-0 flex-1 lg:w-full">
              <h3
                className={`text-xl font-bold tracking-[-0.025em] sm:text-2xl ${
                  isActive
                    ? "text-white"
                    : "text-[#11151c]"
                }`}
              >
                {step.number} — {step.title}
              </h3>

              <motion.p
                animate={{
                  opacity: 1,
                }}
                className={`mt-3 text-sm leading-[1.6] sm:text-base lg:mt-5 ${
                  isActive
                    ? "text-white/90"
                    : "text-[#17191f]"
                }`}
              >
                {step.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}
