import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState('');

  async function registerUser(e) {
    e.preventDefault();

    try {
      await axios.post("/register", { name, email, password });
      setRedirect('/login');
    } catch (error) {
      const { response: { data: { message } } } = error;
      console.log(error);
      alert(message);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="flex grow items-center justify-center">
      <div>
        <h1 className="mb-4 text-center text-4xl">Register</h1>
        <form className="mx-auto max-w-md" onSubmit={registerUser}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            autoFocus={true}
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Your@gmail.com"}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="primary">Register</button>
          <div className="py-2 text-center text-gray-500">
            Already a member?{" "}
            <Link className="text-black underline" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
