import { api, requestConfig } from "../utils/config";

//Insert an list
const publishList = async(data, token) => {

    const config = requestConfig("POST", data, token)

    try {

        const res = await fetch(api + "/lists", config)
            .then((res) => res.json())
            .catch((err) => err)
        
        return res    
        
    } catch (error) {
        console.log(error)
    }

}

//Get all lists an user
const getUserLists = async(id, token) => {

    const config = requestConfig("GET", null, token)

    try {

        const res = await fetch(api + "/lists/user/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

          
        return res;   
        
    } catch (error) {
        console.log(error)
    }
}

//Get list and product by list
const getListProdutcs = async(id, token) => {

    const config = requestConfig("GET", null, token)

    try {

        const res = await fetch(api + "/lists/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

        return res;   
        
    } catch (error) {
        console.log(error)
    }

}

//Delete a list
const deleteList = async(id, token) => {

    const config = requestConfig("DELETE", null, token)

    try {

        const res = await fetch(api + "/lists/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

        return res;   
        
    } catch (error) {
        console.log(error)
    }

}
//Update a list
const updateList = async(data, id, token) => {

    const config = requestConfig("PUT", data, token)

    try {

        const res = await fetch(api + "/lists/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

        return res;   
        
    } catch (error) {
        console.log(error)
    }

}




const listService = {
  publishList,
  getUserLists,
  getListProdutcs,
  deleteList,
  updateList,
};

export default listService