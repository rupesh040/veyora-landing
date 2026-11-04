"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUp, Mail, Phone } from "lucide-react";
import contentData from "@/src/data";
import type { FooterData } from "@/src/types/content";

const footerData = contentData.footer as FooterData;

export default function Footer() {
  const pathname = usePathname();
  const theme = footerData.theme || {
    background: "#202126",
    accent: "#2563eb",
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        const targetId = href.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  return (
    <footer
      style={{ backgroundColor: theme.background }}
      className="relative overflow-hidden border-t border-white/[0.08] text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1px,transparent_1.5px)] [background-size:64px_64px]" />
      <div
        style={{ backgroundColor: theme.accent }}
        className="pointer-events-none absolute -left-20 top-16 h-80 w-80 rounded-full opacity-[0.06] blur-[100px]"
      />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-white/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-16 sm:px-10 sm:pt-20 lg:px-16 lg:pb-20 lg:pt-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_0.8fr] lg:gap-12 xl:gap-20">
          <div className="max-w-[430px]">
            <Link
              href={getHref(footerData.brand.href)}
              onClick={(e) => handleLinkClick(e, footerData.brand.href)}
              className="inline-block transition-opacity duration-200 hover:opacity-90"
              aria-label={footerData.brand.alt}
            >
              <Image
                src={footerData.brand.logo}
                alt={footerData.brand.alt}
                width={270}
                height={80}
                className="h-20 sm:h-24 w-auto object-contain"
              />
            </Link>

            <p className="mt-8 max-w-[390px] text-[17px] leading-[1.75] text-white/80 sm:text-[18px]">
              {footerData.brand.tagline}
            </p>
            <div className="mt-9 space-y-3.5">
              <a
                href={`mailto:${footerData.contact?.email || 'hello@veyora.com'}`}
                className="group flex items-center gap-3 text-[17px] text-white/85 transition-colors duration-200 hover:text-white sm:text-[18px]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] transition-colors duration-200 group-hover:bg-[#2563eb]">
                  <Mail className="h-5 w-5" />
                </span>
                <span>{footerData.contact?.email || 'hello@veyora.com'}</span>
              </a>

              <a
                href={`tel:${footerData.contact?.phoneTel || '+15551234567'}`}
                className="group flex items-center gap-3 text-[17px] transition-colors duration-200 sm:text-[18px]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] transition-colors duration-200 group-hover:bg-[#2563eb]">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="font-medium text-white transition-opacity duration-200 hover:opacity-85">
                  {footerData.contact?.phone || '+1 (555) 123-4567'}
                </span>
              </a>
            </div>
          </div>

          {footerData.columns.map((column) => (
            <div key={column.title} className="flex flex-col">
              <h3 className="text-[23px] font-medium tracking-tight text-white sm:text-[26px]">
                {column.title}
              </h3>

              <nav className="mt-7 flex flex-col space-y-4">
                {column.links.map((link) => {
                  const isExternal =
                    link.href.startsWith("http") || link.href.startsWith("//");

                  if (isExternal) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit items-center gap-2 text-[17px] text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white sm:text-[18px]"
                      >
                        <span>{link.label}</span>
                      </a>
                    );
                  }

                  const href = getHref(link.href);

                  return (
                    <Link
                      key={link.label}
                      href={href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="group inline-flex w-fit items-center text-[17px] text-white/80 transition-all duration-200 hover:translate-x-1 hover:text-white sm:text-[18px]"
                    >
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t border-white/[0.08] bg-black/25">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 py-6 text-[15px] text-white/70 sm:px-10 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <p>
            {footerData.legal.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <button
              type="button"
              onClick={handleScrollToTop}
              className="group inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-wider text-white/70 transition-colors duration-200 hover:text-white cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.1] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:bg-white/[0.12]">
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
