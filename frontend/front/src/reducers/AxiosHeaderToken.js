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

      if(response.status === 403) {
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
  await axios.post("/users/user/refresh-token", {})
  .then((response) => {
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
          Swal.fire({
              title: code,
              text: message,
              icon: "info"
          }).then(function() {
              window.location.href="http://localhost:3000/signin";
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
