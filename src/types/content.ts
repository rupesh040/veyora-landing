export interface NavbarItem {
  label: string;
  href: string;
}

export interface NavbarData {
  logo: {
    image: string;
    alt: string;
    href?: string;
    width?: number;
    height?: number;
  };
  navigation: NavbarItem[];
  cta?: {
    label: string;
    href: string;
    showIcon?: boolean;
  };
  mobile: {
    menuLabel: string;
    closeLabel: string;
    ariaLabel?: string;
  };
  theme: {
    background: string;
    text: string;
    mutedText: string;
    accent: string;
    ctaText: string;
    scrolledBackground?: string;
    borderColor?: string;
  };
}

export interface HeroData {
  brandTag: string;
  logo: {
    image: string;
    alt: string;
  };
  heading: {
    line1: string;
    line2: string;
  };
  description: string;
  cta: {
    label: string;
    href: string;
  };
  person: {
    image: string;
    alt: string;
  };
  theme?: {
    background: string;
    accent: string;
    circle: string;
    triangle: string;
    dots: string;
    headingText: string;
    bodyText: string;
  };
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  brand: {
    logo: string;
    alt: string;
    href: string;
    tagline: string;
  };
  contact: {
    email: string;
    phone: string;
    phoneTel: string;
  };
  columns: FooterColumn[];
  legal: {
    copyright: string;
    links: FooterLink[];
  };
  theme?: {
    background: string;
    accent: string;
  };
}

export interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface TestimonialsData {
  badge: string;
  heading: {
    line1: string;
    highlight: string;
  };
  description: string;
  items: TestimonialItem[];
}

export interface OurTeamMember {
  name: string;
  role: string;
  image: string;
  socials?: {
    platform: string;
    url: string;
    iconSvg: string;
  }[];
}

export interface OurTeamData {
  badge: string;
  heading: {
    line1: string;
    highlight: string;
  };
  description: string;
  members: OurTeamMember[];
  theme?: {
    background?: string;
    accent?: string;
  };
}

export interface ContentData {
  navbar: NavbarData;
  hero: HeroData;
  testimonials?: TestimonialsData;
  ourTeam?: OurTeamData;
  footer: FooterData;
}
