import axios from 'axios';

const apiFeiraKit= axios.create({
   baseURL:'http://192.168.0.139:5000',
   
 })

export default apiFeiraKit;