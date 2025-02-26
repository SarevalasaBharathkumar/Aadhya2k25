import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); 
    const [error, setError] = useState("");
    const [isSignup, setIsSignup] = useState(false); 
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => password.length >= 6; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
        if (!email || !password || (isSignup && (!name || !role))) {
            setError("All fields are required!");
            setLoading(false);
            return;
        }
    
        if (!validateEmail(email)) {
            setError("Invalid email format");
            setLoading(false);
            return;
        }
    
        if (!validatePassword(password)) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
    
        const endpoint = isSignup 
            ? "http://localhost:5000/api/auth/signup" 
            : "http://localhost:5000/api/auth/login";
    
        const payload = isSignup ? { name, email, password, role } : { email, password };
    
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (!response.ok) throw new Error(data.message || "Something went wrong");
    
            alert(data.message);
    
            if (!isSignup) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsAuthenticated(true);
                navigate("/dashboard");
            } else {
                setIsSignup(false);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>{isSignup ? "Sign Up" : "Login"}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="admin">Admin</option>
                                    <option value="coordinator">Coordinator</option>
                                    <option value="alumni">Alumni</option>
                                </select>
                            </div>
                        </>
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
                            placeholder="Password (min. 6 characters)" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>
                <p className="toggle-text">
                    {isSignup ? "Already have an account?" : "Don't have an account?"} 
                    <span onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? " Login" : " Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
