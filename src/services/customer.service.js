import { ajax } from './index';

const addCustomer = (customer) => {
  return ajax.post('/adduser', customer);
}

const getEstimate = (src, dest, weight) => {
  return ajax.get(`/estimate?origin=${src}&destination=${dest}&weight=${weight}`)
}

const getOrders = (email) => {
  return ajax.get(`/orders?u_email=${email}`)
}

const placeOrder = (order) => {
  return ajax.post('/placeorder', order);
}

export { addCustomer, getEstimate, getOrders, placeOrder };
