import { ajax } from './index';

const addVendor = (vendor) => {
  return ajax.post('/addvendor', vendor);
}

const getOrders = (email) => {
  return ajax.get(`/orders?v_email=${email}`);
}

export { addVendor, getOrders };