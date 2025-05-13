import { ReactNode, Suspense } from "react";
import useAuth from "../../hooks/context/useAuth";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { LOGIN_ROUTE } from "../../utils/constants";
type PrivateRouteProps = {
  children: ReactNode;
  destination: string;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // console.log("Private Route - is Authenticated", isAuthenticated, isLoading);

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to={LOGIN_ROUTE} />;

  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default PrivateRoute;
