import styles from '../../../style';
import { arrowUp } from '../../../assets';

const GetStartedRounded = () => (
  <div
    className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-white p-[2px] cursor-pointer`}>
    <a
      className={`${styles.flexCenter} flex-col bg-yellow-gradient w-[100%] h-[100%] rounded-full`}
      href="/sign-up">
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-white">Get</span>
        </p>
        <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
      </div>

      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-white">Started</span>
      </p>
    </a>
  </div>
);

export default GetStartedRounded;
