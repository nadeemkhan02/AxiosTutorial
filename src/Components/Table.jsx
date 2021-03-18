import React, {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import http from "../Services/httpService"
import "react-toastify/dist/ReactToastify.css";

const EndPOint = 'https://jsonplaceholder.typicode.com/posts'
const Table = () => {
    const [postData, UpostData] = useState([])
  useEffect(()=>{
      async function getData() {
        const {data:posts} = await http.get(EndPOint)
        UpostData(posts)
        toast.error("this post hase been already deleted!!")    
  }  getData()
},[])
  
  const handleDelete = async post=>{
      const orignal = [...postData]
      const posts =  postData.filter(e=>e.id !== post.id)
      UpostData(posts)
      try{
        await http.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      }catch (ex) {
        if ( ex.response && ex.response.status >= 400 && ex.response.status <= 500){
          toast.error("this post hase been already deleted!!")
        }
        UpostData(orignal)
      }
      
  }
  
  const handleAdd = async ()=>{
    const newData = {title:"a", body:"b"}
    const {data:posts} = await http.post('https://jsonplaceholder.typicode.com/posts', newData)
    const post = [posts, ...postData]
    UpostData(post)
    console.log(postData)
  }
  const handleUpdate = async (post)=>{
    post.title = "Updated"
    const {data:posts} = await http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
    const Post = [...postData]
    const ind = Post.indexOf(post) 
    Post[ind] = posts
    UpostData(Post)
    console.log(postData)

}

  return (
    <> 
     <ToastContainer />
      <button onClick = {handleAdd} className="btn btn-primary mt-5 mx-5 mb-1">Add</button>
      <table className="table mb-5 mx-5 mr-5">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          { 
            postData.map((e)=>(
            <tr key={postData.indexOf(e)}>
                <th scope="row">{e.title.toString()}</th>
                <td><button onClick={()=>handleUpdate(e)} className="btn btn-primary">Update</button></td>
                <td><button onClick={()=>handleDelete(e)} className="btn btn-danger">Delete</button></td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
};

export default Table;
