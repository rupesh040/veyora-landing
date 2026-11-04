"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import content from "../data";

const data = content.services;
const { services } = data;

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full scroll-mt-20 overflow-hidden bg-[#faf9f7] px-5 py-12 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-20 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[750px]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex rounded-full border-2 border-[#2563eb] px-5 py-1.5"
            >
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#2563eb] sm:text-sm">
                {data.badge || "WHAT WE DO"}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-[38px] font-bold leading-[1.06] tracking-[-0.04em] text-[#101522] sm:text-[46px] md:text-[54px] lg:text-[58px]"
            >
              {data.headingStart}{" "}
              <span className="text-[#2563eb]">{data.headingHighlight}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[480px] text-[15px] leading-relaxed text-[#17191f]/80 sm:text-[16px] md:text-[17px] lg:text-right"
          >
            {data.cardDescription ||
              "Explore the specialized services we offer to help your brand grow, engage audiences, and build lasting impressions."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service: any, index: number) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.6,
                  delay: (index % 4) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-2 hover:border-[#2563eb]/40 hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)]"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={service.image || "/about/about-1.webp"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-lg font-bold text-[#101522] transition-colors duration-300 group-hover:text-[#2563eb] sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#17191f]/75 sm:text-[15px]">
                    {service.description}
                  </p>

                  <Link
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("contact");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", "#contact");
                      }
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2563eb] transition-all duration-300 hover:text-[#1d4ed8] group-hover:gap-3"
                  >
                    <span>{data.cardButtonText || "Get Started"}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
