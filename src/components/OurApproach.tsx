"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";

import content from '../data';
const { approaches, image, imageAlt, tag, headingStart, headingBr, headingHighlight, subHeading } = content.ourApproach;

type ApproachTab = keyof typeof approaches;

export default function OurApproach() {
  const [activeTab, setActiveTab] =
    useState<ApproachTab>("Discover");

  const activeContent = approaches[activeTab];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid min-h-[700px] grid-cols-1 lg:grid-cols-2">
        <ImagePanel />

        <ContentPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeContent={activeContent}
        />
      </div>
    </section>
  );
}

function ImagePanel() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.04,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-[430px] overflow-hidden sm:min-h-[520px] lg:min-h-[700px]"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 1023px) 100vw, 50vw"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/35 to-transparent lg:hidden" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-white via-white/55 to-transparent lg:hidden" />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] bg-gradient-to-r from-transparent via-white/25 to-white lg:block" />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[30%] bg-gradient-to-r from-transparent to-white/75 lg:block" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.04]" />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-8 left-6 h-20 w-20 rounded-full border border-white/30 sm:bottom-12 sm:left-10 sm:h-28 sm:w-28"
      />
    </motion.div>
  );
}

function ContentPanel({
  activeTab,
  setActiveTab,
  activeContent,
}: {
  activeTab: ApproachTab;
  setActiveTab: (tab: ApproachTab) => void;
  activeContent: (typeof approaches)[ApproachTab];
}) {
  return (
    <div className="relative flex items-center bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-12 lg:py-20 xl:px-16">
      <div className="w-full max-w-[760px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 sm:px-7">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#d8003f] sm:text-sm">
              {tag}</span>
          </div>

          <h2 className="mt-6 text-[56px] font-bold leading-[1.02] tracking-[-0.05em] text-[#101522]">
            {headingStart}<br />{headingBr}<span className="text-[#d8003f]">{headingHighlight}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="mt-8"
        >
          <div className="grid grid-cols-3 gap-3 sm:max-w-[650px] sm:gap-4">
            {(Object.keys(approaches) as ApproachTab[]).map(
              (tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`relative min-h-[58px] cursor-pointer rounded-lg px-3 text-sm font-semibold transition-all duration-300 sm:min-h-[70px] sm:text-base md:text-lg ${
                      isActive
                        ? "bg-[#d8003f] text-white shadow-[0_10px_30px_rgba(216,0,63,0.2)]"
                        : "bg-white text-[#11151c] shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                    }`}
                  >
                    {tab}

                    {isActive && (
                      <motion.span
                        layoutId="approach-arrow"
                        className="absolute -bottom-[12px] left-1/2 h-0 w-0 -translate-x-1/2 border-l-[11px] border-r-[11px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#d8003f]"
                      />
                    )}
                  </button>
                );
              },
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mt-10 max-w-[720px] text-[15px] leading-[1.6] text-[#17191f] sm:text-[17px] md:text-[19px]">
              {activeContent.description}
            </p>

            <motion.h3
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="mt-10 text-2xl font-bold tracking-[-0.03em] text-[#101522] sm:text-3xl"
            >
              {subHeading}</motion.h3>

            <div className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {activeContent.points.map((point, index) => (
                <motion.div
                  key={point}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3"
                >
                  <Check
                    size={23}
                    strokeWidth={3}
                    className="mt-0.5 shrink-0 text-[#d8003f]"
                  />

                  <span className="text-base font-medium leading-[1.4] text-[#17191f] sm:text-lg">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}



