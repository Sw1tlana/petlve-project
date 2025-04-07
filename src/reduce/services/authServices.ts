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
    const { data } = await axios.post('users/refresh-tokens', { refreshToken });
    return data; 
  } catch {
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

// friends

interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
};

interface Place {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address: string;
  workDays: WorkDay[];
  phone: string;
  email: string;
};

interface GetFriendsResponse {
  success: boolean;
  data: Place[];
}

export const getFriends = async (): Promise<Place[]> => {
  const { data } : { data: GetFriendsResponse } = await axios.get('/friends');          
  return data.data;                 
};

// news

interface News {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
};

interface GetNewsResponse {
  success: boolean;
  data: News[];
};

export const getNews = async (): Promise<News[]> => {
  const { data } : {data: GetNewsResponse} = await axios.get('/news');
  return data.data;
};
