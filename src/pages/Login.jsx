import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSignup, setIsSignup] = useState(false); 
    const navigate = useNavigate();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isSignup && !name)) {
        setError("All fields are required!");
        return;
    }

    const endpoint = isSignup 
        ? "http://localhost:5000/api/auth/signup" 
        : "http://localhost:5000/api/auth/login";
        
    const payload = isSignup ? { name, email, password } : { email, password };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        alert(data.message);

        if (!isSignup) {
            localStorage.setItem("authToken", data.token);
            setIsAuthenticated(true);
            navigate("/page1");  // ✅ Redirect to /page1 after login
        } else {
            setIsSignup(false);
        }
    } catch (error) {
        setError(error.message);
    }
};


    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isSignup ? "Sign Up" : "Login"}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>
                <p className="toggle-text">
                    {isSignup 
                        ? "Already have an account?" 
                        : "Don't have an account?"} 
                    <span onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? " Login" : " Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;