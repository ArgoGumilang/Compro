import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { fakeLoginApi } from "../services/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberUser");
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }
  }, []);

  const validate = () => {
    if (!username.trim()) {
      setError("Username/NIS wajib diisi");
      return false;
    }
    if (!password.trim()) {
      setError("Password wajib diisi");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fakeLoginApi(username, password);

      // Simpan token
      localStorage.setItem("token", res.token);

      // Remember me
      if (rememberMe) {
        localStorage.setItem("rememberUser", username);
      } else {
        localStorage.removeItem("rememberUser");
      }

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-10">
            Login
          </h1>

          {/* ERROR */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* USERNAME */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Username / NIS
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BE4139]"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg pr-12 focus:ring-2 focus:ring-[#BE4139]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* REMEMBER ME */}
          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 accent-[#BE4139]"
            />
            <span className="text-sm">Keep me logged in</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#BE4139] hover:bg-[#A03A2F] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block">
        <img
          src="https://cdn.prod.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg"
          alt="Library"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
