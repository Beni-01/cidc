import { RegistrationFormData } from "../validations/registration.schema";
import { ApiResponse, Participant } from "../types";

export const registrationService = {
  async register(data: RegistrationFormData): Promise<ApiResponse<Participant>> {
    try {
      const response = await fetch("/api/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { error: result.error || "Une erreur est survenue" };
      }

      return { data: result };
    } catch (error) {
      console.error("Registration Service Error:", error);
      return { error: "Impossible de contacter le serveur" };
    }
  },
};
