"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import contentData from "@/src/data";
import type { NavbarData } from "@/src/types/content";

export interface NavbarProps {
  data?: NavbarData;
}

function hexToRgba(hex: string, alpha: number): string {
  if (!hex || !hex.startsWith("#")) return hex || "rgba(32, 33, 38, 0.95)";
  const cleanHex = hex.replace("#", "");
  const normalized =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((c) => c + c)
          .join("")
      : cleanHex;
  const num = parseInt(normalized, 16);
  if (isNaN(num)) return hex;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Navbar({ data }: NavbarProps = {}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navbar = data || (contentData.navbar as NavbarData);
  const {
    logo = {
      image: "/logo/v-blue-logo.webp",
      alt: "VEYORA",
      href: "/",
      width: 160,
      height: 40,
    },
    navigation = [],
    cta,
    mobile = {
      menuLabel: "Menu",
      closeLabel: "Close",
    },
    theme = {
      background: "#202126",
      text: "#FFFFFF",
      mutedText: "#E5E5E5",
      accent: "#2563EB",
      ctaText: "#FFFFFF",
    },
  } = navbar;

  const logoHref = logo.href || "/";
  const logoWidth = logo.width || 160;
  const logoHeight = logo.height || 40;
  const menuLabel = mobile.menuLabel || "Menu";
  const closeLabel = mobile.closeLabel || "Close";
  const scrolledBg =
    theme.scrolledBackground || hexToRgba(theme.background, 0.95);
  const borderColor = theme.borderColor || "rgba(255, 255, 255, 0.08)";

  const { firstSectionId, lastSectionId, scrollCheckSections, hashSectionIds } =
    useMemo(() => {
      const navIds = navigation
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.slice(1));
      const ctaId =
        cta?.href?.startsWith("#") ? cta.href.slice(1) : undefined;

      const allIds = [...navIds, ...(ctaId ? [ctaId] : [])].filter(Boolean);
      const first = navIds[0] || "hero";
      const last = ctaId || navIds[navIds.length - 1] || "contact";

      const checkSections = [...allIds].reverse();

      return {
        firstSectionId: first,
        lastSectionId: last,
        scrollCheckSections: checkSections,
        hashSectionIds: allIds,
      };
    }, [navigation, cta]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const matched = hashSectionIds.find(
        (id) =>
          id === hash ||
          (id === "reviews" && hash === "testimonials") ||
          (id === "testimonials" && hash === "reviews")
      );
      if (matched) {
        setActiveSection(matched);
      } else if (hash) {
        setActiveSection(hash);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (isClickScrolling.current) return;

      if (pathname === "/") {
        if (window.scrollY < 80) {
          setActiveSection(firstSectionId);
          return;
        }

        const scrollBottom = window.innerHeight + window.scrollY;
        if (scrollBottom >= document.documentElement.scrollHeight - 50) {
          setActiveSection(lastSectionId);
          return;
        }

        const threshold = 180;

        for (const id of scrollCheckSections) {
          const el =
            document.getElementById(id) ||
            (id === "reviews" ? document.getElementById("testimonials") : null) ||
            (id === "testimonials" ? document.getElementById("reviews") : null);

          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [
    pathname,
    firstSectionId,
    lastSectionId,
    scrollCheckSections,
    hashSectionIds,
  ]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      const rawTargetId = href.slice(1);
      const targetId =
        rawTargetId === "testimonials" && !document.getElementById("testimonials")
          ? "reviews"
          : rawTargetId;

      if (pathname === "/" && (targetId === firstSectionId || targetId === "hero")) {
        e.preventDefault();
        setActiveSection(firstSectionId);
        isClickScrolling.current = true;
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      } else {
        const targetEl =
          document.getElementById(targetId) ||
          (targetId === "reviews" ? document.getElementById("testimonials") : null) ||
          (targetId === "testimonials" ? document.getElementById("reviews") : null);

        if (targetEl) {
          e.preventDefault();
          setActiveSection(targetId);
          isClickScrolling.current = true;
          if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
          clickTimeoutRef.current = setTimeout(() => {
            isClickScrolling.current = false;
          }, 800);

          targetEl.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
    setMobileOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname === "/" &&
      (logoHref === "/" || logoHref === `#${firstSectionId}` || logoHref === "#hero")
    ) {
      e.preventDefault();
      setActiveSection(firstSectionId);
      isClickScrolling.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
    setMobileOpen(false);
  };

  const getItemHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  const isItemActive = (href: string) => {
    if (pathname !== "/") {
      return pathname === href || pathname.startsWith(href + "/");
    }
    if (href.startsWith("#")) {
      const sectionId = href.slice(1);
      const normalizedSectionId =
        sectionId === "testimonials" ? "reviews" : sectionId;
      const normalizedActive =
        activeSection === "testimonials" ? "reviews" : activeSection;

      if (normalizedSectionId === firstSectionId) {
        return normalizedActive === firstSectionId || normalizedActive === "";
      }
      return normalizedActive === normalizedSectionId;
    }
    return false;
  };

  const cssVariables = {
    "--nav-bg": theme.background,
    "--nav-text": theme.text,
    "--nav-muted": theme.mutedText,
    "--nav-accent": theme.accent,
    "--nav-cta-text": theme.ctaText,
    "--nav-border": borderColor,
  } as React.CSSProperties;

  return (
    <div className="sticky top-0 z-50 w-full" style={cssVariables}>
      <nav
        aria-label="Main navigation"
        style={{
          backgroundColor: isScrolled ? scrolledBg : theme.background,
          borderBottomColor: isScrolled ? borderColor : "transparent",
        }}
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)] border-b"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <Link
            href={logoHref}
            onClick={handleLogoClick}
            aria-label={logo.alt}
            className="relative flex-shrink-0 transition-opacity duration-200 hover:opacity-90"
          >
            <Image
              src={logo.image}
              alt={logo.alt}
              width={logoWidth}
              height={logoHeight}
              priority
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex lg:gap-2">
            {navigation.map((item) => {
              const active = isItemActive(item.href);
              const href = getItemHref(item.href);

              return (
                <li key={item.label}>
                  <Link
                    href={href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={active ? "page" : undefined}
                    className="group relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 lg:px-4 lg:text-base"
                    style={{
                      color: active ? theme.accent : theme.mutedText,
                    }}
                  >
                    <span
                      className="transition-colors duration-200 group-hover:[color:var(--nav-text)]"
                      style={active ? { color: theme.accent } : {}}
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-3 right-3 h-[2px] transition-all duration-200 lg:left-4 lg:right-4"
                      style={{
                        backgroundColor: theme.accent,
                        opacity: active ? 1 : 0,
                      }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-3 right-3 h-[2px] opacity-0 transition-all duration-200 group-hover:opacity-100 lg:left-4 lg:right-4"
                      style={{
                        backgroundColor: theme.mutedText,
                      }}
                    />
                  </Link>
                </li>
              );
            })}
            {cta && cta.label && (
              <li className="ml-3 lg:ml-4">
                <Link
                  href={getItemHref(cta.href)}
                  onClick={(e) => handleNavClick(e, cta.href)}
                  aria-label={cta.label}
                  className="group flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold tracking-wider transition-all duration-300 hover:gap-3 hover:brightness-110 lg:px-6 lg:text-base"
                  style={{
                    backgroundColor: theme.accent,
                    color: theme.ctaText,
                  }}
                >
                  <span>{cta.label}</span>
                  {cta.showIcon !== false && (
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            )}
          </ul>

          <button
            type="button"
            aria-label={mobileOpen ? closeLabel : menuLabel}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center rounded-sm p-2 transition-colors duration-200 md:hidden"
            style={{ color: theme.text }}
          >
            {mobileOpen ? (
              <X size={26} aria-hidden="true" />
            ) : (
              <Menu size={26} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`fixed inset-0 z-[100] flex flex-col transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: theme.background }}
      >
        <div
          className="flex h-20 items-center justify-between px-6 border-b"
          style={{ borderBottomColor: borderColor }}
        >
          <Link
            href={logoHref}
            onClick={handleLogoClick}
            aria-label={logo.alt}
            className="relative flex-shrink-0"
          >
            <Image
              src={logo.image}
              alt={logo.alt}
              width={logoWidth}
              height={logoHeight}
              priority
              className="h-14 sm:h-16 w-auto object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label={closeLabel}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 hover:brightness-125 active:scale-95"
            style={{
              borderColor: borderColor,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: theme.text,
            }}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile menu links"
          className="relative flex flex-1 flex-col overflow-y-auto"
        >
          <ul className="flex flex-1 flex-col gap-1 px-6 py-6">
            {navigation.map((item) => {
              const active = isItemActive(item.href);
              const href = getItemHref(item.href);

              return (
                <li key={item.label}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group flex items-center justify-between border-b py-4 text-lg font-medium tracking-wide transition-colors duration-200"
                    style={{
                      color: active ? theme.accent : theme.text,
                      borderColor: borderColor,
                    }}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {cta && cta.label && (
            <div className="px-6 pb-10 pt-4">
              <Link
                href={getItemHref(cta.href)}
                onClick={(e) => handleNavClick(e, cta.href)}
                aria-label={cta.label}
                className="group flex w-full items-center justify-center gap-3 rounded-sm py-4 text-base font-semibold tracking-wider transition-all duration-300 hover:brightness-110"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.ctaText,
                }}
              >
                <span>{cta.label}</span>
                {cta.showIcon !== false && (
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
