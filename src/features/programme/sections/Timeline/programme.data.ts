export interface ProgrammeItem {
  id: number;
  time: string;
  title: string;
  description?: string;
  location?: string;
  type: "session" | "break" | "ceremony" | "table-ronde";
  speakers?: string[];
}

export const programmeData = [
  {
    id: 1,
    time: "08:00 – 09:00",
    title: "Accueil des participants",
    description: "Enregistrement, remise des badges et documents du colloque. Café de bienvenue.",
    location: "Hall principal",
    type: "break",
  },
  {
    id: 2,
    time: "09:00 – 10:30",
    title: "Allocution d'ouverture et présentation des enjeux du colloque",
    type: "session",
    location: "Amphithéâtre A",
    speakers: ["Pr. Achille Mbembe", "Pr. Idrissa Mbaye", "Pr. Thérèse Kouassi"],
  },
  {
    id: 3,
    time: "10:45 – 12:15",
    title: "Le pouvoir constituant : fondements et limites",
    type: "session",
    location: "Salle 1",
    speakers: ["Pr. Antoine Vauchez"],
  },
  {
    id: 4,
    time: "14:00 – 15:30",
    title: "Juge constitutionnel et État de droit",
    type: "session",
    location: "Salle 1",
    speakers: ["Pr. Marie-Louise Abomo"],
  },
  {
    id: 5,
    time: "17:30 – 19:00",
    title: "Le rôle des cours constitutionnelles en Afrique",
    type: "table-ronde",
    location: "Amphithéâtre A",
    speakers: ["Pr. Fatou Kiné Camara", "Pr. Pape Ndiaye"],
  },
  {
    id: 6,
    time: "20:00",
    title: "Dîner officiel",
    type: "ceremony",
    location: "Blazon Hotel, Kinshasa",
  },
];
