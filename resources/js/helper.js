export const validateEmail = (email) => {
  var regEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(regEmail);
};

export const validateName = (name) => {
  var regName = /^[a-zA-Z- ]+$/;
  return name.match(regName);
};
