import { randomCode } from '../util';
import { infoMenu } from '../assets';

const TableActionMenu = ({ id, actionList, hidden }) => {
  return (
    <div key={`action-menu-${randomCode(7)}`} className={'flex items-center'}>
      <img
        src={infoMenu}
        alt={'info-menu'}
        className={`w-[15px] h-auto rotate-90 cursor-pointer ${hidden ? 'invisible' : 'visible'}`}
      />
    </div>
  );
};

export default TableActionMenu;
