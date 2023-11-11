import { CustomTagWithLabel } from '../index';
import { transferObjectKeyToLabel } from '../../util';

const TableFiltersTagContainer = ({ name, advancedFilters }) => {
  return Object.values(advancedFilters).find(
    (advancedFilter) => advancedFilter.value.length > 0
  ) !== undefined ? (
    <div className={'w-full flex flex-wrap gap-5'} key={name}>
      {Object.values(advancedFilters)
        .filter(({ value }) => value.length > 0)
        .map(({ queryParamName, value }) => (
          <CustomTagWithLabel
            name={queryParamName.replaceAll('_', '-')}
            value={queryParamName.includes('cost') ? value + '$' : value}
            label={transferObjectKeyToLabel(queryParamName)}
            labelStyle={'text-xs text-xxs text-white'}
            valueStyle={'text-xs font-semibold text-gradient'}
            styles={'border-[1px] px-3 py-2 border-white rounded-[4px]'}
          />
        ))}
    </div>
  ) : (
    ''
  );
};

export default TableFiltersTagContainer;
