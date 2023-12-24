import { card } from '../../../assets';

const Product = () => (
  <section id="product" className={`w-full flex sm:flex-row flex-col justify-between items-start`}>
    <div className={`w-full sm:w-[40%] flex flex-col items-start justify-start`}>
      <h2
        className={`font-poppins font-semibold text-center sm:text-start text-5xl sm:text-6xl text-white leading-[70px] sm:leading-[90px] break-words`}>
        Modern booking system
      </h2>
      <p
        className={`font-poppins text-dimWhite text-center sm:text-start text-sm max-w-[470px] mt-5`}>
        Automation of the most important processes related to the daily operation of the hotel has a
        positive impact on staff efficiency and improves the quality of customer service.
      </p>
    </div>

    <div className={`w-full sm:w-[50%] sm:pl-5 sm:py-5 mt-11 sm:mt-0`}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default Product;
