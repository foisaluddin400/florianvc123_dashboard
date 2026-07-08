import { Eye, EyeOff, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { useResetPasswordMutation } from "../redux/services/authApis";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation()
  const [resetPassword] = useResetPasswordMutation();

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const [formData, setFormData] = useState<FormData>({
    email: email,
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.password || !formData.confirmPassword) {
      return "Please enter both new password and confirm password.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "New password and confirm password do not match.";
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
      const response = await resetPassword(formData).unwrap();
      console.log("response data===>", response)

      navigate("/login")

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333]">
            Set a new password
          </h2>
          <p className="text-sm sm:text-base text-[#B0B0B0]">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* new password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666]"> New Password</label>
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
          {/* confirm password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#666]">Confirm Password</label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showconfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="py-3 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowconfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showconfirmPassword ? (
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-[#D4B785] to-[#B08D59] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-4 h-4" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
