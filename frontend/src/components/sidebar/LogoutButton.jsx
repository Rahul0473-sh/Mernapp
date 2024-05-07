import { SlLogout } from "react-icons/sl";
import uselogout from "../../hooks/useLogut";
const LogoutButton = () => {
  const { loading, logout } = uselogout();
  return (
    <div className="mt-auto cursor-pointer">
      {!loading ? (
        <SlLogout className="w-6 h-6  cursor-pointer text-white" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
