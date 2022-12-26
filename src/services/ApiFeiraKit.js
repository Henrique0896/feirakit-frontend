import axios from 'axios';

const apiFeiraKit= axios.create({
   baseURL:'http://192.168.0.139:5000',//url da api
   headers: {
    'accept':'application/json',
    'Content-Type': 'application/json'
  }, 
  data:{}
 })
export default apiFeiraKit;
