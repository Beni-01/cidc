import { z } from "zod";

export const registrationSchema = z.object({
  titre: z.enum(["Monsieur", "Madame"], {
    message: "Le titre est requis",
  }),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  telephone: z.string().min(8, "Veuillez entrer un numéro de téléphone valide"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  profession: z.string().min(2, "La profession est requise"),
  fonction: z.string().min(2, "La fonction est requise"),
  organisation: z.string().min(2, "L'organisation / institution est requise"),
  ville: z.string().min(2, "La ville de résidence est requise"),
  niveauEtude: z.string().min(2, "Le niveau d'étude est requis"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
