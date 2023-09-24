import { fetchUserData } from "../../backend/requests";
import { useDispatch } from "react-redux";
import { setLoading } from "./slice.js";

export const initRoles = () => {
  const dispatch = useDispatch();

  fetchUserData({
    success: (response) => {
      dispatch(setLoading({ isLoading: false }));
    },
  });
};
