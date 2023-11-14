import { infoMenu } from '../../assets';
import Popup from 'reactjs-popup';

const TableActionModal = ({ id, cellList, actionList, hidden }) => {
  return (
    <Popup
      key={`action-table-${id}-popup`}
      trigger={
        hidden ? (
          ``
        ) : (
          <button className="flex items-center justify-center">
            <img src={infoMenu} alt="info" className="w-[15px] rotate-90 h-auto cursor-pointer" />
          </button>
        )
      }
      position="bottom center"
      nested
      on={['hover']}>
      {(closePopup) => (
        <div className="flex flex-col p-3 border-none w-[100px] gap-5 bg-yellow-gradient outline-none rounded-[3px] items-start justify-center">
          {actionList
            ?.filter(
              (action) =>
                action.excluded.filter((obj) =>
                  cellList.find((cell) => cell.name === obj.name && cell.value === obj.value)
                )?.length === 0
            )
            .map(({ api, form, parameterList }) =>
              form({
                id,
                api,
                requiredCellList: cellList.filter((cell) => parameterList?.includes(cell.name)),
              })
            )}
        </div>
      )}
    </Popup>
  );
};

export default TableActionModal;
