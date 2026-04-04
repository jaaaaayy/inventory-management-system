import Error from "@/components/error";
import Loading from "@/components/loading";
import { useAuthStatus } from "@/features/auth/services/queries";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data, isLoading, isError, error, isSuccess, isFetching } =
    useAuthStatus();

  if (isLoading) {
    return (
      <div className="h-svh flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="h-svh flex items-center justify-center">
        <Error message={error.message} />
      </div>
    );
  }

  if (!isFetching && isSuccess && data && !data.loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
