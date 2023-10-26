import { randomCode, updateOptionList } from '../util';

const SelectorCard = ({
  optionList,
  setOptionList,
  id,
  label,
  value,
  isSelected,
  cardWidth,
  setPage,
}) => {
  return (
    <div
      key={`selector-card-${randomCode(7)}`}
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
      className={`w-full sm:w-[${cardWidth}] flex flex-col items-start justify-center p-6 rounded-[3px] border-[0.5px] ${
        isSelected ? 'border-white' : 'border-[#FFFFFF66]'
      } cursor-pointer`}>
      <p
        className={`text-xs ${
          isSelected ? 'text-gradient' : 'text-[#FFFFFF66]'
        } font-poppins font-semibold break-all`}>
        {label}
      </p>
      <p
        className={`text-sm ${
          isSelected ? 'text-white' : 'text-[#FFFFFF66]'
        } font-poppins font-semibold break-all`}>
        {value}
      </p>
    </div>
  );
};

const PageFormSelector = ({ optionList, setOptionList, cardWidth, setPage }) => {
  return (
    <div
      key={`page-form-selector-${randomCode(7)}`}
      className={'flex flex-col sm:flex-row gap-5 justify-start items-center w-full'}>
      {optionList.map((option) => (
        <SelectorCard
          optionList={optionList}
          setOptionList={setOptionList}
          id={option.id}
          label={option.label}
          value={option.value}
          isSelected={option.isSelected}
          cardWidth={cardWidth}
          setPage={setPage}
        />
      ))}
    </div>
  );
};

export default PageFormSelector;
