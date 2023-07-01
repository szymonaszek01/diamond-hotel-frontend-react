import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  people01, people02, people03, facebook, instagram, linkedin, twitter, send, shield, star, email, telephone,
  localization
} from "../assets";

export const apiMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
};

export const apiErrors = {
  badRequest: {
    status: 400,
    message: "Bad request"
  },
  unauthorized: {
    status: 401,
    message: "Unauthorized"
  },
  forbidden: {
    status: 403,
    message: "Forbidden"
  },
  notFound: {
    status: 404,
    message: "Not found"
  },
  conflict: {
    status: 409,
    message: "Conflict"
  },
  unprocessableEntity: {
    status: 422,
    message: "Unprocessable entity"
  },
  internalServerError: {
    status: 500,
    message: "Internal server error"
  },
}

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "opinion",
    title: "Opinion",
  }
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Quick room booking",
    content:
      "Keep track of your upcoming stays and manage your reservations with ease",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Unparalleled room service",
    content:
      "Indulge in our top-notch room service that caters to your every need.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "I had an amazing experience at this hotel! The staff was incredibly friendly and attentive, " +
      "making me feel welcome from the moment I arrived.",
    name: "Herman Jensen",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Staying at this hotel exceeded all my expectations. The level of service was exceptional, " +
      "with every staff member going above and beyond to ensure my comfort.",
    name: "Steve Mark",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "I can't say enough good things about this hotel. From the moment I stepped foot in the lobby, " +
      "I was greeted with warmth and professionalism.",
    name: "Kenn Gallagher",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const leafletMap = {
  icon: icon,
  iconShadow: iconShadow,
  titleLayer: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  attribution: "Map data &copy; OpenStreetMap contributors",
  zoom: 14,
  maxZoom: 18,
  lat: 4.195762812224563,
  lng: 73.52610223044698,
  address: "Address: Maldives, Malé Atoll"
}

export const contact = [
  {
    icon: localization,
    title: "Address",
    content: "Maldives, Malé Atoll"
  },
  {
    icon: telephone,
    title: "Phone number",
    content: "+960 1234567"
  },
  {
    icon: email,
    title: "Email",
    content: "diamond.hotel@gmail.co"
  }
]