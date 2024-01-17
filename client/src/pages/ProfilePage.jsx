import { useContext, useState } from "react";
import { UserContext } from "../utility/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import Loading from "../components/Loading";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return (
      <Loading />
    )
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  return (
    <div>
      <AccountNav />
      <div className="mx-auto max-w-lg text-center">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={logout} className="primary mt-2 max-w-md">
          logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
