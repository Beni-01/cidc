export interface NavLink {
  label: string;
  href: string;
}

export const navigationLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Intervenants", href: "/intervenants" },
  { label: "Programme", href: "/programme" },
  { label: "Contact", href: "/contact" },
  { label: "Inscription", href: "/inscription" },
];

export const footerLinks = {
  navigation: navigationLinks,
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
  ],
};
