import axios from 'axios';
import * as vendorServices from './vendor.service';
import * as customerServices from './customer.service';

const ajax = axios.create({
  baseURL: 'https://api.cmpe282.terasurfer.com'
});

const fetchDivisions = () => {
  return ajax.get('/divisions')
}

const fetchLeastPrice = (src, dest) => {
  return ajax.get(`/leastcost?sourcedivision=${src}&destinationdivision=${dest}`);
}

const fetchOrderForCustomer = (id, email) => {
  return ajax.get(`/order?u_email=${email}&id=${id}`);
}

const fetchPincode = (pincode) => {
  return ajax.get(`/pincode?${pincode}`);
}

const chatWithBot = (userId, message) => {
  return ajax.post('/lex', { user: userId, message });
}

export {
  ajax,
  fetchDivisions,
  fetchLeastPrice,
  fetchOrderForCustomer,
  fetchPincode,
  vendorServices,
  customerServices,
  chatWithBot
};
