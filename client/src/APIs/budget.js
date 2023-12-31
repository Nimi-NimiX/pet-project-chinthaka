import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const budget = {
  get: async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/budget/${id}`);
      return res.data;
    } catch (error) {}
  },
  set: async (id, budget) => {
    try {
      const res = await axios.post(`${BASE_URL}/budget/${id}`, {
        estimatedBudget: budget,
      });
      return res.data;
    } catch (error) {}
  },
};

export default budget;
