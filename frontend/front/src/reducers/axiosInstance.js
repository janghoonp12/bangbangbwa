import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'http://localhost:8081/api/' });

axiosInstance.defaults.headers.common['X-AUTH-TOKEN'] = sessionStorage.getItem("accessToken");

export default axiosInstance;