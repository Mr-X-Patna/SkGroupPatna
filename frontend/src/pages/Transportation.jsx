import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Transportation = () => {
    const { t } = useLanguage();

    const rides = [
        { label: t('transport.rides.long'), icon: 'fa-road' },
        { label: t('transport.rides.short'), icon: 'fa-route' },
        { label: t('transport.rides.family'), icon: 'fa-users' },
        { label: t('transport.rides.bachelors'), icon: 'fa-user-friends' },
        { label: t('transport.rides.officer'), icon: 'fa-briefcase' },
        { label: t('transport.rides.weekend'), icon: 'fa-umbrella-beach' },
    ];

    const prices = [
        {
            name: t('transport.sedan'),
            price: '₹2,400',
            hours: '8 HOURS / 60 KM',
            extra: '₹300',
            featured: false,
        },
        {
            name: t('transport.ertiga'),
            price: '₹3,200',
            hours: '8 HOURS / 60 KM',
            extra: '₹300',
            featured: true,
        },
        {
            name: t('transport.innova'),
            price: '₹4,000',
            hours: '8 HOURS / 60 KM',
            extra: '₹400',
            featured: false,
        },
    ];

    const features = [
        { icon: 'fa-tag', text: t('transport.features.budget') },
        { icon: 'fa-star', text: t('transport.features.service') },
        { icon: 'fa-heart', text: t('transport.features.memories') },
    ];

    return (
        <>
            {/* Hero */}
            <section className="hero-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="text-center text-white">
                        <h1 className="display-3 fw-bold">{t('transport.title')}</h1>
                        <p className="lead text-light-50">{t('transport.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Ride Types */}
            <section className="py-5">
                <div className="container">
                    <h2 className="section-title text-center">Book For All Kinds of Trips</h2>
                    <div className="row g-3 mt-4">
                        {rides.map((ride, idx) => (
                            <div className="col-md-4 col-lg-2" key={idx}>
                                <div className="card-glow text-center">
                                    <i className={`fas ${ride.icon} fa-2x text-gold mb-2`}></i>
                                    <p className="mb-0 fw-bold">{ride.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-4" style={{ background: 'var(--surface-2)' }}>
                <div className="container">
                    <div className="row g-4">
                        {features.map((f, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className="card-glow text-center">
                                    <i className={`fas ${f.icon} fa-3x text-gold mb-3`}></i>
                                    <h5>{f.text}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-5">
                <div className="container">
                    <h2 className="section-title text-center">{t('transport.pricing')}</h2>
                    <div className="row g-4 mt-4">
                        {prices.map((p, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className={`price-card ${p.featured ? 'featured' : ''}`}>
                                    <h4 className="text-gold">{p.name}</h4>
                                    <div className="price-amount">{p.price}</div>
                                    <div className="price-feature">
                                        <i className="fas fa-clock"></i> {p.hours}
                                    </div>
                                    <div className="price-feature">
                                        <i className="fas fa-plus-circle"></i> Extra Hour: {p.extra}
                                    </div>
                                    <div className="price-feature text-muted small">
                                        <i className="fas fa-info-circle"></i> {t('transport.toll')}
                                    </div>
                                    {p.featured && (
                                        <div className="mt-3">
                                            <span className="badge bg-gold text-dark">Best Value</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Drivers & Cars */}
            <section className="py-5" style={{ background: 'var(--surface-2)' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card-glow text-center">
                                <i className="fas fa-user-tie fa-3x text-gold mb-3"></i>
                                <h5>{t('transport.drivers')}</h5>
                                <p className="text-muted">Trained, Verified & Customer Friendly</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-glow text-center">
                                <i className="fas fa-car fa-3x text-gold mb-3"></i>
                                <h5>{t('transport.maintained')}</h5>
                                <p className="text-muted">Clean, Sanitized & Safety Checked</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card-glow text-center">
                                <i className="fas fa-handshake fa-3x text-gold mb-3"></i>
                                <h5>{t('transport.comfort')}</h5>
                                <p className="text-muted">To Make Your Travel Experience The Best</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-5" style={{ background: 'var(--navy)' }}>
                <div className="container text-center">
                    <h3 className="text-white">Ready to Book?</h3>
                    <a href="https://wa.me/918340554027" target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-3">
                        <i className="fab fa-whatsapp me-2"></i> Book Now on WhatsApp
                    </a>
                </div>
            </section>
        </>
    );
};

export default Transportation;