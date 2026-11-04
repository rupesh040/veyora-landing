"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Gem,
  Megaphone,
  PanelsTopLeft,
  Target,
} from "lucide-react";

import content from '../data';
const data = content.services;
const { services, images } = data;

const iconMap: Record<string, any> = { Target, PanelsTopLeft, Megaphone, Gem };

export default function Services() {
  return (
    <section id="services" className="relative w-full scroll-mt-20 overflow-hidden bg-[#faf9f7] px-5 py-8 sm:py-12 lg:px-22 lg:py-16">
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
            className="mb-6 inline-flex rounded-full border-2 border-[#2563eb] px-4 py-2 "
          >
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2563eb] ">
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
            <span className="text-[#2563eb]">{data.headingHighlight}</span>
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
                  <div className="flex gap-3 sm:gap-4">
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
                          className="text-[#2563eb] sm:h-12 sm:w-12"
                          dangerouslySetInnerHTML={{ __html: service.iconSvg }}
                        />
                      ) : (
                        <Icon
                          size={40}
                          strokeWidth={1.5}
                          className="text-[#2563eb] sm:size-12"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-bold leading-tight text-[#111722] sm:text-lg md:text-xl">
                        {service.title}
                      </h3>

                      <p className="mt-2 max-w-[290px] text-sm leading-[1.5] text-[#17191f] sm:text-base md:text-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>
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
              onClick={(e) => {
                if (data.button.link?.startsWith("#")) {
                  e.preventDefault();
                  const el = document.getElementById(data.button.link.slice(1));
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", data.button.link);
                  }
                }
              }}
              className="group inline-flex items-center gap-3 text-base font-semibold text-[#2563eb] transition-colors duration-300 hover:text-[#1d4ed8] sm:text-lg"
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

        <ServicesVisual />
      </div>
    </section>
  );
}

function ServicesVisual() {
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
          scale: 0.85,
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
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute -bottom-10 -left-10 z-0 hidden sm:block"
      >
        <CirclePattern />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 w-[92%] overflow-hidden rounded-[20px] bg-white shadow-[0_25px_60px_rgba(16,21,34,0.12)] sm:w-[88%]"
      >
        <div className="relative aspect-[1.18/1] w-full overflow-hidden">
          <Image
            src={images.main}
            alt="VEYORA team collaborating"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 38vw"
          />
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
          y: -20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.35,
        }}
        className="absolute -bottom-6 left-6 z-30 rounded-[12px] bg-white px-5 py-4 shadow-[0_15px_35px_rgba(0,0,0,0.1)] sm:left-10"
      >
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-[#2563eb]" />
          <span className="text-sm font-bold tracking-tight text-[#111722] sm:text-base">
            Full-Spectrum Creative
          </span>
        </div>
      </motion.div>
    </div>
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
            fill="#2563eb"
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
        fill="#2563eb"
        opacity="0.035"
      />

      <circle
        cx="150"
        cy="150"
        r="105"
        stroke="#2563eb"
        strokeWidth="1.5"
        opacity="0.1"
      />

      <circle
        cx="150"
        cy="150"
        r="75"
        stroke="#2563eb"
        strokeWidth="1"
        opacity="0.08"
      />
    </svg>
  );
}
