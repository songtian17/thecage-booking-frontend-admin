import https from 'https';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function createInstance(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
}

const devInstance = createInstance(process.env.VUE_APP_BACKEND);
const productionInstance = createInstance(process.env.VUE_APP_BACKEND);

export default process.env.NODE_ENV === 'production' ? productionInstance : devInstance;
