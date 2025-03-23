import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff } from "lucide-react";
import apiService from "../services/apiService";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [temperature, setTemperature] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        bloodType,
        height,
        weight,
        heartRate,
        oxygenLevel,
        temperature,
      };

      const response = await apiService.auth.register(userData);

      // If registration returns a token, store it
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Error signing up. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-purple-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-purple-900 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-200/20 mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">HealthCare</h1>
            <p className="text-purple-200 mt-1">Create your account</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type
                </label>
                <input
                  type="text"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heart Rate (bpm)
                  </label>
                  <input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oxygen Level (%)
                  </label>
                  <input
                    type="number"
                    value={oxygenLevel}
                    onChange={(e) => setOxygenLevel(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="mb-5 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Temperature (°C)
                </label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-500">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {error && (
                <div className="mb-5 text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-purple-800 hover:shadow-lg"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
