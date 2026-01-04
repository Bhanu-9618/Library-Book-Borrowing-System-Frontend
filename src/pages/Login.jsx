import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/api';
import { toast } from 'react-toastify';
import heroImage from '../assets/img2.jpg';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(credentials);
            if (res.data === true) {
                localStorage.setItem("isAdminAuthenticated", "true");
                toast.success("Access Granted");
                navigate('/dashboard');
            } else {
                alert("Invalid Credentials! Please check your email and password.");
                toast.error("Invalid Credentials");
            }
        } catch (error) {
            toast.error("Connection Error");
        }
    };

    return (
        <div style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            <style>
                {`
                .custom-input::placeholder {
                    color: white !important;
                    opacity: 0.8;
                }
                `}
            </style>

            <div style={{
                width: '450px',
                padding: '40px',
                borderRadius: '30px',
                marginLeft: "10px",
                marginRight: "10px",
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}>
                <div className="text-white text-center">
                    <h1 className="mb-4" style={{ letterSpacing: '2px', fontFamily: "math", fontWeight: 'normal' }}>Welcome Admin!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control bg-transparent text-white custom-input rounded-pill border-light py-2 px-4 shadow-none"
                                placeholder="Email Address"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                className="form-control bg-transparent text-white custom-input rounded-pill border-light py-2 px-4 shadow-none"
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-light w-100 rounded-pill py-2 fw-bold transition-all shadow-sm"
                            style={{ fontSize: '1.1rem' }}>
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;