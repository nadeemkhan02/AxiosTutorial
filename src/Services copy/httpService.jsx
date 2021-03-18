import axios from "axios"
import axios from "axios";
const EndPOint = 'https://jsonplaceholder.typicode.com/posts'
axios.interceptors.response.use(null, error=>{
  console.log(error)
  const condition = error.response && error.response.status >= 400 && error.response.status <= 500
  if (!condition){
    toast.error("Unexpected Errror Occurred!!")
    console.log("Error is:", error)
  }
  return Promise.reject(error)    
})

export default{
    post:axios.post,
    get:axios.get,
    put:axios.put,
    delete:axios.delete

}