import axios from 'axios';
import {API_URL}from '@env';

const apiFeiraKit= axios.create({
   baseURL:API_URL,
   headers: {
    'accept':'application/json',
    'Content-Type': 'application/json'
  }, 
  data:{}
 })
export default apiFeiraKit;
