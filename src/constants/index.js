import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { email, facebook, instagram, linkedin, localization, telephone, twitter } from '../assets';

export const role = {
  user: 'USER',
  admin: 'ADMIN',
};

export const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export const measurement = {
  temperatureDay: 'temperatureDay',
  temperatureNight: 'temperatureNight',
  pressure: 'pressure',
  wind: 'wind',
  humidity: 'humidity',
  clouds: 'clouds',
  rain: 'rain',
  uvi: 'uvi',
};

export const apiMethods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

export const apiErrors = {
  badRequest: {
    status: 400,
    message: 'Bad request',
  },
  unauthorized: {
    status: 401,
    message: 'Unauthorized',
  },
  forbidden: {
    status: 403,
    message: 'Forbidden',
  },
  notFound: {
    status: 404,
    message: 'Not found',
  },
  conflict: {
    status: 409,
    message: 'Conflict',
  },
  unprocessableEntity: {
    status: 422,
    message: 'Unprocessable entity',
  },
  internalServerError: {
    status: 500,
    message: 'Internal server error',
  },
};

export const inputsInfo = {
  user: {
    image: { type: 'file', label: 'Image', name: 'image' },
    email: { type: 'email', label: 'Email', name: 'email' },
    password: { type: 'password', label: 'Password', name: 'password' },
    repeated: { type: 'password', label: 'Repeated password', name: 'repeated' },
    firstname: { type: 'text', label: 'Firstname', name: 'firstname' },
    lastname: { type: 'text', label: 'Lastname', name: 'lastname' },
    age: { type: 'number', label: 'Age', name: 'age' },
    country: { type: 'text', label: 'Country', name: 'country' },
    passport: { type: 'text', label: 'Passport number', name: 'passport' },
    phone: { type: 'text', label: 'Phone number', name: 'phone' },
    city: { type: 'text', label: 'City', name: 'city' },
    street: { type: 'text', label: 'Street', name: 'street' },
    postal: { type: 'text', label: 'Postal code', name: 'postal' },
  },
  room: {
    number: { type: 'number', label: 'Number', name: 'number' },
    floor: { type: 'number', label: 'Floor', name: 'floor' },
    occupied: { type: 'number', label: 'Status', name: 'status' },
  },
  roomType: {
    checkIn: { type: '', label: 'Check in', name: 'checkIn' },
    checkOut: { type: '', label: 'Check out', name: 'checkOut' },
    name: { type: 'text', label: 'Name', name: 'name' },
    rooms: { type: 'number', label: 'Rooms', name: 'rooms' },
    adults: { type: 'number', label: 'Adults', name: 'adults' },
    children: { type: 'number', label: 'Children', name: 'children' },
    names: { type: '', label: 'Room type', name: 'names' },
    image: { type: 'file', label: 'Image', name: 'image' },
    pricePerHotelNight: {
      type: 'number',
      label: 'Price per hotel night ($)',
      name: 'pricePerHotelNight',
    },
    equipment: { type: '', label: 'Equipment', name: 'equipment' },
  },
  flight: {
    flightNumber: { type: 'text', label: 'Flight number', name: 'flightNumber' },
  },
  reservation: {
    id: { type: 'number', label: 'Reservation id', name: 'reservationId' },
    minDate: { type: '', label: 'Min date', name: 'minDate' },
    maxDate: { type: '', label: 'Max date', name: 'maxDate' },
    userProfileEmail: { type: 'text', label: 'User profile email', name: 'userProfileEmail' },
    minPaymentCost: { type: 'number', label: 'Min payment cost ($)', name: 'minPaymentCost' },
    maxPaymentCost: { type: 'number', label: 'Max payment cost ($)', name: 'maxPaymentCost' },
    paymentCharge: { type: 'text', label: 'Payment charge', name: 'paymentCharge' },
  },
};

export const itemsInfo = {
  user: {
    email: {
      name: 'email',
      label: 'Email',
    },
    password: {
      name: 'password',
      label: 'Password',
    },
    details: {
      name: 'details',
      label: 'Details',
    },
    image: {
      name: 'image',
      label: 'Image',
    },
  },
};

export const publicNavLinks = [
  {
    main: {
      id: 'home',
      title: 'Home',
      path: '/',
    },
    sections: [
      {
        id: 'product',
        title: 'Product',
      },
      {
        id: 'contact',
        title: 'Contact',
      },
    ],
  },
  {
    main: {
      id: 'sign-in',
      title: 'Sign in',
      path: '/sign-in',
    },
    sections: [],
  },
  {
    main: {
      id: 'sign-up',
      title: 'Sign up',
      path: '/sign-up',
    },
    sections: [],
  },
];

export const privateNavLinks = [
  {
    main: {
      id: 'dashboard',
      title: 'Home',
      path: '/dashboard',
    },
    sections: [],
  },
  {
    main: {
      id: 'reservations',
      title: 'Reservations',
      path: '/reservations',
    },
    sections: [],
  },
  {
    main: {
      id: 'settings',
      title: 'Settings',
      path: '/edit-profile',
    },
    sections: [],
  },
  {
    main: {
      id: 'log-out',
      title: 'Sign out',
      path: '/',
    },
    sections: [],
  },
];

export const stats = [
  {
    id: 'stats-1',
    title: 'User profile',
    value: '1700+',
  },
  {
    id: 'stats-2',
    title: 'Reservations',
    value: '1230+',
  },
  {
    id: 'stats-3',
    title: 'Income',
    value: '$100M+',
  },
];

export const socialMedia = [
  {
    id: 'social-media-1',
    icon: instagram,
    link: 'https://www.instagram.com/',
  },
  {
    id: 'social-media-2',
    icon: facebook,
    link: 'https://www.facebook.com/',
  },
  {
    id: 'social-media-3',
    icon: twitter,
    link: 'https://www.twitter.com/',
  },
  {
    id: 'social-media-4',
    icon: linkedin,
    link: 'https://www.linkedin.com/',
  },
];

export const leafletMap = {
  icon: icon,
  iconShadow: iconShadow,
  titleLayer: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
  attribution: 'Map data &copy; OpenStreetMap contributors',
  zoom: 14,
  maxZoom: 18,
  lat: 4.195762812224563,
  lng: 73.52610223044698,
  address: 'Address: Maldives, Malé Atoll',
};

export const contact = [
  {
    icon: localization,
    title: 'Address',
    content: 'Maldives, Malé Atoll',
  },
  {
    icon: telephone,
    title: 'Phone number',
    content: '+960 1234567',
  },
  {
    icon: email,
    title: 'Email',
    content: 'diamond.hotel.contact@gmail.com',
  },
];
