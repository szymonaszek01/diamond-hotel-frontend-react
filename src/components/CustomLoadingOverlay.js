import LoadingOverlay from "react-loading-overlay";

const CustomLoadingOverlay = ({message}) => {
  return (
    <LoadingOverlay active={true} spinner text={message} className={"loading-overlay"}/>
  )
}

export default CustomLoadingOverlay