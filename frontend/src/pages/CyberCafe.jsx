import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CyberCafe = () => {
    const { t } = useLanguage();

    const services = [
        { icon: 'fa-globe', label: t('cafe.services.online') },
        { icon: 'fa-print', label: t('cafe.services.printing') },
        { icon: 'fa-file-alt', label: t('cafe.services.documentation') },
        { icon: 'fa-desktop', label: t('cafe.services.computer') },
        { icon: 'fa-pen-fancy', label: t('cafe.services.form') },
        { icon: 'fa-chart-line', label: t('cafe.services.marketing') },
        { icon: 'fa-plus-circle', label: t('cafe.services.more') },
    ];

    return (
        <>
            <section className="hero-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="text-center text-white">
                        <h1 className="display-3 fw-bold">{t('cafe.title')}</h1>
                        <p className="lead text-light-50">{t('cafe.subtitle')}</p>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row g-4">
                        {services.map((s, idx) => (
                            <div className="col-md-3 col-6" key={idx}>
                                <div className="card-glow text-center">
                                    <i className={`fas ${s.icon} fa-2x text-gold mb-2`}></i>
                                    <p className="mb-0 small fw-bold">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-5" style={{ background: 'var(--surface-2)' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card-glow">
                                <h4><i className="fas fa-clock text-gold me-2"></i>{t('cafe.hours')}</h4>
                                <ul className="list-unstyled mt-3">
                                    <li><i className="fas fa-sun text-gold me-2"></i>{t('cafe.morning')}</li>
                                    <li><i className="fas fa-moon text-gold me-2"></i>{t('cafe.evening')}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card-glow">
                                <h4><i className="fas fa-map-marker-alt text-gold me-2"></i>Address</h4>
                                <p className="mt-3">{t('cafe.address')}</p>
                                <a
                                    href="https://maps.app.goo.gl/GzCyvBKTzr3LDZiH6"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-gold btn-sm mt-2"
                                >
                                    <i className="fas fa-map me-2"></i>Open in Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CyberCafe;