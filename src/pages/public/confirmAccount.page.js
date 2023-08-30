import {useNavigate} from "react-router-dom";
import {setAccountDetails, toAuthResMapper} from "../../redux/features/authSlice";
import {toast, ToastContainer} from "react-toastify";
import {useConfirmAccountMutation} from "../../redux/api/authApiSlice";
import {useDispatch} from "react-redux";
import styles from "../../style";
import {CustomLoadingOverlay, Footer, Navbar, ResendConfirmAccountEmail} from "../../components";
import {useEffect} from "react";

const ConfirmAccountPage = () => {
  const getUrlParam = (name) => {
    const queryParams = new URLSearchParams(window.location.search)
    const encodedParam = queryParams.get(name)

    return encodedParam ? decodeURIComponent(encodedParam) : null
  }

  const [confirmAccount, {isLoading}] = useConfirmAccountMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const confirmationToken = getUrlParam("confirmation-token")
  if (!confirmationToken) {
    navigate('/')
  }

  const navConfig = {
    page: null,
    isToggled: false,
    navbarLinks: null
  }

  useEffect(() => {
    const confirm = async () => {
      try {
        const response = await confirmAccount(confirmationToken).unwrap()
        dispatch(setAccountDetails(toAuthResMapper(response)))
        navigate('/dashboard')

      } catch (error) {
        toast.error('Account confirmation Failed.')
      }
    }

    confirm().then(() => console.log("Account confirmed"))
  }, [confirmAccount, confirmationToken, dispatch, navigate])

  return isLoading ? (
    <CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig}/>
        </div>
      </div>

      <ToastContainer className={"toast-style"}/>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex justify-center items-center mt-4 mb-16">
            <ResendConfirmAccountEmail token={confirmationToken}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default ConfirmAccountPage