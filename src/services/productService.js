import { api, requestConfig } from "../utils/config";

//Insert an product
const publishProduct = async(data, token) => {

    const config = requestConfig("POST", data, token)

    try {

        const res = await fetch(api + "/products", config)
            .then((res) => res.json())
            .catch((err) => err)
        
        return res    
        
    } catch (error) {
        console.log(error)
    }

}

//Delete a product
const deleteProduct = async(id, token) => {

    const config = requestConfig("DELETE", null, token)

    try {

        const res = await fetch(api + "/products/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

        return res;   
        
    } catch (error) {
        console.log(error)
    }

}

//Update a product
const updateProduct = async(data, id, token) => {

    const config = requestConfig("PUT", data, token)

    try {

        const res = await fetch(api + "/products/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

        return res;   
        
    } catch (error) {
        console.log(error)
    }
}

//Get all products an list id
const getProductByListId = async(id, token) => {

    const config = requestConfig("GET", null, token)

    try {

        const res = await fetch(api + "/products/" + id, config)
          .then((res) => res.json())
          .catch((err) => err)

          return res;  
        
        
    } catch (error) {
        console.log(error)
    }
}



const productService = {
  publishProduct,
  deleteProduct,
  updateProduct,
  getProductByListId,
};

export default productService