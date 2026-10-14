"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Gem,
  Megaphone,
  PanelsTopLeft,
  Play,
  Target,
  X,
} from "lucide-react";

import content from '../data';
const data = content.services;
const { services, images } = data;

const iconMap: Record<string, any> = { Target, PanelsTopLeft, Megaphone, Gem };

export default function Services() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#faf9f7] px-5 py-0 lg:px-22">
        <div className="relative z-10 mx-auto grid max-w-[1500px] grid-cols-1 items-start gap-8 lg:grid-cols-[58%_42%] lg:gap-6 lg:pr-8 xl:gap-8 xl:pr-12">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-6 inline-flex rounded-full border-2 border-[#d8003f] px-4 py-2 "
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#d8003f] ">
                {data.badge}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[850px] text-[56px] font-bold leading-[1.02] tracking-[-0.045em] text-[#101522]"
            >
              {data.headingStart}
              <span className="text-[#d8003f]">{data.headingHighlight}</span>
            </motion.h2>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:mt-8 sm:grid-cols-2 sm:gap-y-6 lg:mt-8 lg:gap-y-8">
              {services.slice(0, 4).map((service: any, index: number) => {
                const Icon = (service.icon && iconMap[service.icon]) || Target;

                return (
                  <motion.div
                    key={index}
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
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group"
                  >
                    <Link
                      href={service.link || "/services"}
                      className="flex gap-3 sm:gap-4 transition-transform duration-300 hover:translate-x-1"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
                        {service.iconSvg ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#d8003f] transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
                            dangerouslySetInnerHTML={{ __html: service.iconSvg }}
                          />
                        ) : (
                          <Icon
                            size={40}
                            strokeWidth={1.5}
                            className="text-[#d8003f] transition-transform duration-300 group-hover:scale-110 sm:size-12"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-bold leading-tight text-[#111722] transition-colors group-hover:text-[#d8003f] sm:text-lg md:text-xl">
                          {service.title}
                        </h3>

                        <p className="mt-2 max-w-[290px] text-sm leading-[1.5] text-[#17191f] sm:text-base md:text-lg">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
              }}
              className="mt-6 sm:mt-8"
            >
              <Link
                href={data.button.link}
                className="group inline-flex items-center gap-3 text-base font-semibold text-[#c9003a] transition-colors duration-300 hover:text-[#a90032] sm:text-lg"
              >
                <span>{data.button.text}</span>

                <ArrowRight
                  size={22}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </Link>
            </motion.div>
          </div>

          <ServicesVisual onPlay={() => setIsVideoOpen(true)} />
        </div>
      </section>

      <AnimatePresence>
        {isVideoOpen && (
          <VideoModal onClose={() => setIsVideoOpen(false)} videoUrl={data.videoUrl} />
        )}
      </AnimatePresence>
    </>
  );
}

function ServicesVisual({
  onPlay,
}: {
  onPlay: () => void;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          x: 40,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute -right-4 -top-8 z-0 hidden sm:block"
      >
        <DotPattern />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1,
          delay: 0.15,
        }}
        className="pointer-events-none absolute -bottom-20 -right-16 z-0 hidden lg:block"
      >
        <CirclePattern />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10"
      >
        <div className="relative ml-auto w-full overflow-hidden rounded-[16px] shadow-[0_20px_45px_rgba(0,0,0,0.13)] sm:w-[88%] lg:w-[78%]">
          <div className="relative aspect-[0.88/1] w-full ">
            <Image
              src={images.main}
              alt="VEYORA creative team"
              fill
              className="object-cover "
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 36vw "
            />

            <div className="absolute inset-0 bg-black/10" />

            <button
              type="button"
              onClick={onPlay}
              aria-label="Play VEYORA creative services video"
              className="group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-white/70 bg-[#d8003f]/90 shadow-[0_12px_35px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-110 hover:bg-[#d8003f] sm:h-24 sm:w-24 sm:border-[7px]"
            >
              <span className="absolute inset-[-10px] rounded-full border-2 border-[#d8003f]/40 sm:inset-[-12px]" />

              <Play
                size={26}
                fill="white"
                strokeWidth={0}
                className="ml-1 text-white transition-transform duration-300 group-hover:scale-110 sm:size-[30px]"
              />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: 50,
          y: 35,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.85,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-20 -mt-16 ml-auto w-[62%] overflow-hidden rounded-[16px] border-[4px] border-[#faf9f7] shadow-[0_20px_45px_rgba(0,0,0,0.16)] sm:-mt-32 sm:w-[56%] sm:border-[5px] lg:w-[42%]"
      >
        <div className="relative aspect-[0.92/1] w-full">
          <Image
            src={images.secondary}
            alt="VEYORA digital experience"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 62vw, (max-width: 1024px) 32vw, 22vw"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          delay: 0.4,
        }}
        className="pointer-events-none absolute -bottom-12 left-0 z-0 hidden sm:block"
      >
        <DotPattern />
      </motion.div>
    </div>
  );
}

function VideoModal({
  onClose,
  videoUrl,
}: {
  onClose: () => void;
  videoUrl?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 30,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors duration-300 hover:bg-[#d8003f]"
        >
          <X size={22} />
        </button>

        <div className="relative aspect-video w-full">
          <iframe
            src={videoUrl || "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"}
            title="VEYORA Creative Services"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function DotPattern() {
  return (
    <svg
      width="150"
      height="120"
      viewBox="0 0 150 120"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 80 }).map((_, index) => {
        const row = Math.floor(index / 10);
        const column = index % 10;

        return (
          <circle
            key={index}
            cx={column * 15 + 5}
            cy={row * 15 + 5}
            r="1.6"
            fill="#d8003f"
            opacity={0.18 + ((row + column) % 3) * 0.05}
          />
        );
      })}
    </svg>
  );
}

function CirclePattern() {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="150"
        cy="150"
        r="135"
        fill="#d8003f"
        opacity="0.035"
      />

      <circle
        cx="150"
        cy="150"
        r="105"
        stroke="#d8003f"
        strokeWidth="1.5"
        opacity="0.1"
      />

      <circle
        cx="150"
        cy="150"
        r="75"
        stroke="#d8003f"
        strokeWidth="1"
        opacity="0.08"
      />
    </svg>
  );
}