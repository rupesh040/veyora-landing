"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

import content from '../data';
const { insights } = content.insights;
const data = content.insights;

export default function Insights() {
  const pathname = usePathname();

  const isBlogPage =
    pathname === "/blog" || pathname.startsWith("/blog/");

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 639px)",
    );

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener(
      "change",
      updateDevice,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDevice,
      );
    };
  }, []);

  const itemsPerPage = isMobile ? 3 : 6;

  const totalPages = isBlogPage
    ? Math.ceil(insights.length / itemsPerPage)
    : 1;

  const visibleInsights = useMemo(() => {
    if (!isBlogPage) {
      return insights.slice(0, 3);
    }

    const startIndex =
      (currentPage - 1) * itemsPerPage;

    return insights.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [
    currentPage,
    isBlogPage,
    itemsPerPage,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [isBlogPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const scrollToInsights = () => {
    window.requestAnimationFrame(() => {
      const element =
        document.getElementById("insights-grid");

      if (!element) {
        return;
      }

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        110;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  };

  const previousPage = () => {
    if (currentPage <= 1) {
      return;
    }

    setCurrentPage((page) => page - 1);
    scrollToInsights();
  };

  const nextPage = () => {
    if (currentPage >= totalPages) {
      return;
    }

    setCurrentPage((page) => page + 1);
    scrollToInsights();
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToInsights();
  };

  return (
    <section className="relative overflow-hidden bg-[#faf9f7] px-5 py-2 sm:px-8 sm:py-4 md:px-10 md:py-6 lg:px-12 lg:py-8 xl:px-16 xl:py-10">
      <BackgroundDecorations />

      <div className="relative z-10 mx-auto max-w-[1450px]">
        <Header isBlogPage={isBlogPage} data={data} />

        <motion.div
          id="insights-grid"
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:gap-8"
        >
          {visibleInsights.map((insight: any, index: number) => (
            <InsightCard
              key={`${currentPage}-${insight.id}`}
              insight={insight}
              index={index}
            />
          ))}
        </motion.div>

        {isBlogPage && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={previousPage}
            onNext={nextPage}
            onPageChange={goToPage}
          />
        )}
      </div>
    </section>
  );
}

function Header({
  isBlogPage,
  data,
}: {
  isBlogPage: boolean;
  data: any;
}) {
  return (
    <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 "
        >
          <span className="text-[14px] font-bold uppercase tracking-[0.08em] text-[#d8003f]">
            {data.badge}
          </span>
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 max-w-[900px] text-[56px] font-bold leading-[1.02] tracking-[-0.05em] text-[#101522]"
        >
          {data.headingStart}{" "}
          <span className="text-[#d8003f]">
            {data.headingHighlight}
          </span>
        </motion.h2>
      </div>

      {!isBlogPage && (
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="lg:pb-2"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-4 rounded-lg border border-[#17191f]/50 bg-white/50 px-5 py-3 text-sm font-medium text-[#17191f] transition-all duration-300 hover:border-[#d8003f] hover:bg-[#d8003f] hover:text-white sm:px-6 sm:py-3.5 sm:text-base"
          >
            <span>{data.buttonText}</span>

            <ArrowRight
              size={20}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function InsightCard({
  insight,
  index,
}: {
  insight: (typeof insights)[number];
  index: number;
}) {
  return (
    <motion.article
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
        amount: 0.12,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className="group relative overflow-hidden rounded-[8px] border border-[#eadfe1] bg-white text-[#11151c] shadow-[0_10px_35px_rgba(16,21,34,0.07)] transition-all duration-500 hover:border-transparent hover:bg-[#111318] hover:text-white hover:shadow-[0_20px_50px_rgba(16,21,34,0.16)]"
    >
      {/* Top Red Bar on Hover */}
      <div className="absolute inset-x-0 top-0 z-20 h-[5px] origin-left scale-x-0 bg-[#d8003f] transition-transform duration-500 ease-out group-hover:scale-x-100" />
      
      <Link
        href={`/blog/${insight.id}`}
        className="block h-full"
      >
        <div className="relative p-4 sm:p-5">
          <div className="relative aspect-[1.58/1] overflow-hidden rounded-[18px]">
            <Image
              src={insight.image}
              alt={insight.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
          </div>

          <div className="relative -mt-5 flex justify-center">
            <span className="relative z-10 rounded-full bg-[#f8dfe2] px-8 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#17191f] shadow-sm transition-all duration-500 group-hover:bg-[#e60046] group-hover:text-white sm:px-9 sm:text-sm">
              {insight.category}
            </span>
          </div>
        </div>

        <div className="px-6 pb-7 pt-2 sm:px-7 sm:pb-8">
          <p className="text-sm text-[#17191f] transition-colors duration-500 group-hover:text-white/80 sm:text-base">
            {insight.date}
          </p>

          <h3 className="mt-4 max-w-[430px] text-[22px] font-bold leading-[1.22] tracking-[-0.025em] text-[#11151c] transition-colors duration-500 group-hover:text-white sm:text-[25px]">
            {insight.title}
          </h3>

          <div className="mt-7 inline-flex items-center gap-3 text-sm font-medium text-[#17191f] transition-colors duration-500 group-hover:text-white sm:text-base">
            <span>Read Article</span>

            <ArrowRight
              size={20}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </div>
        </div>

        <div className="absolute bottom-4 right-5 hidden opacity-50 transition-opacity duration-500 group-hover:opacity-80 sm:block">
          <DotPattern />
        </div>
      </Link>
    </motion.article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}) {
  return (
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
        duration: 0.6,
      }}
      className="mt-12 flex flex-col items-center gap-5 sm:mt-14"
    >
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#17191f]/20 bg-white text-[#17191f] shadow-sm transition-all duration-300 hover:border-[#d8003f] hover:bg-[#d8003f] hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft
            size={21}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </button>

        <div className="flex items-center gap-2">
          {Array.from(
            {
              length: totalPages,
            },
            (_, index) => index + 1,
          ).map((page) => {
            const isActive =
              currentPage === page;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={
                  isActive ? "page" : undefined
                }
                className={`flex h-12 min-w-12 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#d8003f] text-white shadow-[0_8px_22px_rgba(216,0,63,0.22)]"
                    : "border border-[#17191f]/20 bg-white text-[#17191f] hover:border-[#d8003f] hover:text-[#d8003f]"
                }`}
              >
                {String(page).padStart(2, "0")}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#17191f]/20 bg-white text-[#17191f] shadow-sm transition-all duration-300 hover:border-[#d8003f] hover:bg-[#d8003f] hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight
            size={21}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </motion.div>
  );
}

function BackgroundDecorations() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-32 -top-20 hidden h-80 w-80 rounded-full border-[30px] border-[#f5dce0]/45 sm:block"
      />

      <motion.div
        animate={{
          x: [0, -8, 0],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-24 -right-20 hidden h-72 w-72 rounded-full border-[28px] border-[#f5dce0]/40 md:block"
      />

      <div className="pointer-events-none absolute right-5 top-6 opacity-50 sm:right-8 md:right-12">
        <DotPattern />
      </div>
    </>
  );
}

function DotPattern() {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 25 }).map(
        (_, index) => {
          const row = Math.floor(index / 5);
          const column = index % 5;

          return (
            <circle
              key={index}
              cx={column * 14 + 4}
              cy={row * 14 + 4}
              r="1.4"
              fill="#d8003f"
              opacity={
                0.2 +
                ((row + column) % 3) * 0.06
              }
            />
          );
        },
      )}
    </svg>
  );
}