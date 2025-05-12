import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';

import Layout from './components/Layout/Layout';
import Loader from './shared/components/Loader.tsx/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './reduce/store';
import { refreshTokenUser } from './reduce/auth/operations';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { selectRehydrated } from './reduce/auth/selectors';

const HomePage = lazy(() => import('../src/pages/HomePage/HomePage'));
const NewsPage = lazy(() => import('../src/pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('../src/pages/NoticesPage/NoticesPage'));
const FriendsPage = lazy(() => import('../src/pages/FriendsPage/FriendsPage'));
const RegistrationPage = lazy(() => import('../src/pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../src/pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('../src/pages/ProfilePage/ProfilePage'));

function App() {
const dispatch = useDispatch<AppDispatch>();
const rehydrated = useSelector(selectRehydrated);

useEffect(() => {
  if (rehydrated) {
    console.log('State is rehydrated. Dispatching refresh...');
    dispatch(refreshTokenUser());
  }
}, [dispatch, rehydrated]);

  return (
    <>
    <Layout>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/notices' element={<NoticesPage/>}/>
        <Route path='/friends' element={<FriendsPage/>}/>
        <Route path='/current' element={
          <PrivateRoute>
            <ProfilePage/>
          </PrivateRoute>
          }/>
        <Route path='/signup' element={
          <RestrictedRoute>
            <RegistrationPage/>
          </RestrictedRoute>
          }/>
        <Route path='/signin' element={
          <RestrictedRoute>
            <LoginPage/>
          </RestrictedRoute>
          }/>
      </Routes>
      </Suspense>
    </Layout>
    </>
  )
}

export default App;
