"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormData } from "../../validations/registration.schema";
import { registrationService } from "../../services/registration.service";
import Button from "@/features/shared/components/Button";
import styles from "./RegistrationForm.module.scss";

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    const result = await registrationService.register(data);
    
    if (result.error) {
      setError(typeof result.error === 'string' ? result.error : "Erreur de validation");
    } else {
      setSuccess(true);
      reset();
    }
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIcon}>✓</div>
        <h2>Inscription réussie !</h2>
        <p>Merci pour votre inscription au colloque. Vous allez recevoir un e-mail de confirmation avec tous les détails pratiques.</p>
        <Button variant="dark" onClick={() => setSuccess(false)}>S&apos;INSCRIRE À NOUVEAU</Button>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.formIcon}>📝</div>
            <div>
              <h3>Inscription – Colloque International</h3>
              <p>Pour vous inscrire au colloque, veuillez soumettre ce formulaire. Vous recevrez un e-mail de confirmation avec tous les détails.</p>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {error && <div className={styles.errorBanner}>{error}</div>}

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Titre *</label>
              <div className={styles.radioGroup}>
                <label className={styles.radio}>
                  <input type="radio" value="Monsieur" {...register("titre")} />
                  <span>Monsieur</span>
                </label>
                <label className={styles.radio}>
                  <input type="radio" value="Madame" {...register("titre")} />
                  <span>Madame</span>
                </label>
              </div>
              {errors.titre && <span className={styles.error}>{errors.titre.message}</span>}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Prénom *</label>
                <input type="text" {...register("prenom")} placeholder="Votre prénom" />
                {errors.prenom && <span className={styles.error}>{errors.prenom.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Nom *</label>
                <input type="text" {...register("nom")} placeholder="Votre nom" />
                {errors.nom && <span className={styles.error}>{errors.nom.message}</span>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Numéro de téléphone *</label>
                <input type="tel" {...register("telephone")} placeholder="+243 ..." />
                {errors.telephone && <span className={styles.error}>{errors.telephone.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Adresse e-mail *</label>
                <input type="email" {...register("email")} placeholder="exemple@email.com" />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Votre profession *</label>
                <input type="text" {...register("profession")} placeholder="Ex: Avocat, Professeur" />
                {errors.profession && <span className={styles.error}>{errors.profession.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Votre fonction *</label>
                <input type="text" {...register("fonction")} placeholder="Votre titre actuel" />
                {errors.fonction && <span className={styles.error}>{errors.fonction.message}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label>Nom de l&apos;organisation / Institution *</label>
              <input type="text" {...register("organisation")} placeholder="Nom de l'institution" />
              {errors.organisation && <span className={styles.error}>{errors.organisation.message}</span>}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Ville de résidence *</label>
                <input type="text" {...register("ville")} placeholder="Votre ville" />
                {errors.ville && <span className={styles.error}>{errors.ville.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Niveau d&apos;étude *</label>
                <input type="text" {...register("niveauEtude")} placeholder="Ex: Doctorat, Master" />
                {errors.niveauEtude && <span className={styles.error}>{errors.niveauEtude.message}</span>}
              </div>
            </div>

            <div className={styles.disclaimer}>
              <span className={styles.checkIcon}>🛡</span>
              <p>Vos informations sont sécurisées et utilisées uniquement dans le cadre de l&apos;organisation du colloque.</p>
            </div>

            <div className={styles.actions}>
              <Button variant="dark" type="submit" disabled={isSubmitting} className={styles.submit}>
                {isSubmitting ? "ENVOI EN COURS..." : "SOUMETTRE L'INSCRIPTION →"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
