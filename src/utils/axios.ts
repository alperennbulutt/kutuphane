import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.url = `${process.env.REACT_APP_MAIN_URL}${config.url}`;
  console.log('url basıldı');
  console.log(config.url);

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default axiosInstance;
