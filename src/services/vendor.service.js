import { ajax } from './index';

const addVendor = (vendor) => {
  return ajax.post('/addvendor', vendor);
}

const getOrders = (email) => {
  return ajax.get(`/orders?v_email=${email}`);
}

const updatePrice = (sourcedivision, destinationdivision, price, v_email) => {
  return ajax.post(`/updateprice`, {
    sourcedivision,
    destinationdivision,
    price,
    v_email
  });
}

export { addVendor, getOrders, updatePrice };