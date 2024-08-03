import { isNotEmpty } from "ramda";

const setToLocalStorage = ({ authToken, email, userId, userName }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(userName));
};

const getFromLocalStorage = key => {
  try {
    const value = localStorage.getItem(key);

    return isNotEmpty(value) ? JSON.parse(value) : null;
  } catch (error) {
    logger.error(error);

    return null;
  }
};

export { setToLocalStorage, getFromLocalStorage };
