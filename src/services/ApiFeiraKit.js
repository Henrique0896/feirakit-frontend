import axios from 'axios';

const apiFeiraKit= axios.create({
   baseURL:'',//url da api
   headers: {
    'accept':'application/json',
    'Content-Type': 'application/json'
  }, 
  data:{}
 })
export default apiFeiraKit;