import axios from "../../helpers/axiosConfig";
import { Store } from "redux";
import { RootState } from "../store";
import { setToken } from "../auth/slice";
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
      dataForm.append('photoUrl', formData.photoUrl);
    }

   setAuthHeader(token);

  const response = await axios.patch('users/current/edit', formData);
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
  formData: AddPetFormData,
  token: string
): Promise<AddPetResponse> => {
    console.log('>>> requestAddPet called');
      const dataForm = new FormData();
      console.log(dataForm);

    if (formData.name) {
      dataForm.append('name', formData.name);
    }
    if (formData.species) {
      dataForm.append('species', formData.species);
    }
    if (formData.title) {
      dataForm.append('title', formData.title);
    }
    if (formData.birthday) {
    const isoDate = new Date(formData.birthday).toISOString().split('T')[0]; 
    dataForm.append('birthday', isoDate);
  }

if (
  formData.uploadPhoto &&
  formData.uploadPhoto instanceof File &&
  formData.uploadPhoto.size > 0
) {
  dataForm.append('photo', formData.uploadPhoto);
  console.log('✅ Додано файл:', formData.uploadPhoto.name);
} else if (formData.photoUrl) {
  dataForm.append('photoUrl', formData.photoUrl);
  console.log('✅ Додано URL:', formData.photoUrl);
} else {
  console.log('⚠️ Фото не додано — ні файл, ні URL не передано');
}

    setAuthHeader(token);

    console.log('📦 FormData до відправки:');
for (const pair of dataForm.entries()) {
  console.log(pair[0] + ':', pair[1]);
}

    const response = await axios.post('users/current/pets/add',  {
      name: formData.name,
      title: formData.title,
      birthday: formData.birthday,
      sex: formData.sex,
      species: formData.species,
      photoUrl: formData.photoUrl,
  },);
     console.log('Response from server:', response.data);
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


// notices

interface GetNoticesResponse {
  success: boolean;
  data: Pet[]; 
};

export interface FavoriteRequest {
  id: string;
  data: { favorites: Pet[] };
}

export const getNotices = async (): Promise<Pet[]> => {
  const { data } : {data: GetNoticesResponse} = await axios.get('/notices');
  console.log("Received response from API:", data); 
  return data.data;
};



