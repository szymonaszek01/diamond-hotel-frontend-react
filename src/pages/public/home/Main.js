import styles from '../../../style';
import { main } from '../../../assets';
import GetStartedRounded from './GetStartedRounded';

const Main = () => {
  return (
    <section id="home" className={`flex sm:flex-row flex-col sm:items-center`}>
      <div className={`text-center sm:text-start w-full sm:w-[50%] flex flex-col`}>
        <div className="sm:flex sm:flex-row sm:justify-between sm:items-center sm:w-full">
          <h1 className="font-poppins font-semibold text-5xl sm:text-6xl text-white leading-[70px] sm:leading-[90px] break-words">
            The Next <br className="sm:block hidden" />{' '}
            <span className="text-gradient">Generation</span>{' '}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStartedRounded />
          </div>
        </div>
        <h1 className="font-poppins font-semibold text-5xl sm:text-6xl text-white leading-[70px] sm:leading-[90px] break-words">
          Room booking system.
        </h1>
        <p className={`font-poppins text-base text-dimWhite max-w-[470px] mt-5`}>
          Spend your vacation in one of the most outstanding places on the world.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} relative mt-8 sm:mt-0`}>
        <img src={main} alt="main-img" className="w-[100%] h-[100%] relative z-[5]" />
      </div>

      <div className={`ss:hidden ${styles.flexCenter} mt-8 sm:mt-0`}>
        <GetStartedRounded />
      </div>
    </section>
  );
};

export default Main;
