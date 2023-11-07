import styles from '../../../style';
import GetStartedNormal from './GetStartedNormal';

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Let’s try our service now!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Experience the exceptional service and hospitality at our hotel. Let's make your stay
        unforgettable.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <GetStartedNormal />
    </div>
  </section>
);

export default CTA;
