import { useState } from "react";
import React from "react";
import authpicture from "../assets/authpicture.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    keepSignedIn: false,
    emailNotifications: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*]/.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword, username } = formData;
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long and include a number and special character.");
      return;
    }

    if (isLogin) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = storedUsers.find((user) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      if (users.some((user) => user.email === email)) {
        alert("Email already exists. Try logging in.");
        return;
      }

      const newUser = { username, email, password }; 
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Account created successfully! Please login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center px-5 md:px-12 mt-12">
      <div>
        <h1 className="font-bold text-3xl mb-2 text-black">
          {isLogin ? "Welcome Back!" : "Track Your Progress & More!"}
        </h1>
        <h3 className="text-xl text-black">Start your fitness journey today</h3>

        <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md w-full max-w-md mt-5">
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full p-2 border mb-3 rounded-full outline-none"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full p-2 border rounded-full mb-3 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full p-2 border rounded-full mb-3 outline-none"
            required
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm password"
              onChange={handleChange}
              className="w-full p-2 border rounded-full mb-3 outline-none"
              required
            />
          )}
          <div className="flex items-center mt-3">
            {isLogin ? (
              <>
                <input
                  type="checkbox"
                  name="keepSignedIn"
                  checked={formData.keepSignedIn}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 border-gray-500 rounded"
                />
                <label htmlFor="keepSignedIn" className="ml-2 text-black">
                  Keep me signed in
                </label>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 border-gray-500 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
                  Send me email notifications for new program launches, website, or store updates (optional)
                </label>
              </>
            )}
          </div>
          {isLogin && (
            <p className="text-black text-right mt-[-20px] cursor-pointer">
              Forgot your password?
            </p>
          )}
          <button type="submit" className="bg-[#FFED00] w-full py-2 rounded-full mt-4 font-bold">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-gray-400 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>

        {isLogin && (
          <div className="flex items-center mt-5">
            <h1 className="w-52 border-t-2 border-black mr-2"></h1>
            <h1>or</h1>
            <h1 className="w-52 border-t-2 border-black ml-2"></h1>
          </div>
        )}

        <div className="ml-16">
          <button className="border border-black w-64 h-11 rounded-full flex items-center justify-center">
            <FcGoogle className="text-2xl" /> Login with Google
          </button>
        </div>

        <h1 className="text-[#847F7f]">
          By signing up, you agree to the Terms & Conditions and Privacy Policy
        </h1>
      </div>

      <img 
  src={authpicture} 
  alt="auth" 
  className="w-[500px] md:w-full h-auto object-cover mt-5" 
/>

    </div>
  );
};

export default AuthForm;
