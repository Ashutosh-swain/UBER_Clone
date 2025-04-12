import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password,
    });
    // console.log(captainData);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
          Join a fleet?{" "}
          <Link className="text-blue-600" to="/captain-signup">
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          className="bg-[#d5622d] text-white font-semibold  rounded px-4 py-2 border w-full text-lg placeholder:text-base flex justify-center items-center mb-5"
          to="/login"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
