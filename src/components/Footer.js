import styles from '../style';
import { logo } from '../assets';
import { socialMedia } from '../constants';

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex flex-col ${styles.paddingX}`}>
    <div className={`${styles.flexStart} md:flex-row flex-col w-full`}>
      <div className="flex-[1] flex flex-col mr-10">
        <img src={logo} alt="hoobank" className="w-[200px] h-[40px] object-contain" />
        <p className={`${styles.paragraph} mt-4`}>
          A new way to make the reservations easy, reliable and secure.
        </p>
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2022 Diamond hotel. All Rights Reserved.
      </p>

      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Footer;
