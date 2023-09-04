import {CustomLoadingOverlay, CustomStandardInput, CustomPhoneInput, CustomUploadFileInput, Modal, Footer, Navbar} from "../../components";
import styles from "../../style";
import {inputsInfo, itemsInfo, privateNavLinks} from "../../constants";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useUpdateAccountEmailMutation, useUpdateAccountPasswordMutation} from "../../redux/api/authApiSlice";
import {selectUserDetails} from "../../redux/features/userSlice";
import {logOut, setConfirmation, validatePassword} from "../../redux/features/authSlice";
import {useUpdateUserDetailsMutation, useUpdateUserImageMutation} from "../../redux/api/userApiSlice";
import {defaultUser, locked} from "../../assets";
import {requiredInputsErrorMessage} from "../../util";
import {useNavigate} from "react-router-dom";

const Menu = ({items, onClick}) => {
  const renderItem = (item) => {
    return (
      <button id={item.name} key={item.name}
              className={`${styles.paragraph} flex justify-center text-white text-xs p-3 rounded-[10px] cursor-pointer w-full sm:w-[150px] ${item.selected ? 'box-shadow' : ''}`}
              onClick={onClick}>{item.label}</button>
    )
  }

  return (
    <div className="flex flex-col items-start justify-center gap-1 rounded-[10px] z-[0] sm:z-[99] w-full sm:w-[45%]">
      {Object.values(items).map(item => renderItem(item))}
    </div>
  )
}

const UpdateForm = ({title, form, error, onUpdate, onChange, isOAuth2User}) => {
  const warning = isOAuth2User && (title === "email" || title === "password")

  const renderRow = (input, index) => {
    const isError = () => {
      return error.fields.find(field => field === input.name)
    }

    const imageConfig = {
      visible: true,
      default: input.picture === null,
      src: input.picture ? "data:image/png;base64," + input.picture : defaultUser,
      alt: "user-image"
    }

    const renderInput = () => {
      if (input.name === "image") {
        return (<CustomUploadFileInput attributes={input} error={isError()} onChange={onChange} image={imageConfig}/>)
      } else if (input.name === "phone") {
        return (<CustomPhoneInput attributes={input} error={isError()} onChange={onChange}/>)
      } else {
        return (<CustomStandardInput attributes={input} error={isError()} onChange={onChange}/>)
      }
    }

    return (
      <div key={`row-${title}-${index}`}
           className={`flex flex-col sm:flex-row items-center justify-between px-4 pb-4 ${index === 0 ? 'pt-8' : 'pt-4'}`}>
        <div className="flex sm:w-[30%] w-full justify-start">
          <h2
            className={`${styles.paragraph} ${title === "image" ? 'hidden sm:block' : ''} text-white text-xs`}>{input.label.charAt(0).toUpperCase() + input.label.slice(1)}</h2>
        </div>
        <div className={`flex sm:w-[60%] w-full ${title === "image" ? "justify-center" : "justify-start"}`}>
          {renderInput()}
        </div>
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div className="flex flex-col">
        {form.map((input, index) => renderRow(input, index))}
        <div className="flex flex-col sm:flex-row items-center justify-start px-4 py-4">
          <Modal button={`Update ${title}`} header={`Confirmation`} body={`Do you want to update user ${title}?`}
                 action={onUpdate}
                 warning={title === "email" ? 'You will be signed out. Then, you will have to confirm account again.' : null}/>
        </div>
      </div>
    )
  }

  const renderWarning = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-5 p-5">
        <img src={locked} alt="locked" className="w-[125px] h-[125px]"/>
        <p className={`${styles.paragraph} text-white text-sm`}>
          You can't change {title}, because you are signed in via google account.
        </p>
      </div>
    )
  }

  return (
    <div key={`update-from-${title}`}
         className={`${styles.boxWidth} bg-black-gradient rounded-[10px] box-shadow z-[0] sm:z-[99] w-full flex flex-col`}>
      <div className="flex flex-col sm:flex-row items-center justify-start border-white border-b-[0.05rem] p-4">
        <h2 className={`${styles.paragraph} text-white text-xl`}>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      </div>
      {warning ? renderWarning() : renderForm()}
    </div>
  )
}

