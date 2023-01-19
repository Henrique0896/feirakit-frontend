import axios from 'axios';
import {API_URL}from '@env';
const apiFeiraKit= axios.create({
   baseURL:'http://192.168.3.2:5000/',
   headers: {
    'accept':'application/json',
    'Content-Type': 'application/json'
  }, 
  data:{}
 })
export default apiFeiraKit;
