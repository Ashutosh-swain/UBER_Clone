import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="h-screen flex justify-between flex-col w-full  pt-8 bg-[url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-[30px] font-bold">Get Started with Uber</h2>
          <Link
            className="w-full bg-black text-white py-3 rounded-lg mt-5 flex items-center justify-center"
            to="/login"
          >
            Continue
            <i class="ri-arrow-right-fill text-white"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
