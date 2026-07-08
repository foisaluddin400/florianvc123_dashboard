import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { useForgotPasswordMutation } from "../redux/services/authApis";

interface FormData {
  email: string
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const [formData, setFormData] = useState<FormData>({
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      return "Please enter a valid email";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
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
      const response = await forgotPassword(formData).unwrap();
      console.log("response data===>",response)
      // RedirectByRole(user.role, navigate);
      // navigate("/forgot-otp")
      navigate("/forgot-otp", { state: { email: formData.email } }); 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Something went wrong. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333]">
            Forget Password?
          </h2>
          <p className="text-sm sm:text-base text-[#B0B0B0]">
            Please enter your email to get verification code
          </p>

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


          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-[#D4B785] to-[#B08D59] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
          >
            {loading ? (
              <>
                <Loader className="animate-spin w-4 h-4" />
                Sending Verification Code...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;