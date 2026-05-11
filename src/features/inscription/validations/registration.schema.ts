import { z } from "zod";

export const registrationSchema = z.object({
  titre: z.enum(["Monsieur", "Madame"], {
    message: "Le titre est requis",
  }),
  prenom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  telephone: z.string().min(8, { message: "Veuillez entrer un numéro de téléphone valide" }),
  email: z.email({ message: "Veuillez entrer une adresse email valide" }),
  profession: z.string().min(2, { message: "La profession est requise" }),
  fonction: z.string().min(2, { message: "La fonction est requise" }),
  organisation: z.string().min(2, { message: "L'organisation / institution est requise" }),
  ville: z.string().min(2, { message: "La ville de résidence est requise" }),
  niveauEtude: z.string().min(2, { message: "Le niveau d'étude est requis" }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
