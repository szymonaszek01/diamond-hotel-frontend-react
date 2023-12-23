import React, { useEffect } from 'react';
import { contact, leafletMap } from '../../../constants';
import styles from '../../../style';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ContactItem = ({ icon, title, content }) => (
  <div
    className={`flex flex-col sm:flex-row w-full sm:w-auto items-center justify-center sm:justify-start py-6 rounded-full mb-6`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimYellow`}>
      <img src={icon} alt={`icon-${title}`} className="w-[50%] h-[50%]" />
    </div>
    <div className="flex flex-col justify-center items-center sm:items-start ml-0 sm:ml-3">
      <h4 className="font-poppins font-semibold text-white break-all text-xl mb-1">{title}</h4>
      <p className="font-poppins text-dimWhite break-all text-sm">{content}</p>
    </div>
  </div>
);

const Contact = () => {
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: leafletMap.icon,
    shadowUrl: leafletMap.iconShadow,
  });

  useEffect(() => {
    const map = L.map('map-container').setView([leafletMap.lat, leafletMap.lng], leafletMap.zoom);

    L.tileLayer(leafletMap.titleLayer, {
      attribution: leafletMap.attribution,
      maxZoom: leafletMap.maxZoom,
    }).addTo(map);

    const marker = L.marker([leafletMap.lat, leafletMap.lng])
      .addTo(map)
      .bindPopup(leafletMap.address);

    return () => {
      map.remove();
      marker.remove();
    };
  }, []);

  return (
    <section id="contact" className={`flex sm:flex-row flex-col`}>
      <div className={`w-full sm:w-[50%]`}>
        <h2
          className={`font-poppins font-semibold text-4xl sm:text-5xl text-white sm:text-start text-center mb-6`}>
          Contact
        </h2>
        {contact.map((feature, index) => (
          <ContactItem key={feature.id} {...feature} index={index} />
        ))}
      </div>

      <div className={`w-full sm:w-[50%] flex ${styles.flexCenter}`}>
        <div id="map-container" className="w-[100%] h-[100%] rounded-[10px]" />
      </div>
    </section>
  );
};

export default Contact;
