import { ReactNode, Suspense } from "react";
import useAuth from "../../hooks/context/useAuth";
import { Navigate} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HOME_ROUTE } from "../../utils/constants";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (isAuthenticated) return <Navigate to={HOME_ROUTE} />;
  return (
    <ErrorBoundary fallback={<p>Error</p>}>
      <Suspense fallback="login">{children}</Suspense>
    </ErrorBoundary>
  );
};

export default PublicRoute;
