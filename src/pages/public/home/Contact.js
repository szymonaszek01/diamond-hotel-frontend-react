import React from 'react';
import { contact } from '../../../constants';
import styles from '../../../style';

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
  return (
    <section id="contact" className={`w-full flex flex-col`}>
      <div className={`w-full flex flex-col sm:flex-row justify-between mt-1`}>
        {contact.map((feature, index) => (
          <ContactItem key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Contact;
