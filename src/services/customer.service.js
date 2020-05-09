import { ajax } from './index';

const addCustomer = (customer) => {
  return ajax.post('/adduser', customer);
}

export { addCustomer };