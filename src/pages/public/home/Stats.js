import { stats } from '../../../constants';

const Stats = () => (
  <section className={`flex flex-col sm:flex-row justify-between`}>
    {stats.map((stat) => (
      <div
        key={stat.id}
        className={`flex flex-col sm:flex-row justify-start items-center mb-11 sm:mb-0`}>
        <h4 className="font-poppins font-semibold text-3xl text-white text-center sm:text-start">
          {stat.value}
        </h4>
        <p className="font-poppins text-xl text-gradient text-center sm:text-start uppercase ml-0 sm:ml-3">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
