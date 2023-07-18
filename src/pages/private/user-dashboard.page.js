import styles from "../../style";
import {toast} from "react-toastify";
import {useGetUserProfileByIdMutation} from "../../redux/api/userProfileApiSlice";
import {CustomLoadingOverlay} from "../../components";

const UserDashboardPage = () => {
  const [getUserProfileById, {isLoading}] = useGetUserProfileByIdMutation()

  const getData = async (e) => {
    e.preventDefault()

    try {
      const data = await getUserProfileById().unwrap()
      console.log(data)

    } catch (error) {
      toast.error('User profile not found')
    }
  }

  return isLoading ? (<CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className={`${styles.flexCenter}`}>
      <button onClick={getData}>Get test data</button>
    </div>
  )
}

export default UserDashboardPage