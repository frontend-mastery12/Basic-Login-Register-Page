import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BiHide } from "react-icons/bi";
import { SiNamecheap } from "react-icons/si";
import Dragon from "../assets/Dragons.png";
import { Loader } from "./Loader";
import { inputWrapper, inputBase, iconBase, submitBtn } from "../styles/ui";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = registerUser({ name, email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
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
        />{" "}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-3 mt-5 xl:w-5/12 xl:mt-10 xl:pr-5 xl:mr-5"
      >
        <div className="flex flex-col items-center">
          <span className="gap-2.5 text-2xl tracking-wide flex items-center justify-between xl:text-3xl xl:gap-5">
            Register <FaHandsClapping className="text-yellow-400" />
          </span>

          {error ? (
            <p className="text-orange-600 text-[13px] mt-4 tracking-wide xl:text-[14px] xl:mt-3">
              {error}
            </p>
          ) : (
            <p className="text-[13px] mt-4 text-gray-400 tracking-wide xl:text-[14px] xl:mt-3">
              Please enter your name, email and password
            </p>
          )}
        </div>

        <div style={{ marginTop: "2rem" }} className={inputWrapper(!!error)}>
          <SiNamecheap className={iconBase} />
          <input
            type="text"
            className={inputBase}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={`${inputWrapper(!!error)} mt-4`}>
          <MdAlternateEmail className={iconBase} />
          <input
            type="email"
            className={inputBase}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={`${inputWrapper(!!error)} mt-4`}>
          <TbLockPassword className={iconBase} />
          <input
            type="password"
            className={inputBase}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <BiHide className="mr-3 text-gray-400 group-focus-within:text-amber-400" />
        </div>

        <div className="flex items-center gap-2 mt-4 xl:mt-3">
          <input type="checkbox" className="bg-gray-700" />
          <span className="text-[13px] text-gray-400 tracking-wide xl:text-[16px]">
            I agree to the{" "}
            <span className="underline cursor-pointer text-yellow-600">
              Terms & Conditions
            </span>
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${submitBtn} flex items-center justify-center gap-2 disabled:opacity-60`}
        >
          {loading ? <Loader /> : "Register"}
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="bg-gray-300 w-4/12 h-0.5"></span>
          <span>Or register with</span>
          <span className="bg-gray-300 w-4/12 h-0.5"></span>
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
          Already have an account?{" "}
          <Link to="/" className="text-yellow-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
