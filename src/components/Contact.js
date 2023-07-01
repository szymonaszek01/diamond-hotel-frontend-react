import React, {useEffect} from 'react';
import {contact, features, leafletMap} from "../constants";
import styles, {layout} from "../style";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ContactItem = ({icon, title, content, index}) => (
  <div className={`flex flex-row py-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain"/>
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
)

const Contact = () => {
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: leafletMap.icon,
    shadowUrl: leafletMap.iconShadow,
  })

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
    }
  }, [])

  return (
    <section id="contact" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Contact
        </h2>
        {contact.map((feature, index) => (
          <ContactItem key={feature.id} {...feature} index={index}/>
        ))}
      </div>

      <div className={layout.sectionImg}>
        <div id="map-container" className="w-[100%] h-[100%] rounded-[10px]"/>
      </div>
    </section>
  )
}

export default Contact