import axios from "axios";

export const addUser = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/adduser", data).then(success).catch(error).finally(completed);
};

export const fetchUserData = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios
    .get("/fetchuserdata", { params: data })
    .then(success)
    .catch(error)
    .finally(completed);
};

export const fetchRoles = ({
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.get("/fetchroles").then(success).catch(error).finally(completed);
};
