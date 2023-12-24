import { logo } from '../../assets';
import { socialMedia } from '../../constants';

const Footer = () => (
  <section className={`flex flex-col py-8`}>
    <div className={`sm:flex-row flex-col w-full items-center justify-start`}>
      <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
        <img src={logo} alt="logo" className="w-[180px] h-auto" />
        <p className={`font-poppins text-dimWhite font-thin text-sm mt-4 mb-2`}>
          A new way to make the reservations easy.
        </p>
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E40]">
      <p className="font-poppins font-normal text-center text-sm text-white">
        &#169; 2023 Diamond hotel. All Rights Reserved.
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
