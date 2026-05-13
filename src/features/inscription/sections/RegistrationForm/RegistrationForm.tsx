"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormData } from "../../validations/registration.schema";
import { registrationService } from "../../services/registration.service";
import Button from "@/features/shared/components/Button";
import styles from "./RegistrationForm.module.scss";

type IconName = "user" | "phone" | "mail" | "briefcase" | "badge" | "building" | "pin" | "graduation";

function FieldIcon({ name }: { name: IconName }) {
  const icons: Record<IconName, ReactNode> = {
    user: <><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
    badge: <><path d="M12 3 4 7v6c0 5 3.4 7.4 8 9 4.6-1.6 8-4 8-9V7l-8-4Z" /><path d="m9.5 12 1.8 1.8 3.7-4" /></>,
    building: <><path d="M4 21h16" /><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    graduation: <><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.fieldIcon}>
      {icons[name]}
    </svg>
  );
}

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
        <p>Merci pour votre inscription au colloque. Vos informations ont bien été enregistrées dans la base de données.</p>
        <Button variant="dark" onClick={() => setSuccess(false)}>S&apos;INSCRIRE À NOUVEAU</Button>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <div className={styles.formIcon}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
                <path d="M4 5h8M4 9h5" />
              </svg>
            </div>
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
                <div className={styles.inputWrap}>
                  <FieldIcon name="user" />
                  <input type="text" {...register("prenom")} placeholder="Votre prénom" />
                </div>
                {errors.prenom && <span className={styles.error}>{errors.prenom.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Nom *</label>
                <div className={styles.inputWrap}>
                  <FieldIcon name="user" />
                  <input type="text" {...register("nom")} placeholder="Votre nom" />
                </div>
                {errors.nom && <span className={styles.error}>{errors.nom.message}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label>Numéro de téléphone *</label>
              <div className={styles.phoneLine}>
                <div className={styles.inputWrap}>
                  <FieldIcon name="phone" />
                  <input type="tel" {...register("telephone")} placeholder="+243 97 000 00 00" />
                </div>
                <p className={styles.whatsappHint}>De préférence votre numéro WhatsApp.</p>
              </div>
              {errors.telephone && <span className={styles.error}>{errors.telephone.message}</span>}
            </div>

            <div className={styles.field}>
              <label>Adresse e-mail *</label>
              <div className={styles.inputWrap}>
                <FieldIcon name="mail" />
                <input type="email" {...register("email")} placeholder="exemple@email.com" />
              </div>
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Votre profession *</label>
                <div className={styles.inputWrap}>
                  <FieldIcon name="briefcase" />
                  <input type="text" {...register("profession")} placeholder="Votre profession" />
                </div>
                {errors.profession && <span className={styles.error}>{errors.profession.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Votre fonction *</label>
                <div className={styles.inputWrap}>
                  <FieldIcon name="badge" />
                  <input type="text" {...register("fonction")} placeholder="Votre fonction" />
                </div>
                {errors.fonction && <span className={styles.error}>{errors.fonction.message}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label>Nom de l&apos;organisation / Institution *</label>
              <div className={styles.inputWrap}>
                <FieldIcon name="building" />
                <input type="text" {...register("organisation")} placeholder="Nom de l'organisation" />
              </div>
              {errors.organisation && <span className={styles.error}>{errors.organisation.message}</span>}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label>Ville de résidence *</label>
                <div className={styles.inputWrap}>
                  <FieldIcon name="pin" />
                  <input type="text" {...register("ville")} placeholder="Votre ville" />
                </div>
                {errors.ville && <span className={styles.error}>{errors.ville.message}</span>}
              </div>
              <div className={styles.field}>
                <label>Niveau d&apos;étude *</label>
                <div className={styles.inputWrap}>
                  <FieldIcon name="graduation" />
                  <input type="text" {...register("niveauEtude")} placeholder="Votre niveau d'étude" />
                </div>
                {errors.niveauEtude && <span className={styles.error}>{errors.niveauEtude.message}</span>}
              </div>
            </div>

            <div className={styles.disclaimer}>
              <FieldIcon name="badge" />
              <p>Vos informations sont sécurisées et utilisées uniquement dans le cadre de l&apos;organisation du colloque.</p>
            </div>

            <div className={styles.actions}>
              <Button variant="dark" type="submit" disabled={isSubmitting} className={styles.submit}>
                {isSubmitting ? "ENVOI EN COURS..." : "SOUMETTRE L'INSCRIPTION →"}
              </Button>
              <p className={styles.mailHint}>Au besoin, vérifiez vos spams et marquez le mail comme sûr.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
