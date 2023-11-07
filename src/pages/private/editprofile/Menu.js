import styles from '../../../style';

const Menu = ({ items, onClick }) => {
  const renderItem = (item) => {
    return (
      <button
        id={item.name}
        key={item.name}
        className={`${
          styles.paragraph
        } flex justify-center text-white text-xs p-3 rounded-[10px] cursor-pointer w-full sm:w-[150px] ${
          item.selected ? 'box-shadow' : ''
        }`}
        onClick={onClick}>
        {item.label}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-start justify-center gap-1 rounded-[10px] z-[0] sm:z-[99] w-full sm:w-[45%]">
      {Object.values(items).map((item) => renderItem(item))}
    </div>
  );
};

export default Menu;
