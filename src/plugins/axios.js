
import axios from 'axios';

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
}

const devInstance = createInstance('http://121.6.194.123:5000/');
const productionInstance = createInstance('http://121.6.194.123:5000/');

export default process.env.NODE_ENV === 'production' ? productionInstance : devInstance;
