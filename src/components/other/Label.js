const Label = ({ hidden, value }) => {
  return <p className={`${hidden ? '' : 'hidden'} text-white text-xs ml-3 mb-1`}>{value}</p>;
};

export default Label;