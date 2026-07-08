import { Loader } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { useResendResetCodeMutation, useVerifyResetOtpMutation } from "../redux/services/authApis";

function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyResetOtp] = useVerifyResetOtpMutation();
  const [resendResetCode] = useResendResetCodeMutation();

  const { email } = location.state || { email: "" };

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // otp input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCodee = [...code];
    newCodee[index] = e.target.value;
    setCode(newCodee);

    if (e.target.value && index < 6 - 1) {
      const nextInput = document.getElementById(
        `input-${index + 1}`,
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  // otp remove
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index]) {
      const prevInput = document.getElementById(
        `input-${index - 1}`,
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // otp submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const enterCode = code.join("");

    if (enterCode.length < 6) {
      setError("Please enter the 6 digit code.");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyResetOtp({ email, resetCode: Number(enterCode) }).unwrap();
      console.log("response data===>", response)

      // navigate("/reset-password");
      navigate("/reset-password", { state: { email, resetCode: Number(enterCode) } });
    } catch (err: any) {
      const errorMsg = err?.data?.message || "Invalid or expired code.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // otp resend
  const handleResend = async () => {
    setResending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await resendResetCode({ email }).unwrap();

      console.log(`Verification code resent to ${email}`);

      setSuccessMessage("A new code has been sent to your email!");
    } catch (err: any) {
      setError("Something went wrong while resending the code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333]">
            Check your email
          </h2>
          <p className="text-sm sm:text-base text-[#B0B0B0]">
            We sent a reset link to {email} enter 6 digit code that mentioned in
            the email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-3">
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`input-${index}`}
                type="text"
                value={digit}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onChange={(e) => handleChange(e, index)}
                maxLength={1}
                className="w-12 h-12 flex items-center justify-center text-center text-xl font-semibold border-2 border-gray-300 rounded-md text-[#d1d5dc]"
              />
            ))}
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md mt-2">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-sm text-green-500 bg-green-50 p-2 rounded-md mt-2">
              {successMessage}
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
                Verifying Code...
              </>
            ) : (
              "Verify"
            )}
          </button>
        </form>

        <div className="mt-4">
          <p className="text-sm sm:text-base text-center text-[#B0B0B0]">
            You have not received the email?
            <button
              className="ml-2 text-[#4682b9] font-medium cursor-pointer underline"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                "Resend"
              )}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
