import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "recruiter") {
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  // Prevent flicker while loading
  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
