import contentData from './content.json';

const sections = contentData.Veyora.sections;

export const navbar = sections.Header.variants.VeyoraHeader1;
export const hero = sections.Banner.variants.VeyoraBanner1;
export const aboutSection = sections.AboutSection.variants.VeyoraAboutSection1;
export const services = sections.Services.variants.VeyoraServices1;
export const processSection = sections.ProcessSection.variants.VeyoraProcess1;
export const gallery = sections.Gallery.variants.VeyoraGallery1;
export const ourTeam = sections.Team.variants.VeyoraTeam1;
export const testimonials = sections.Testimonial.variants.VeyoraTestimonial1;
export const contactSection = sections.ContactSection.variants.VeyoraContact1;
export const footer = sections.Footer.variants.VeyoraFooter1;

const content = {
  navbar,
  hero,
  aboutSection,
  services,
  processSection,
  gallery,
  ourTeam,
  testimonials,
  contactSection,
  footer,
};

export default content;
