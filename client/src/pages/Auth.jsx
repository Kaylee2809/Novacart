import { useState, useEffect } from "react";
import api from "../api/axios";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // Auto-hide popup
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";

      const res = await api.post(url, form);

      // LOGIN SUCCESS
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.dispatchEvent(new Event("storage"));

        setMessage("Login successful 🎉");
      }

      // REGISTER SUCCESS
      else {
        setMessage("Account created successfully 🎉");
        setIsLogin(true);
      }

      // clear form
      setForm({ name: "", email: "", password: "" });

    } catch (err) {
      console.log(err);
      setMessage("Something went wrong ❌");
    }
  };

  return (
    <div className="auth-container">

      {/* POPUP MESSAGE */}
      {message && (
        <div className="popup">
          {message}
        </div>
      )}

      <div className="auth-card">
        <h1>{isLogin ? "Login" : "Register"}</h1>

        {/* NAME (register only) */}
        {!isLogin && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* BUTTON */}
        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        {/* TOGGLE */}
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </div>
    </div>
  );
}