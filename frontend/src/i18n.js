import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: { diagnose: "Diagnose", history: "History", tracking: "Tracking", doctors: "Doctors", interview: "Clinical Interview", settings: "Settings", login: "Log In", register: "Sign Up", logout: "Log Out" },
      landing: {
        heroSub: "Dermatology, reimagined",
        heroTitle1: "Your skin, ",
        heroTitle2: "understood.",
        heroDesc: "Upload a photo. Get an instant clinical-grade assessment of your skin concern - built on diverse datasets to serve every skin tone with accuracy.",
        btnStart: "Start Your Skin Check",
        btnFind: "Find a Dermatologist",
        whatWeDo: "What we do",
        compSkinCare1: "Comprehensive skin care,",
        compSkinCare2: "in one place.",
        box1Title: "Skin Condition Detection",
        box1Desc: "Upload a photo of your concern and receive an instant assessment covering over 390 dermatological conditions - from eczema and psoriasis to melanoma indicators.",
        box2Title: "Photo-Based Tracking",
        box2Desc: "Track how your skin changes over weeks and months with side-by-side comparisons.",
        box3Title: "Built for Every Skin Tone",
        box3Desc: "Trained on globally diverse datasets across all 6 Fitzpatrick types for equitable accuracy.",
        box4Title: "Find a Dermatologist Near You",
        box4Desc: "When a follow-up is recommended, we connect you with board-certified dermatologists in your area for in-person evaluation and treatment planning.",
        btnBrowse: "Browse Directory",
        clinVal: "Clinical validation",
        clinValTitle: "Built on peer-reviewed research.",
        stat1Label: "Skin conditions covered",
        stat1Desc: "Including rare tropical and pediatric dermatological conditions.",
        stat2Label: "Assessment accuracy",
        stat2Desc: "Validated against board-certified dermatologist diagnoses.",
        stat3Label: "Fitzpatrick types supported",
        stat3Desc: "Equal accuracy from the lightest to the darkest skin tones.",
        ctaTitle: "Ready to check your skin?",
        ctaDesc: "It takes 30 seconds. Upload a photo, receive your assessment, and connect with a specialist if needed.",
        btnCreate: "Create Your Free Account",
        footerText: "DermAI is an educational screening tool and does not replace professional medical advice. Always consult a board-certified dermatologist."
      },
      history: { title: "Assessment History", subtitle: "A chronological record of your previous skin assessments and results.", emptyTitle: "No assessments yet", emptySub: "Complete your first skin check to start building your health record." },
      settings: { title: "Settings & Profile", updateBtn: "Update Profile" }
    }
  },
  es: {
    translation: {
      nav: { diagnose: "Diagnosticar", history: "Historial", tracking: "Seguimiento", doctors: "Doctores", interview: "Entrevista Clinica", settings: "Ajustes", login: "Iniciar Sesion", register: "Registrate", logout: "Cerrar Sesion" },
      landing: {
        heroSub: "Dermatología, reimaginada",
        heroTitle1: "Tu piel, ",
        heroTitle2: "comprendida.",
        heroDesc: "Sube una foto. Obtén una evaluación de grado clínico instantánea de tu problema de piel, construida sobre bases de datos diversas para servir a todos los tonos de piel con precisión.",
        btnStart: "Inicia tu revisión de piel",
        btnFind: "Encuentra un Dermatólogo",
        whatWeDo: "Qué hacemos",
        compSkinCare1: "Cuidado de la piel integral,",
        compSkinCare2: "en un solo lugar.",
        box1Title: "Detección de condiciones",
        box1Desc: "Sube una foto de tu problema y recibe una evaluación de más de 390 afecciones de la piel.",
        box2Title: "Seguimiento fotográfico",
        box2Desc: "Haz un seguimiento de los cambios de tu piel semana a semana.",
        box3Title: "Para todos los tonos",
        box3Desc: "Entrenado en datos globales diversos para precisión equitativa.",
        box4Title: "Dermatólogos cerca de ti",
        box4Desc: "Te conectamos con dermatólogos certificados en tu área para tu evaluación presencial.",
        btnBrowse: "Explorar Directorio",
        clinVal: "Validación Clínica",
        clinValTitle: "Basado en investigaciones revisadas por pares.",
        stat1Label: "Condiciones cubiertas",
        stat1Desc: "Incluyendo condiciones tropicales y pediátricas.",
        stat2Label: "Precisión",
        stat2Desc: "Validado contra diagnósticos de expertos.",
        stat3Label: "Tipos Fitzpatrick",
        stat3Desc: "Precisión igual para tonos de piel oscuros y claros.",
        ctaTitle: "¿Listo para revisar tu piel?",
        ctaDesc: "Solo toma 30 segundos. Sube una foto y conéctate con un especialista si es necesario.",
        btnCreate: "Crea tu Cuenta Gratis",
        footerText: "DermAI es una herramienta educativa y no sustituye el consejo médico."
      },
      history: { title: "Historial de Evaluaciones", subtitle: "Registro cronológico de evaluaciones.", emptyTitle: "Sin evaluaciones", emptySub: "Realiza tu primer chequeo." },
      settings: { title: "Ajustes y Perfil", updateBtn: "Actualizar Perfil" }
    }
  },
  fr: {
    translation: {
      nav: { diagnose: "Diagnostiquer", history: "Historique", tracking: "Suivi", doctors: "Médecins", interview: "Entretien Clinique", settings: "Paramètres", login: "Connexion", register: "S'inscrire", logout: "Déconnexion" },
      landing: {
        heroSub: "La dermatologie, repensée",
        heroTitle1: "Votre peau, ",
        heroTitle2: "comprise.",
        heroDesc: "Téléchargez une photo. Obtenez une évaluation clinique instantanée, conçue pour servir chaque couleur de peau avec précision.",
        btnStart: "Commencez votre examen",
        btnFind: "Trouvez un Dermatologue",
        whatWeDo: "Ce que nous faisons",
        compSkinCare1: "Soins complets de la peau,",
        compSkinCare2: "en un seul endroit.",
        box1Title: "Détection des conditions",
        box1Desc: "Recevez une évaluation couvrant plus de 390 affections dermatologiques.",
        box2Title: "Suivi photo",
        box2Desc: "Suivez l'évolution de votre peau avec des comparaisons côte à côte.",
        box3Title: "Pour toutes les peaux",
        box3Desc: "Entraîné sur des ensembles de données mondialement diversifiés.",
        box4Title: "Médecins près de chez vous",
        box4Desc: "Nous vous connectons avec des dermatologues certifiés dans votre région.",
        btnBrowse: "Parcourir l'annuaire",
        clinVal: "Validation clinique",
        clinValTitle: "Basé sur des recherches évaluées par des pairs.",
        stat1Label: "Affections couvertes",
        stat1Desc: "Y compris les conditions tropicales et pédiatriques.",
        stat2Label: "Précision",
        stat2Desc: "Validé par des dermatologues certifiés.",
        stat3Label: "Types Fitzpatrick",
        stat3Desc: "Précision équitable pour toutes les teintes.",
        ctaTitle: "Prêt à vérifier votre peau ?",
        ctaDesc: "Cela prend 30 secondes. Téléchargez une photo et obtenez votre évaluation.",
        btnCreate: "Créer un Compte Gratuit",
        footerText: "DermAI est un outil éducatif. Consultez toujours un médecin."
      },
      history: { title: "Historique des Évaluations", subtitle: "Dossier chronologique des évaluations.", emptyTitle: "Aucune évaluation", emptySub: "Effectuez votre premier examen." },
      settings: { title: "Paramètres et Profil", updateBtn: "Mettre à jour" }
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
      escapeValue: false
    }
  });

export default i18n;
