import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

import Layout from './components/Layout/Layout';
import Loader from './shared/components/Loader.tsx/Loader';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './reduce/store';
import { refreshTokenUser } from './reduce/auth/operations';

const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('../src/pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('../src/pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('../src/pages/FriendsPage/FriendsPage'));
const RegistrationPage = lazy(() => import('../src/pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../src/pages/LoginPage/LoginPage'));

function App() {
const dispatch = useDispatch<AppDispatch>();

useEffect(() => {
  dispatch(refreshTokenUser());
}, [dispatch]);

  return (
    <>
    <Layout>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/notices' element={<NoticesPage/>}/>
        <Route path='/friends' element={<FriendsPage/>}/>
        <Route path='signup' element={<RegistrationPage/>}/>
        <Route path='/signin' element={<LoginPage/>}/>
      </Routes>
      </Suspense>
    </Layout>
    </>
  )
}

export default App
