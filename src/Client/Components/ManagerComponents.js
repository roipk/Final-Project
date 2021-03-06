import axios from "axios";
import { url } from "./AllPages";

export const loadPage = (props, page, currentUser,data) => {
  // console.log(data)
  // localStorage.setItem("token",data.token)
  verifyUser(currentUser.type);

  props.history.push({
    pathname: `/${page}`,
    data: data, // your data array of objects
    currentUser:currentUser
  });
};

export const logOut = (props) => {
  localStorage.setItem("token",null)
  props.history.push({
    pathname: `/login`,
  });
};

export const verifyUser = async (page) => {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      let user = await axios.get(url + `/${page}`, {
        headers: { "x-access-token": token },
      });
      if (user && user.data.token) {
        localStorage.setItem("token", user.data.token);
        return user.data.user;
      } else {

        // loadPage(this.props,"404")
      }
    } catch (e) {
      // window.location.href = "404"
      console.log("need new token");


    }
  }
};

export const getServer = async (url, config = null, data = null) => {
  let get = await axios.get(url, config, data);
  return get;
};
