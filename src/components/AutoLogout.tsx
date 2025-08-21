import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/root/root.store";
import { AuthSliceMethods } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface AutoLogoutProps {
}
export const AutoLogout = (props: AutoLogoutProps) => {
  let logoutTimer: NodeJS.Timeout | null = null;
  let inactivityTimeout = 60 * 60 * 1000;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => { 
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    startLogoutTimer();
  }, [])

  const handleUserActivity = () => {
    startLogoutTimer();
  }

  const startLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    logoutTimer = setTimeout(() => {
      logoutUser();
    }, inactivityTimeout);
  }

  const stopLogoutTimer = () => {
    if (logoutTimer !== null) {
      clearTimeout(logoutTimer);
    }
  }

  const logoutUser = () => {
    dispatch(AuthSliceMethods.logout());
    navigate(`/login`, { replace: false });
  }

  window.removeEventListener('mousemove', handleUserActivity);
  window.removeEventListener('keydown', handleUserActivity);
  stopLogoutTimer();

  return (
    <></>
  );
}

export default AutoLogout;