import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send email as username (backend can handle both username and email)
      const result = await login(email, password);

      if (result.success) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true }); // Redirect to original page or home
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (signupPassword !== signupConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const result = await register(
        signupUsername,
        signupEmail,
        signupPassword
      );

      if (result.success) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true }); // Redirect to original page or home
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen max-w-screen h-screen flex flex-col relative overflow-hidden">
      {/* Header at the top, outside the fixed background */}
      <Header/>
      {/* Background image with blur */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/assets/grad.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Content above background */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center w-full h-full">
          <div className="w-full max-w-lg p-0 flex flex-col items-center justify-center">
            <div
              className="w-full p-8 rounded-2xl shadow-2xl flex flex-col justify-center"
              style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <h1 className=" text-white text-3xl font-serif font-bold text-center mb-2">
                Welcome
              </h1>
              <p className="text-center text-white mb-6">
                {showLogin ? "Sign in to your account" : "Create a new account"}
              </p>

              {/* Error message display */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {showLogin ? (
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Username or E-mail
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username or e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-none bg-white/60 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-white font-semibold mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-none bg-white/60 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                      disabled={loading}
                    />
                    <span
                      className="absolute right-3 top-9 cursor-pointer text-gray-600"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </span>
                    <div className="text-right mt-2">
                      <a
                        href="#"
                        className="text-xs text-white hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-yellow-500 text-white font-semibold text-lg shadow hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                  <div className="flex items-center justify-center gap-6 mt-2">
                    <span className="text-gray-700">Or</span>
                    <button
                      type="button"
                      className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
                        alt="Gmail"
                        className="h-6 w-6"
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                        alt="Facebook"
                        className="h-6 w-6"
                      />
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="GitHub"
                        className="h-6 w-6"
                      />
                    </button>
                  </div>
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleRegister}>
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-none bg-white/60 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your e-mail"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-none bg-white/60 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-white font-semibold mb-1">
                      Password
                    </label>
                    <input
                      type={signupShowPassword ? "text" : "password"}
                      placeholder="******"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-none bg-white/60 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                      disabled={loading}
                    />
                    <span
                      className="absolute right-3 top-9 cursor-pointer text-gray-600"
                      onClick={() => setSignupShowPassword((v) => !v)}
                    >
                      {signupShowPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </span>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border-none bg-white/60 text-gray-900 placeholder-gray-500 shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      required
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-yellow-500 text-white font-semibold text-lg shadow hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Sign Up"}
                  </button>
                </form>
              )}
              <div className="mt-6 text-center text-gray-800">
                {showLogin ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      className="text-yellow-700 font-semibold hover:underline"
                      onClick={() => setShowLogin(false)}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-yellow-700 font-semibold hover:underline"
                      onClick={() => setShowLogin(true)}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
