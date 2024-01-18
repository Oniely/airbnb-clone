import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../utility/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex grow items-center justify-center">
      <div>
        <h1 className="mb-4 text-center text-4xl">Login</h1>
        <form className="mx-auto max-w-md" onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus={true}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="py-2 text-center text-gray-500">
            Don`t have an account yet?{" "}
            <Link className="text-black underline" to={"/register"}>
              Regsiter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
