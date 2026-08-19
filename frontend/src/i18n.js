import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        diagnose: "Diagnose",
        history: "History",
        tracking: "Tracking",
        doctors: "Doctors",
        interview: "Clinical Interview",
        settings: "Settings",
        login: "Log In",
        register: "Sign Up",
        logout: "Log Out"
      },
      landing: {
        heroTitle: "Dermatological AI",
        heroSubtitle: "Clinical grade skin analysis, tracking, and specialist matching. Start your journey to healthier skin today."
      },
      history: {
        title: "Assessment History",
        subtitle: "A chronological record of your previous skin assessments and results.",
        emptyTitle: "No assessments yet",
        emptySub: "Complete your first skin check to start building your health record."
      },
      settings: {
        title: "Settings & Profile",
        updateBtn: "Update Profile"
      }
    }
  },
  es: {
    translation: {
      nav: {
        diagnose: "Diagnosticar",
        history: "Historial",
        tracking: "Seguimiento",
        doctors: "Doctores",
        interview: "Entrevista Clínica",
        settings: "Ajustes",
        login: "Iniciar Sesión",
        register: "Regístrate",
        logout: "Cerrar Sesión"
      },
      landing: {
        heroTitle: "IA Dermatológica",
        heroSubtitle: "Análisis de piel, seguimiento y emparejamiento con especialistas a nivel clínico. Comienza tu viaje hacia una piel más saludable hoy."
      },
      history: {
        title: "Historial de Evaluaciones",
        subtitle: "Un registro cronológico de sus evaluaciones y resultados anteriores.",
        emptyTitle: "Aún no hay evaluaciones",
        emptySub: "Complete su primer chequeo de piel para comenzar su registro médico."
      },
      settings: {
        title: "Ajustes y Perfil",
        updateBtn: "Actualizar Perfil"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        diagnose: "Diagnostiquer",
        history: "Historique",
        tracking: "Suivi",
        doctors: "Médecins",
        interview: "Entretien Clinique",
        settings: "Paramètres",
        login: "Connexion",
        register: "S'inscrire",
        logout: "Déconnexion"
      },
      landing: {
        heroTitle: "IA Dermatologique",
        heroSubtitle: "Analyse de la peau, suivi et mise en relation avec des spécialistes de niveau clinique. Commencez votre voyage vers une peau plus saine aujourd'hui."
      },
      history: {
        title: "Historique des Évaluations",
        subtitle: "Un dossier chronologique de vos évaluations cutanées et résultats précédents.",
        emptyTitle: "Aucune évaluation",
        emptySub: "Effectuez votre premier examen pour commencer votre dossier médical."
      },
      settings: {
        title: "Paramètres et Profil",
        updateBtn: "Mettre à jour"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
