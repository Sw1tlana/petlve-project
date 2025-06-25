import axios from "../../helpers/axiosConfig";
import { Store } from "redux";
import { RootState } from "../store";
import { setToken, User } from "../auth/slice";
import { Pet } from "../notices/slice";
import { AddPetResponse, EditUserResponse } from "../auth/operations";

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
            const { data } = await axios.post('/users/refresh-tokens', { refreshToken });
    
            setAuthHeader(data.token);

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

export interface SignupFormData {
    email: string;
    password: string;
    name: string; 
    phone: string;
  };

export interface SignInFormData {
    email: string;
    password: string;
  };

  export interface CurrentFormData {
    email?: string;
    name?: string;
    phone?: string;
    photoUrl?: string;
    uploadPhoto?: File;
  };

  export interface AddPetFormData {
    species: string;
    sex: string; 
    title: string; 
    name: string; 
    birthday: string; 
    photoUrl?: string;
    uploadPhoto?: File;
  };

export const requestSignUp = async(formData: SignupFormData) => {
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

export const requestCurrentUser = async (token: string): Promise<User> => {
  setAuthHeader(token);
  const response = await axios.get('/users/current');
  return response.data;
};

export const updateCurrentEdit = async (
  formData: CurrentFormData,
  token: string
): Promise<EditUserResponse> => {
  const dataForm = new FormData();

    if (formData.name) {
      dataForm.append('name', formData.name);
    }
    if (formData.email) {
      dataForm.append('email', formData.email);
    }
    if (formData.phone) {
      dataForm.append('phone', formData.phone);
    }

    if (formData.uploadPhoto) {
      dataForm.append('avatar', formData.uploadPhoto);
    } else if (formData.photoUrl) {
      dataForm.append('avatar', formData.photoUrl);
    }

   setAuthHeader(token);

  const response = await axios.patch('users/current/edit', dataForm);
  return response.data;
};

export const getRefreshToken = async(refreshToken: string): Promise<{ token: string, refreshToken: string }> => {
  try {
    const response = await axios.post('users/refresh-tokens', { refreshToken });
    const data = response.data?.data ?? response.data;
    return {
      token: data.token || data.accessToken,
      refreshToken: data.refreshToken,
    };
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

// addPet

export const requestAddPet = async (
  data: AddPetFormData,
  token: string
): Promise<AddPetResponse> => {
    console.log('>>> requestAddPet called');
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("birthday", data.birthday);
  formData.append("title", data.title);
  formData.append("species", data.species);
  formData.append("sex", data.sex);


    if (data.uploadPhoto instanceof File) {
      formData.append("photo", data.uploadPhoto);
    } else if (data.photoUrl?.trim()) {
      formData.append("photoUrl", data.photoUrl.trim());
    } else {
      throw new Error("Either photo file or photo URL is required");
    }

    setAuthHeader(token);

    const response = await axios.post('users/current/pets/add', formData);
    console.log('Response from server:', response.data);
    return response.data;
};

  export const deletePet = async(_id: string): Promise<{ _id: string }> => {
    const response = await axios.delete(`users/current/pets/remove/${_id}`);
    return response.data;
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

export interface News {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
};

export interface GetNewsResponse {
  success: boolean;
  data: {
    data: News[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export const getNews = async (queryParams = ''): Promise<GetNewsResponse> => {
  const { data } = await axios.get(`/news/${queryParams}`);
  return data;
};

// notices

export interface GetNoticesResponse {
  success: boolean;
  data: {
    data: Pet[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
};

export interface AddFavoritesResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    noticesFavorites: Pet[];
  };
};

export interface RemoveFavoritesResponse {
  success: boolean;
  message: string;
  data: {
    data: Pet;
  };
}

export const getNotices = async (queryParams = ''): Promise<GetNoticesResponse> => {
  const { data } = await axios.get(`/notices${queryParams}`);
  console.log("Received response from API:", data); 
  return data;
};

export const addFavoritesNotices = async (_id: string): Promise<Pet> => {

  const { data }: { data: AddFavoritesResponse } = await axios.post(`/notices/favorites/add/${_id}`);
  const addedPet = data.data.noticesFavorites.find(pet => pet._id === _id);

  if (!addedPet) {
    throw new Error('Pet not found in the list of favorites');
  }

  return addedPet;
};

export const removeFavoritesNotices = async (_id: string): Promise<RemoveFavoritesResponse> => {

  const response = await axios.delete(`/notices/favorites/remove/${_id}`);
  console.log("Remove", response.data);
  return response.data;
};


