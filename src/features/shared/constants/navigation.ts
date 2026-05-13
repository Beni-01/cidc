export interface NavLink {
  label: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Programme", href: "/programme" },
  { label: "Intervenants", href: "/intervenants" },
  { label: "Ressources", href: "/ressources" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  navigation: navigationLinks,
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
  ],
};
