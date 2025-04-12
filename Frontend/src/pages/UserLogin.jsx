import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      email: email,
      password: password,
    });
    // console.log(userData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2 ">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded mb-7 px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email here !!"
            required
          />
          <h3 className="text-lg font-medium mb-2 ">Enter Password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 mb-7 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password here !!"
            required
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base ">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link className="text-blue-600" to="/signup">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="bg-[#10b461] text-white font-semibold  rounded px-4 py-2 border w-full text-lg placeholder:text-base flex justify-center items-center mb-5"
          to="/captain-login"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
