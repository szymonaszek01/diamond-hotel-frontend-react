import { randomCode, updateOptionList } from '../../util';

const SliderItem = ({ optionList, setOptionList, setPage, id, label, isSelected, itemWidth }) => {
  return (
    <div
      key={`slider-option-${randomCode(7)}`}
      onClick={() => {
        setPage(0);
        updateOptionList({
          optionList,
          setOptionList,
          selectedId: id,
          key: 'isSelected',
          newValue: true,
          previousValue: false,
        });
      }}
      className={`w-full sm:w-[${itemWidth}] flex flex-col sm:flex-row items-center justify-start p-2 ${
        isSelected ? 'border-b-[2px] border-white' : ''
      } cursor-pointer`}>
      <p
        className={`text-xs ${
          isSelected ? 'text-white' : 'text-[#FFFFFF66]'
        } font-poppins font-semibold break-all`}>
        {label}
      </p>
    </div>
  );
};

const TableSlider = ({ optionList, setOptionList, setPage, itemWidth }) => {
  return (
    <div
      key={`table-slider-${randomCode(7)}`}
      className={
        'flex flex-col sm:flex-row gap-5 justify-start items-center border-b-none sm:border-b-[0.5px] sm:border-[#FFFFFF66] w-full'
      }>
      {optionList.map((option) => (
        <SliderItem
          optionList={optionList}
          setOptionList={setOptionList}
          id={option.id}
          label={option.label}
          setPage={setPage}
          isSelected={option.isSelected}
          itemWidth={itemWidth}
        />
      ))}
    </div>
  );
};

export default TableSlider;
