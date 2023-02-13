import axios from 'axios';
import Swal from "sweetalert2";

//const BASE_URL = "http://localhost:8081/api"
const BASE_URL = "https://i8a405.p.ssafy.io/api"

const AxiosHeaderToken = axios.create({
  baseURL: BASE_URL,


})

AxiosHeaderToken.interceptors.request.use(
  function (config) {
        const accessToken = sessionStorage.getItem("access-token");
      // before send request logic
    if(accessToken) {
        // config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers['X-AUTH-TOKEN'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function(error) {
      // before send error logic
      return Promise.reject(error);
  }
);

AxiosHeaderToken.interceptors.response.use(
  function(response) {
      // response data 가공
  return response;
  },

  async function(error) {
      // error data 가공
      console.log(error);
      const {config, response} = error;
      console.log(config);
      console.log(response);
      if(response.status === 401) {
          const originRequest = config;
          await reissueAccessToken();
          originRequest.headers["X-AUTH-TOKEN"] = `Bearer ${sessionStorage.getItem("access-token")}`;
          return axios(originRequest);
      }
      ErrorCode(response);
      return Promise.reject(error);
  }
)

const reissueAccessToken = async () => {
  axios.defaults.headers["X-AUTH-TOKEN"] = "Bearer " + sessionStorage.getItem("refreshtoken");
  // api.defaults.headers["Authorization"] = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5IiwiYXV0aCI6IlJPTEVfVVNFUiIsImVtYWlsIjoiYmJiNDIyNEBuYXRlLmNvbSIsImV4cCI6MTY3NTg0NzIwMX0.JxV4s5snsSvWTDUHiLMw0jCNJeErptu3R4rHK8VGJhqZzHNeqVs5DtBxYca7TJV1qHjjzOqwRC8ApaACaHU8eQ";
  await axios.post("/users/user/refresh-token", {})
  .then((response) => {
      console.log(response);
      sessionStorage.setItem("access-token", response.data.accesstoken);
  })
  .catch((error) => {
      ErrorCode(error.response);
  });
}

function ErrorCode(response) {
  const code = response.status;
  const message = response.data.message;
  switch (code) {
      case 204:
          Swal.fire({
              title: code, 
              text: message, 
              icon: "info"
          });
          break;
      case 400:
          Swal.fire({
              title: code, 
              text: message, 
              icon: "error"
          });
          return;
      case 401:
          // Test 필요하다.
          Swal.fire({
              title: code,
              text: message,
              icon: "info"
          }).then(function() {
              window.location.href="http://localhost:3000/login";
          })
          return;
      case 403: case 404: case 409: case 500:
          Swal.fire({
              title: code, 
              text: message, 
              icon: "error"
          });
          return;
      default:
          Swal.fire({
              title: code, 
              text: message, 
              icon: "error"
          });
          return;
  }
}

export default AxiosHeaderToken;