export const toUserDetailsResMapper = (res) => {
  const {
    id,
    email,
    firstname,
    lastname,
    age,
    country,
    passport_number,
    phone_number,
    city,
    street,
    postal_code,
    role,
    auth_provider,
    confirmed,
  } = res;
  return {
    id: id,
    email: email,
    firstname: firstname,
    lastname: lastname,
    age: age,
    country: country,
    passportNumber: passport_number,
    phoneNumber: phone_number,
    city: city,
    street: street,
    postalCode: postal_code,
    role: role,
    authProvider: auth_provider,
    confirmed: confirmed,
  };
};
