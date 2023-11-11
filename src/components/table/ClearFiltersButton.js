import { close } from '../../assets';

const ClearFiltersButton = ({ onClick }) => {
  return (
    <button
      key={`clear-filters-button`}
      onClick={onClick}
      className="min-w-[140px] w-full sm:w-auto flex items-center justify-center mt-[0.21rem] py-[0.63rem] px-4 border-white border-[1px] rounded-[4px] gap-2">
      <img src={close} alt="clear" className="w-auto h-[17px]" />
      <p className="w-full font-poppins font-thin text-[0.84rem] text-white">Clear filters</p>
    </button>
  );
};

export default ClearFiltersButton;
