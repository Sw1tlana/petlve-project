import axios from "../../helpers/axiosConfig";
import { Store } from "redux";
import { RootState } from "../store";
import { setToken } from "../auth/slice";


export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    axios.defaults.headers.common['Authorization'] = '';
  };
  
  export const setupAxiosInterceptors = (store: Store<RootState>) => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const { refreshToken } = store.getState().auth;
            const { data } = await axios.post('/user/refresh-tokens', { refreshToken });
    
            setAuthHeader(data.token);
            console.log("Data-token", data.token);
            store.dispatch(setToken({ token: data.token, refreshToken: data.refreshToken }));
            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            return axios(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );
  };

  interface SignupFormData {
    email: string;
    password: string;
    name: string; 
    phone: string;
  }

  interface SignInFormData {
    email: string;
    password: string;
  }

export const requestSignup = async(formData: SignupFormData) => {
   const { data } = await axios.post('users/signup', formData);
   if (data?.token) {
    setAuthHeader(data.token);
  }
   return data;
};

export const requestSignIn = async(formData: SignInFormData) => {
  const { data } = await axios.post('users/signin', formData);
  setAuthHeader(data.token);
  return data;
};

export const getRefreshToken = async(refreshToken: string) => {
  try {
    console.log('refresh', refreshToken)
    const { data } = await axios.post('users/refresh-tokens', { refreshToken });
    console.log('refresh', refreshToken)

    return data; 
  } catch (error) {
    console.error("Error refreshing token:", error);

    throw new Error('Token refresh failed');
  }
};

export const requestLogout = async() => {
  try {
  await axios.post('users/signout');
    clearAuthHeader();
  } catch {
    throw new Error('Logout failed');
  }
};