const EditProfilePage = () => {
  const navConfig = {
    page: "Edit user profile",
    isToggled: true,
    navbarLinks: privateNavLinks
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const details = useSelector(selectUserDetails)

  const [form, setForm] = useState({
    image: {...inputsInfo.user.image, value: '', picture: details.picture, files: [], menu: itemsInfo.user.image.name},
    email: {...inputsInfo.user.email, value: details.email ?? '', menu: itemsInfo.user.email.name},
    password: {...inputsInfo.user.password, value: details.password ?? '', menu: itemsInfo.user.password.name},
    repeated: {...inputsInfo.user.repeated, value: details.repeated ?? '', menu: itemsInfo.user.password.name},
    firstname: {...inputsInfo.user.firstname, value: details.firstname ?? '', menu: itemsInfo.user.details.name},
    lastname: {...inputsInfo.user.lastname, value: details.lastname ?? '', menu: itemsInfo.user.details.name},
    age: {...inputsInfo.user.age, value: details.age ?? '', menu: itemsInfo.user.details.name},
    country: {...inputsInfo.user.country, value: details.country ?? '', menu: itemsInfo.user.details.name},
    passport: {...inputsInfo.user.passport, value: details.passportNumber ?? '', menu: itemsInfo.user.details.name},
    phone: {...inputsInfo.user.phone, value: details.phoneNumber ?? '', menu: itemsInfo.user.details.name},
    city: {...inputsInfo.user.city, value: details.city ?? '', menu: itemsInfo.user.details.name},
    street: {...inputsInfo.user.street, value: details.street ?? '', menu: itemsInfo.user.details.name},
    postal: {...inputsInfo.user.postal, value: details.postalCode ?? '', menu: itemsInfo.user.details.name}
  })
  const [items, setItems] = useState({
    email: {...itemsInfo.user.email, selected: true},
    password: {...itemsInfo.user.password, selected: false},
    details: {...itemsInfo.user.details, selected: false},
    image: {...itemsInfo.user.image, selected: false}
  })
  const [error, setError] = useState({fields: []})

  const [updateAccountEmail, {isLoading: isUpdatingEmailForm}] = useUpdateAccountEmailMutation()
  const [updateAccountPassword, {isLoading: isUpdatingPasswordForm}] = useUpdateAccountPasswordMutation()
  const [updateUserDetails, {isLoading: isUpdatingDetailsForm}] = useUpdateUserDetailsMutation()
  const [updateUserImage, {isLoading: isUpdatingImageForm}] = useUpdateUserImageMutation()

  const onInputChange = (e) => {
    if (e === undefined) {
      return
    }

    const inputName = (typeof e) === "string" ? "phone" : e.target.name
    const result = Object.values(form).find(input => input.name === inputName)
    const inputValue = (typeof e) === "string" ? e : e.target.value

    setError({
      ...error,
      fields: error.fields.filter(field => field !== inputName)
    })

    if (result) {
      setForm({
        ...form,
        [inputName]: {...result, value: inputValue, files: inputName === "image" ? e.target.files : []}
      })
    }
  }

  const onMenuItemClick = (e) => {
    const previousSelectedItem = Object.values(items).find(item => item.selected)
    const newSelectedItem = Object.values(items).find(item => item.name === e.currentTarget.id)
    setItems({
      ...items,
      [previousSelectedItem.name]: {...previousSelectedItem, selected: false},
      [e.currentTarget.id]: {...newSelectedItem, selected: true}
    })
  }

  const selectedMenuItem = () => {
    return Object.values(items).find(item => item.selected)
  }

  const selectedMenuItemInputs = () => {
    return Object.values(form).filter(input => input.menu === selectedMenuItem().name)
  }

  const isSelectedFormValid = () => {
    const invalidInputs = selectedMenuItemInputs().filter(input => input.value.length < 1 || (input.name === "image" && input.files.length < 1))
    if (invalidInputs.length > 0) {
      setError({
        ...error,
        fields: invalidInputs.map(invalidInput => invalidInput.name)
      })
      toast.error(requiredInputsErrorMessage(invalidInputs))
      return false
    }

    return true
  }

  const updateUserEmailOnClick = async (e) => {
    e.preventDefault()

    try {
      await updateAccountEmail({email: details.email, new_email: form.email.value}).unwrap()
      dispatch(setConfirmation({confirmed: false}))
      dispatch(logOut())
      navigate("/")

    } catch (error) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map(input => input.name)
      })
      toast.error("User with this email exists.")
    }
  }

  const updateUserPasswordOnClick = async (e) => {
    e.preventDefault()

    if (!isSelectedFormValid()) {
      return
    }

    const result = validatePassword(form.password.value, form.repeated.value)
    if (result) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map(input => input.name)
      })
      toast.error(result)
      return
    }

    try {
      await updateAccountPassword({email: details.email, new_password: form.password.value}).unwrap()
      setForm({...form, password: {...form.password, value: ""}, repeated: {...form.repeated, value: ""}})
      toast.success("Password successfully updated")

    } catch (error) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map(input => input.name)
      })
      toast.error("User with this password exists.")
    }
  }

  const updateUserDetailsOnClick = async (e) => {
    e.preventDefault()

    try {
      await updateUserDetails({
        details: {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          age: form.age.value,
          country: form.country.value,
          passport_number: form.passport.value,
          phone_number: form.phone.value,
          city: form.city.value,
          street: form.street.value,
          postal_code: form.postal.value
        }, email: details.email
      }).unwrap()
      toast.success("User details successfully updated")

    } catch (error) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map(input => input.name)
      })
      toast.error("Updating user details failed")
    }
  }

  const updateUserImageOnClick = async (e) => {
    e.preventDefault()

    try {
      let formData = new FormData()
      formData.set("image", form.image.files[0])
      const response = await updateUserImage({formData: formData, email: details.email}).unwrap()
      setForm({...form, image: {...form.image, picture: response.image, files: []}})
      toast.success("Image successfully updated")

    } catch (error) {
      setError({
        ...error,

        fields: selectedMenuItemInputs().map(input => input.name)
      })
      toast.error("Failed to upload image")
    }
  }

  const onModalUpdate = (e) => {
    if (!isSelectedFormValid()) {
      return
    }

    const selectedItemName = selectedMenuItem().name
    if (selectedItemName === "email") {
      updateUserEmailOnClick(e).then(() => console.log("Updating email..."))
    } else if (selectedItemName === "password") {
      updateUserPasswordOnClick(e).then(() => console.log("Updating password..."))
    } else if (selectedItemName === "details") {
      updateUserDetailsOnClick(e).then(() => console.log("Updating details..."))
    } else {
      updateUserImageOnClick(e).then(() => console.log("Updating image..."))
    }
  }

  return (isUpdatingEmailForm || isUpdatingPasswordForm || isUpdatingDetailsForm || isUpdatingImageForm) ? (
    <CustomLoadingOverlay message={"Loading..."}/>) : (
    <div className={styles.page}>
      <ToastContainer className={"toast-style"}/>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className={`${styles.paddingX} ${styles.flexCenter} z-99`}>
        <div className={`${styles.boxWidth}`}>
          <div className="mt-5 flex flex-row justify-center items-center">
            <div className="w-[80%] flex flex-col sm:flex-row items-start justify-between">
              <Menu items={items} onClick={onMenuItemClick}/>
              <UpdateForm title={selectedMenuItem().name} form={selectedMenuItemInputs()} error={error}
                          onChange={onInputChange} onUpdate={onModalUpdate}
                          isOAuth2User={details.authProvider === "OAUTH2"}/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default EditProfilePage