import LoadingOverlay from "react-loading-overlay";

const CustomLoadingOverlay = ({message}) => {
  return (
    <div>
      <LoadingOverlay active={true} spinner text={message} className={"loading-overlay"}/>
    </div>
  )
}

export default CustomLoadingOverlay