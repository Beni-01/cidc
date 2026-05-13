export interface Participant {
  id: number;
  titre: "Monsieur" | "Madame";
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  profession: string;
  fonction: string;
  organisation: string;
  ville: string;
  niveauEtude: string;
  dateInscription: string | Date;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string | unknown[];
}
