import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/brandLogo.svg";
import { Input } from "../components/ui/input";
import { useLoginMutation } from "../redux/services/authApis";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/services/authSlice";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation()

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Please enter email and password.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const result = await login(formData).unwrap();
      if (!result?.success) {
        throw new Error(result?.message)
      }
      toast.success(result?.message)

      console.log(result)

      dispatch(setToken({ accessToken: result.data?.accessToken }));
      if (window !== undefined) {
        window.location.href = "/"

      } else {
        navigate("/")
      }

    } catch (err: any) {
      console.log("login failed", err.data.message)
      setError(err.data.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          <img className="h-16 sm:h-20 w-auto" src={logo} alt="Brand Logo" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333]">
            Login to Account
          </h2>
          <p className="text-sm sm:text-base text-[#B0B0B0]">
            Please enter your email and password to continue
          </p>
          {/* <div className="text-xs text-gray-500 text-center">
            <p>Demo emails:</p>
            <p>admin@company.com → Admin</p>
            <p>property@company.com → Property Admin</p>
            <p>content@company.com → Content Admin</p>
            <p>support@company.com → Support Member</p>
          </div> */}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666]">Email address</label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="py-3"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666]">Password</label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="py-3 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <Link to={"/forgot-password"} >
            <small className='flex items-center underline justify-end'>Forgot password</small>
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-[#D4B785] to-[#B08D59] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-4 h-4" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;