"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import contentData from "@/src/data";
import type { NavbarData } from "@/src/types/content";

const navbar = contentData.navbar as NavbarData;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const { logo, navigation, cta, mobile, theme } = navbar;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = ["contact", "team", "gallery", "process", "services", "about", "hero"];
        const scrollPosition = window.scrollY + 220;

        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.slice(1);
      if (pathname === "/" && targetId === "hero") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        setActiveSection("hero");
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
    setMobileOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
      setActiveSection("hero");
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
      return activeSection === sectionId || (sectionId === "hero" && (activeSection === "hero" || activeSection === ""));
    }
    return false;
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Main navigation"
        style={{
          backgroundColor: isScrolled ? "rgba(32, 33, 38, 0.95)" : theme.background,
        }}
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.25)] border-b border-white/[0.08]"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label={logo.alt}
            className="relative flex-shrink-0 transition-opacity duration-200 hover:opacity-90"
          >
            <Image
              src={logo.image}
              alt={logo.alt}
              width={160}
              height={40}
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
                      className="transition-colors duration-200 group-hover:text-white"
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
            {cta && (
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
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            )}
          </ul>

          <button
            type="button"
            aria-label={mobileOpen ? mobile.closeLabel : mobile.menuLabel}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center rounded-sm p-2 transition-colors duration-200 md:hidden"
            style={{ color: theme.text }}
          >
            {mobileOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`fixed inset-0 z-40 flex flex-col transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: theme.background }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <nav
          aria-label="Mobile menu"
          className={`relative flex h-full flex-col pt-20 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
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
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: theme.accent }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {cta && (
            <div className="px-6 pb-12">
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
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
