import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const Enquiry = () => {
    const { t } = useLanguage();
    const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000';

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        service: 'Real Estate',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await axios.post(`${API_URL}/api/enquiries`, form, {
                headers: { 'Content-Type': 'application/json' },
            });
            setSubmitted(true);
            setForm({ name: '', phone: '', email: '', message: '', service: 'Real Estate' });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="hero-section" style={{ padding: '60px 0' }}>
                <div className="container">
                    <div className="text-center text-white">
                        <h1 className="display-3 fw-bold">{t('enquiry.title')}</h1>
                        <p className="lead text-light-50">{t('enquiry.subtitle')}</p>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {submitted ? (
                                <div className="card-glow text-center p-5">
                                    <i className="fas fa-check-circle fa-4x text-success mb-3"></i>
                                    <h3>{t('enquiry.success')}</h3>
                                    <button
                                        className="btn btn-gold mt-3"
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Submit Another Enquiry
                                    </button>
                                </div>
                            ) : (
                                <div className="card-glow p-4 p-md-5">
                                    {error && (
                                        <div className="alert alert-danger">{error}</div>
                                    )}
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">{t('enquiry.name')}</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control form-control-custom"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">{t('enquiry.phone')}</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control form-control-custom"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">{t('enquiry.email')}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-custom"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">{t('enquiry.service')}</label>
                                            <select
                                                name="service"
                                                className="form-select form-control-custom"
                                                value={form.service}
                                                onChange={handleChange}
                                            >
                                                <option value="Real Estate">{t('businesses.realEstate')}</option>
                                                <option value="Transportation">{t('businesses.transport')}</option>
                                                <option value="Cyber Cafe">{t('businesses.cyberCafe')}</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label fw-bold">{t('enquiry.message')}</label>
                                            <textarea
                                                name="message"
                                                rows="5"
                                                className="form-control form-control-custom"
                                                value={form.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-gold w-100"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Submitting...
                                                </>
                                            ) : (
                                                t('enquiry.submit')
                                            )}
                                        </button>
                                    </form>
                                    <div className="text-center mt-4">
                                        <p className="text-muted">Or contact us directly:</p>
                                        <a
                                            href="https://wa.me/918340554027"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-success"
                                        >
                                            <i className="fab fa-whatsapp me-2"></i> WhatsApp
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Enquiry;