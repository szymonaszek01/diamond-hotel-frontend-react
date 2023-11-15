import { CustomLoadingOverlay, Footer, Navbar } from '../../../components';
import styles from '../../../style';
import { inputsInfo, itemsInfo, privateNavLinks } from '../../../constants';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  useUpdateAccountEmailMutation,
  useUpdateAccountPasswordMutation,
} from '../../../redux/api/authApiSlice';
import { selectUserDetails, setUserDetails } from '../../../redux/features/user/userSlice';
import {
  logOut,
  selectFullAccess,
  setConfirmation,
  setFullAccess,
} from '../../../redux/features/auth/authSlice';
import {
  isFullAccess,
  requiredInputsErrorMessage,
  toFileResponseMapper,
  validatePassword,
} from '../../../util';
import {
  useUpdateUserDetailsMutation,
  useUpdateUserImageMutation,
} from '../../../redux/api/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { toUserDetailsResMapper } from '../../../redux/features/user/userMapper';
import Menu from './Menu';
import UpdateForm from './UpdateForm';

const EditProfilePage = () => {
  const fullAccess = useSelector(selectFullAccess);

  const navConfig = {
    page: 'Settings',
    isToggled: true,
    navbarLinks: privateNavLinks,
    textWhite: true,
    logoWhite: true,
    fullAccess: fullAccess,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector(selectUserDetails);

  const [form, setForm] = useState({
    image: {
      ...inputsInfo.user.image,
      value: '',
      picture: details.picture ?? '',
      files: [],
      menu: itemsInfo.user.image.name,
    },
    email: {
      ...inputsInfo.user.email,
      value: details.email ?? '',
      menu: itemsInfo.user.email.name,
    },
    password: {
      ...inputsInfo.user.password,
      value: details.password ?? '',
      menu: itemsInfo.user.password.name,
    },
    repeated: {
      ...inputsInfo.user.repeated,
      value: details.repeated ?? '',
      menu: itemsInfo.user.password.name,
    },
    firstname: {
      ...inputsInfo.user.firstname,
      value: details.firstname ?? '',
      menu: itemsInfo.user.details.name,
    },
    lastname: {
      ...inputsInfo.user.lastname,
      value: details.lastname ?? '',
      menu: itemsInfo.user.details.name,
    },
    age: { ...inputsInfo.user.age, value: details.age ?? '', menu: itemsInfo.user.details.name },
    country: {
      ...inputsInfo.user.country,
      value: details.country ?? '',
      menu: itemsInfo.user.details.name,
    },
    passport: {
      ...inputsInfo.user.passport,
      value: details.passportNumber ?? '',
      menu: itemsInfo.user.details.name,
    },
    phone: {
      ...inputsInfo.user.phone,
      value: details.phoneNumber ?? '',
      menu: itemsInfo.user.details.name,
    },
    city: { ...inputsInfo.user.city, value: details.city ?? '', menu: itemsInfo.user.details.name },
    street: {
      ...inputsInfo.user.street,
      value: details.street ?? '',
      menu: itemsInfo.user.details.name,
    },
    postal: {
      ...inputsInfo.user.postal,
      value: details.postalCode ?? '',
      menu: itemsInfo.user.details.name,
    },
  });
  const [items, setItems] = useState({
    email: { ...itemsInfo.user.email, selected: true },
    password: { ...itemsInfo.user.password, selected: false },
    details: { ...itemsInfo.user.details, selected: false },
    image: { ...itemsInfo.user.image, selected: false },
  });
  const [error, setError] = useState({ fields: [] });

  const [updateAccountEmail, { isLoading: isUpdatingEmailForm }] = useUpdateAccountEmailMutation();
  const [updateAccountPassword, { isLoading: isUpdatingPasswordForm }] =
    useUpdateAccountPasswordMutation();
  const [updateUserDetails, { isLoading: isUpdatingDetailsForm }] = useUpdateUserDetailsMutation();
  const [updateUserImage, { isLoading: isUpdatingImageForm }] = useUpdateUserImageMutation();

  const onInputChange = (e) => {
    if (e === undefined) {
      return;
    }

    const inputName = typeof e === 'string' ? 'phone' : e.target.name;
    const result = Object.values(form).find((input) => input.name === inputName);
    const inputValue = typeof e === 'string' ? e : e.target.value;

    setError({
      ...error,
      fields: error.fields.filter((field) => field !== inputName),
    });

    if (result) {
      setForm({
        ...form,
        [inputName]: {
          ...result,
          value: inputValue,
          files: inputName === 'image' ? e.target.files : [],
        },
      });
    }
  };

  const onMenuItemClick = (e) => {
    const previousSelectedItem = Object.values(items).find((item) => item.selected);
    const newSelectedItem = Object.values(items).find((item) => item.name === e.currentTarget.id);
    setItems({
      ...items,
      [previousSelectedItem.name]: { ...previousSelectedItem, selected: false },
      [e.currentTarget.id]: { ...newSelectedItem, selected: true },
    });
  };

  const selectedMenuItem = () => {
    return Object.values(items).find((item) => item.selected);
  };

  const selectedMenuItemInputs = () => {
    return Object.values(form).filter((input) => input.menu === selectedMenuItem().name);
  };

  const isSelectedFormValid = () => {
    const invalidInputs = selectedMenuItemInputs().filter(
      (input) => input.value.length < 1 || (input.name === 'image' && input.files.length < 1)
    );
    if (invalidInputs.length > 0) {
      setError({
        ...error,
        fields: invalidInputs.map((invalidInput) => invalidInput.name),
      });
      toast.error(requiredInputsErrorMessage(invalidInputs));
      return false;
    }

    return true;
  };

  const updateUserEmailOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await updateAccountEmail({
        email: details.email,
        new_email: form.email.value,
      }).unwrap();
      dispatch(setConfirmation({ confirmed: response.confirmed }));
      dispatch(logOut());
      navigate('/');
    } catch (error) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map((input) => input.name),
      });
      toast.error('User with this email exists.');
    }
  };

  const updateUserPasswordOnClick = async (e) => {
    e.preventDefault();

    if (!isSelectedFormValid()) {
      return;
    }

    const result = validatePassword(form.password.value, form.repeated.value);
    if (result) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map((input) => input.name),
      });
      toast.error(result);
      return;
    }

    try {
      const response = await updateAccountPassword({
        email: details.email,
        new_password: form.password.value,
      }).unwrap();
      dispatch(setUserDetails(toUserDetailsResMapper(response)));
      setForm({
        ...form,
        password: { ...form.password, value: '' },
        repeated: { ...form.repeated, value: '' },
      });
      toast.success('Password successfully updated');
    } catch (error) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map((input) => input.name),
      });
      toast.error('User with this password exists.');
    }
  };

  const updateUserDetailsOnClick = async (e) => {
    e.preventDefault();

    try {
      const response = await updateUserDetails({
        details: {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          age: form.age.value,
          country: form.country.value,
          passport_number: form.passport.value,
          phone_number: form.phone.value,
          city: form.city.value,
          street: form.street.value,
          postal_code: form.postal.value,
        },
        email: details.email,
      }).unwrap();
      dispatch(setFullAccess({ fullAccess: isFullAccess(toUserDetailsResMapper(response)) }));
      dispatch(setUserDetails(toUserDetailsResMapper(response)));
      toast.success('User details successfully updated');
      navigate('/dashboard');
    } catch (error) {
      setError({
        ...error,
        fields: selectedMenuItemInputs().map((input) => input.name),
      });
      toast.error('Updating user details failed');
    }
  };

  const updateUserImageOnClick = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.set('image', form.image.files[0]);
      const response = await updateUserImage({ formData: formData, email: details.email }).unwrap();
      const { encodedFile } = toFileResponseMapper(response);
      setForm({ ...form, image: { ...form.image, picture: encodedFile, files: [] } });
      toast.success('Image successfully updated');
    } catch (error) {
      setError({
        ...error,

        fields: selectedMenuItemInputs().map((input) => input.name),
      });
      toast.error('Failed to upload image');
    }
  };

  const onModalUpdate = (e) => {
    if (!isSelectedFormValid()) {
      return;
    }

    const selectedItemName = selectedMenuItem().name;
    if (selectedItemName === 'email') {
      updateUserEmailOnClick(e).then(() => console.log('Updating email...'));
    } else if (selectedItemName === 'password') {
      updateUserPasswordOnClick(e).then(() => console.log('Updating password...'));
    } else if (selectedItemName === 'details') {
      updateUserDetailsOnClick(e).then(() => console.log('Updating details...'));
    } else {
      updateUserImageOnClick(e).then(() => console.log('Updating image...'));
    }
  };

  const getTextForLoadingOverlay = () => {
    if (isUpdatingEmailForm) {
      return 'email address';
    } else if (isUpdatingPasswordForm) {
      return 'password';
    } else if (isUpdatingDetailsForm) {
      return 'user details';
    } else {
      return 'profile picture';
    }
  };

  return isUpdatingEmailForm ||
    isUpdatingPasswordForm ||
    isUpdatingDetailsForm ||
    isUpdatingImageForm ? (
    <CustomLoadingOverlay message={`We're updating your ${getTextForLoadingOverlay()}...`} />
  ) : (
    <div className={styles.page}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar {...navConfig} />
        </div>
      </div>
      <div className={`flex flex-col w-full items-center justify-center min-h-[75vh] mt-16`}>
        <div
          className={`flex flex-col items-center text-center sm:text-start sm:items-start justify-center w-[70%]`}>
          <div
            className={
              'flex flex-col items-center text-center sm:text-start sm:items-start justify-center gap-14'
            }>
            <p
              className={`flex w-full flex-col gap-2 text-sm text-dimWhite font-poppins font-thin ml-2 leading-10 sm:leading-8`}>
              <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
                Settings
              </span>
              <span>
                Welcome to your user settings page, where you have the power to customize your
                experience and manage your account. Here, you can tailor your preferences to make
                your time with us truly unique.
              </span>
            </p>
            <p
              className={`break-words flex w-full flex-col gap-2 text-sm text-dimWhite font-poppins font-thin ml-2 leading-10 sm:leading-8`}>
              <span className={'text-2xl font-semibold text-white leading-[50px] sm:leading-8'}>
                Questions or Concerns?
              </span>
              <span>
                If you have any questions, concerns, or need assistance with your settings, please
                contact our support team at diamond.hotel.contact@gmail.com or +960 1234567. Your
                experience is in your hands. Tailor it to perfection!
              </span>
            </p>
            <div className="w-full flex flex-col sm:flex-row items-start justify-between">
              <Menu items={items} onClick={onMenuItemClick} />
              <UpdateForm
                title={selectedMenuItem().name}
                form={selectedMenuItemInputs()}
                error={error}
                onChange={onInputChange}
                onUpdate={onModalUpdate}
                isOAuth2User={details.authProvider === 'OAUTH2'}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfilePage;
