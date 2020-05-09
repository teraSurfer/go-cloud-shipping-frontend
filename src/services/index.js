import axios from 'axios';
import * as vendorServices from './vendor.service';

const ajax = axios.create({
  baseURL: 'https://api.cmpe282.terasurfer.com'
});

const fetchDivisions = () => {
  return ajax.get('/divisions')
}

const fetchLeastPrice = (src, dest) => {
  return ajax.get(`/leastcost?sourcedivision=${src}&destinationdivision=${dest}`);
}


export { ajax, fetchDivisions, fetchLeastPrice, vendorServices };
