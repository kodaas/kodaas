import {
  BiEnvelope,
  BiLinkExternal,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
  BiLogoStackOverflow,
  BiLogoYoutube,
} from "react-icons/bi";
import { FaSquareXTwitter, FaTelegram } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";

export const MOBILE_SCREEN = 767;

export const AI_SAMPLE_QUESTIONS = [
  "what do you do",
  "what are your plans",
  "How would you rate your skills",
  "what are your plans",
  "How would you rate your skills",
];

export const SOCIALS_LINKS = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/kodaas",
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "X",
    url: "https://x.com/_kodaas",
    icon: FaSquareXTwitter,
    status: "social",
  },
  {
    id: 3,
    name: "WhatsApp",
    url: "https://wa.me/+2347044896263/?text=Hi%20how%20are%20you%20doing%2C%20can%20we%20discuss%20briefly%3F",
    icon: RiWhatsappFill,
    status: "social",
  },
  {
    id: 4,
    name: "Email",
    url: "mailto:johnajala204@gmail.com",
    icon: BiEnvelope,
    status: "social",
  },
  {
    id: 5,
    name: "Linkedin",
    url: "https://www.linkedin.com/in/kodaas/",
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id: 6,
    name: "Telegram",
    url: "https://t.me/kodaas1",
    icon: FaTelegram,
    status: "social",
  },
  {
    id: 7,
    name: "Instagram",
    url: "https://www.instagram.com/__kodaas",
    icon: BiLogoInstagram,
    status: "social",
  },
  {
    id: 8,
    name: "Youtube",
    url: "https://www.youtube.com/@FiyinfoluwaAjala",
    icon: BiLogoYoutube,
    status: "social",
  },
  {
    id: 9,
    name: "Daily.dev",
    url: "https://app.daily.dev/kodaas",
    icon: BiLinkExternal,
    status: "social",
  },
  {
    id: 10,
    name: "Stackoverflow",
    url: "https://stackoverflow.com/users/22437072/fiyinfoluwa-john-ajala",
    icon: BiLogoStackOverflow,
    status: "social",
  },
];

export const CUSTOM_THEME = {
  light: ["#f0f0f0", "#fde047", "#eab308", "#713f12", "#713f12"],
  dark: ["#161b22", "#713f12", "#a16207", "#eab308", "#fde047 "],
};

export const GITHUB_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};
