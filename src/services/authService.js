import { api, requestConfig } from '../utils/config'


//Register an user
const register = async(data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err)
        if (res._id) {
            localStorage.setItem("user", JSON.stringify(res))
        } 
        return res   

    } catch (error) {
        console.log(error)
    }
}

//Logout an user
const logout = () => {
    localStorage.removeItem("user")
}

//Sign in an user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);
    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Forgot in an user
const forgot = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/forgot", config)
      .then((res) => res.json())
      .catch((err) => err);

     if (res._id) {
       localStorage.setItem("user", JSON.stringify(res));
     }  

    return res;
  } catch (error) {
    console.log(error);
  }
}

//Reset Password
const resetPassword = async(data) => {

    const config = requestConfig("POST", data)

    try {
         const res = await fetch(api + "/users/reset_password", config)
           .then((res) => res.json())
           .catch((err) => err);
         return res; 
        
    } catch (error) {
        console.log(error)
    }
}


const authService = {
    register,
    logout,
    login,
    forgot,
    resetPassword,
}

export default authService