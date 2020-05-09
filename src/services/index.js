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

export {
  ajax,
  fetchDivisions,
  fetchLeastPrice,
  fetchOrderForCustomer,
  vendorServices,
  customerServices
};
