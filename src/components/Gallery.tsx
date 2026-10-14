"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import content from '../data';
const data = content.gallery;
const { galleryItems } = content.gallery;

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener("change", updateDevice);

    return () => {
      mediaQuery.removeEventListener("change", updateDevice);
    };
  }, []);

  const itemsPerPage = isMobile ? 4 : 8;

  const totalPages = Math.ceil(
    galleryItems.length / itemsPerPage,
  );

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return galleryItems.slice(
      startIndex,
      startIndex + itemsPerPage,
    );
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const openGallery = (index: number) => {
    const globalIndex =
      (currentPage - 1) * itemsPerPage + index;

    setActiveIndex(globalIndex);
  };

  const closeGallery = () => {
    setActiveIndex(null);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
      scrollToGallery();
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
      scrollToGallery();
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    scrollToGallery();
  };

  const scrollToGallery = () => {
    window.requestAnimationFrame(() => {
      const element =
        document.getElementById("gallery-grid");

      if (!element) {
        return;
      }

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        120;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  };

  const showPreviousImage = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === 0
        ? galleryItems.length - 1
        : current - 1;
    });
  };

  const showNextImage = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return null;
      }

      return current === galleryItems.length - 1
        ? 0
        : current + 1;
    });
  };

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#fcfaf8] px-5 py-2 sm:px-8 sm:py-4 md:px-10 md:py-6 lg:px-12 lg:py-8 xl:px-16">
        <div className="mx-auto max-w-[1500px]">
          <GalleryHeader data={data} />

          <div
            id="gallery-grid"
            className="mt-10 grid grid-cols-1 gap-x-5 gap-y-7 sm:mt-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:mt-14 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-8"
          >
            <AnimatePresence mode="wait">
              {visibleItems.map((item: any, index: number) => (
                <GalleryCard
                  key={`${currentPage}-${item.title}`}
                  item={item}
                  index={index}
                  onOpen={() => openGallery(index)}
                />
              ))}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
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

      <GalleryLightbox
        activeIndex={activeIndex}
        onClose={closeGallery}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
      />
    </>
  );
}

function GalleryHeader({ data }: { data: any }) {
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
      className="grid items-end gap-6 lg:grid-cols-[1fr_auto]"
    >
      <div>
               <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex rounded-full border-2 border-[#d8003f] px-6 py-2 "
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
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-3 max-w-[1000px] text-[56px] font-bold leading-[1.02] tracking-[-0.05em] text-[#101522]"
        >
          {data.headingStart}{" "}
          <span className="text-[#c9003b]">
            {data.headingHighlight}
          </span>
        </motion.h2>
      </div>

      <motion.p
        initial={{
          opacity: 0,
          x: 25,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.3,
        }}
        className="max-w-[320px] text-[15px] leading-[1.45] text-gray-500 sm:text-[17px] lg:pb-2 lg:text-right"
      >
        {data.description}
      </motion.p>
    </motion.div>
  );
}

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: (typeof galleryItems)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 45,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title}`}
        className="block w-full cursor-pointer text-left"
      >
        <div className="relative aspect-[1.72/1] overflow-hidden rounded-[10px] bg-[#f0eeee]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/[0.12]" />

          <div className="absolute right-4 top-4 flex h-10 w-10 scale-90 items-center justify-center rounded-full bg-white text-[#11151c] opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <ArrowUpRight size={19} />
          </div>
        </div>
      </button>

      <div className="flex items-center justify-between px-1 pt-2.5">
        <h3 className="text-base font-medium tracking-[-0.02em] text-[#17191f] sm:text-lg">
          {item.title}
        </h3>

        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${item.title}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center text-[#17191f] transition-colors duration-300 hover:text-[#c9003b]"
        >
          <ArrowUpRight size={18} />
        </button>
      </div>
    </motion.div>
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
          aria-label="Previous gallery page"
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
            const isActive = currentPage === page;

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
          aria-label="Next gallery page"
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

function GalleryLightbox({
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#090a0d]/[0.94] p-4 backdrop-blur-md sm:p-8 lg:p-12"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-full w-full max-w-[1250px] flex-col items-center justify-center"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="absolute right-0 top-0 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#11151c] sm:right-2 sm:top-2"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={onPrevious}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#11151c] sm:left-2 sm:h-14 sm:w-14"
            >
              <ArrowLeft size={23} />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-0 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#11151c] sm:right-2 sm:h-14 sm:w-14"
            >
              <ArrowRight size={23} />
            </button>

            <div className="relative flex h-[calc(100%-100px)] w-[calc(100%-80px)] items-center justify-center sm:h-[calc(100%-110px)] sm:w-[calc(100%-150px)]">
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={activeIndex}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    x: -20,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={galleryItems[activeIndex].image}
                    alt={galleryItems[activeIndex].title}
                    fill
                    priority
                    className="object-contain"
                    sizes="90vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-center text-white">
              <span className="text-sm font-medium sm:text-base">
                {galleryItems[activeIndex].title}
              </span>

              <span className="text-white/40">
                /
              </span>

              <span className="text-sm text-white/60 sm:text-base">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(galleryItems.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
