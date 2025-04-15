import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

import { selectIsLoggedIn } from '../../reduce/auth/selectors';

interface PrivateRouteProps {
    children: ReactNode;
    redirectTo?: string;
  }

function PrivateRoute({ children, redirectTo = "/signin" }: PrivateRouteProps) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} replace/>;
};

export default PrivateRoute;
