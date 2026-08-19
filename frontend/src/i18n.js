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
