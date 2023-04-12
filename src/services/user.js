import apiFeiraKit from './ApiFeiraKit'
import { useDispatch } from "react-redux";
import { Login as loginAction } from "../store/actions";

 export class User {
  dispatch = useDispatch();
  async checkPassword(email,password) {
     let credentials={
            email,
            senha: password
        }
    return (await apiFeiraKit
    .post('/users/check-password',JSON.stringify(credentials))
    )   
   }

  async getUserByEmail(email){
    await apiFeiraKit
     .get(`/users/byemail/${email}`)
     .then(({data}) => {
         this.login(data.resultado[0])
     }).catch((error)=>{
         console.log(" ===>"+ error)  
  })
  }

  async getUserById(id){
    return( await apiFeiraKit
     .get(`/users/${id}`)
    )
  }

  async createUser(user){
    return(
      await apiFeiraKit
      .post("/users", JSON.stringify(user))
    )
  }

  async changePassword(newPasswordData){
    return(
      await apiFeiraKit
      .post('/users/change-password',newPasswordData)
    )
  }
  async editUser(user){
    return(
      await apiFeiraKit
      .put("/users", user)
    )
  }

  async deleteUser(id){
    return(
      await apiFeiraKit
      .delete("/users", { data:id})
    )
  }

  async login(userData){
    this.dispatch(loginAction(userData))
  }
  
}