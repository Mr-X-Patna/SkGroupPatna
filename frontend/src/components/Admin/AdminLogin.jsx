import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';

const AdminLogin = () => {
    const { t } = useLanguage();
    const { API_URL, login } = useAuth();

    const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(`${API_URL}/api/auth/login/request-otp`, {
                username,
                password,
            });
            setEmail(res.data.email);
            setStep('otp');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(
                `${API_URL}/api/auth/login/verify-otp`,
                { email, otp },
                { withCredentials: true }
            );
            login(res.data.user);
            // Redirect handled by parent
            window.location.href = '/admin/dashboard';
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        setStep('credentials');
        setOtp('');
        setError('');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card-glow p-4 p-md-5">
                        <div className="text-center mb-4">
                            <h2 className="section-title">{t('admin.login')}</h2>
                            {step === 'otp' && (
                                <p className="text-muted">
                                    OTP sent to <strong>{email}</strong>
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        {step === 'credentials' ? (
                            <form onSubmit={handleRequestOTP}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">{t('admin.username')}</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-custom"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">{t('admin.password')}</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-custom"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-gold w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span> Sending OTP...</>
                                    ) : (
                                        t('admin.requestOtp')
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP}>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">{t('admin.otp')}</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-custom text-center fs-2 fw-bold"
                                        style={{ letterSpacing: '8px', fontSize: '2rem' }}
                                        maxLength="6"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        required
                                    />
                                    <small className="text-muted">Enter the 6-digit code sent to your email</small>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-gold w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2"></span> Verifying...</>
                                    ) : (
                                        t('admin.verify')
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary w-100 mt-2"
                                    onClick={handleBack}
                                >
                                    <i className="fas fa-arrow-left me-2"></i> Back
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;