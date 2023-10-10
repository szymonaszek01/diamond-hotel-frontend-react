export const toAuthResMapper = (res) => {
  const { email, id, access_token, refresh_token, confirmed } = res;
  return {
    user: email,
    id: id,
    accessToken: access_token,
    refreshToken: refresh_token,
    confirmed: confirmed,
  };
};

export const toRegisterReqMapper = (req) => {
  const {
    email,
    password,
    repeated,
    firstname,
    lastname,
    age,
    country,
    passport,
    phone,
    city,
    street,
    postal,
  } = req;
  return {
    email: email.value,
    password: password.value,
    repeated_password: repeated.value,
    firstname: firstname.value,
    lastname: lastname.value,
    age: age.value,
    country: country.value,
    passport_number: passport.value,
    phone_number: phone.value,
    city: city.value,
    street: street.value,
    postal_code: postal.value,
  };
};
