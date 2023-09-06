import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const transactions = {
  add: async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/transaction`, data);
      return res.data;
    } catch (error) {}
  },
};

export default transactions;
