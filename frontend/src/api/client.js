import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
});

// Keep the existing vehicle API
export const fetchVehicleData = async () => {
  try {
    const response = await client.get('/vehicle');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Export the Axios client for other API modules
export default client;
