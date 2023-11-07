import { card } from '../../../assets';
import styles, { layout } from '../../../style';
import GetStartedNormal from './GetStartedNormal';

const Product = () => (
  <section id="product" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Seamless reservation management</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        We understand the importance of a smooth reservation process. Our advanced reservation
        management system ensures accuracy and efficiency in handling your bookings.
      </p>

      <GetStartedNormal styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default Product;
