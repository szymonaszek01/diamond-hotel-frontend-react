import LoadingOverlay from 'react-loading-overlay';

const CustomLoadingOverlay = ({ message }) => {
  LoadingOverlay.propTypes = undefined;
  return (
    <div key={'custom-overlay'}>
      <LoadingOverlay active={true} spinner text={message} className={'loading-overlay z-99'} />
    </div>
  );
};

export default CustomLoadingOverlay;
