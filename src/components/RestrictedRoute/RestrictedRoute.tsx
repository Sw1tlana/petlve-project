import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';

import { selectIsLoggedIn } from '../../reduce/auth/selectors';

interface RestrictedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

function RestrictedRoute({ children, redirectTo = "/current" }: RestrictedRouteProps) {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? <Navigate to={redirectTo} replace/> : children;
};

export default RestrictedRoute;
