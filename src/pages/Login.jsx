import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BiHide } from "react-icons/bi";
import Dragon from "../assets/Dragons.png";
import { Loader } from "./Loader";
import { inputWrapper, inputBase, iconBase, submitBtn } from "../styles/ui";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = loginUser(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 5000);
  };

  return (
    <div
      style={{ background: "rgba(33, 34, 38, 0.78)" }}
      className="w-11/12 mx-auto mt-8 border-[1.1px] border-gray-700 xl:flex xl:justify-between xl:w-6/9 xl:h-145 xl:mt-30 "
    >
      <div className="xl:w-8/12  xl:overflow-hidden">
        <img
          src={Dragon}
          alt="dragon"
          className="xl:w-169 xl:relative xl:bottom-10"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 mt-5 xl:w-5/12 xl:mt-10 xl:pr-5 xl:mr-5"
      >
        <div className="flex flex-col items-center">
          <span className="gap-2.5 text-2xl tracking-wide flex items-center justify-between xl:text-3xl xl:gap-5">
            Welcome <FaHandsClapping className="text-yellow-400" />
          </span>

          {error ? (
            <p className="text-orange-600 text-[13px] mt-4 tracking-wide xl:text-[14px] xl:mt-3">
              {error}
            </p>
          ) : (
            <p className="text-[13px] mt-4 text-gray-400 tracking-wide xl:text-[14px] xl:mt-3">
              Please enter your email and password
            </p>
          )}
        </div>

        <div style={{ marginTop: "2rem" }} className={inputWrapper(!!error)}>
          <MdAlternateEmail className={iconBase} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
          />
        </div>

        <div className={`${inputWrapper(!!error)} mt-4`}>
          <TbLockPassword className={iconBase} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputBase}
          />
          <BiHide className="mr-3 text-gray-400 group-focus-within:text-amber-400" />
        </div>

        <div className="flex items-center gap-2 mt-4 xl:mt-3">
          <input type="checkbox" className="bg-gray-700" />
          <span className="text-[13px] text-gray-400 tracking-wide xl:text-[16px]">
            Remember me
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${submitBtn} flex items-center justify-center gap-2 disabled:opacity-60`}
        >
          {loading ? <Loader /> : "Login"}
        </button>

        <h2 className="text-center mt-4 text-[14px] underline text-gray-400 tracking-wider cursor-pointer xl:text-[15px]">
          Forget password?
        </h2>

        <div className="flex items-center justify-between mt-4">
          <span className="bg-gray-300 w-5/12 h-0.5"></span>
          <span>Or</span>
          <span className="bg-gray-300 w-5/12 h-0.5"></span>
        </div>

        <div className="flex items-center justify-center gap-5 mt-3">
          <span
            style={{ background: "rgba(48, 55, 62, 0.87)" }}
            className="bg-[rgba(48, 55, 62, 0.87)] p-2 text-2xl border-[1.1px] cursor-pointer border-gray-600 rounded-[5px]"
          >
            <FcGoogle />
          </span>
          <span
            style={{ background: "rgba(48, 55, 62, 0.87)" }}
            className="p-2 text-2xl border-[1.1px] cursor-pointer border-gray-600 rounded-[5px]"
          >
            <FaGithub />
          </span>
        </div>

        <p className="flex items-center justify-center gap-1 text-[13px] mt-4 text-gray-400 tracking-wide mb-8 xl:text-[14px] xl:mt-5">
          Don't have an account?
          <Link to="/register" className="text-yellow-600 underline">
            Register now!
          </Link>
        </p>
      </form>
    </div>
  );
};
