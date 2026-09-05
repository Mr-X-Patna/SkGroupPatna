import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const RealEstate = () => {
    const { t } = useLanguage();

    return (
        <>
            <section className="hero-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <div className="text-center text-white">
                        <h1 className="display-3 fw-bold">{t('realEstate.title')}</h1>
                        <p className="lead text-light-50">{t('realEstate.subtitle')}</p>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card-glow text-center p-5">
                                <i className="fas fa-home fa-4x text-gold mb-4"></i>
                                <h3>{t('realEstate.title')}</h3>
                                <p className="text-muted fs-5">{t('realEstate.description')}</p>
                                <a
                                    href="https://mr-x-patna.github.io/SK-Green_City/frontend/index.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-gold btn-lg mt-3"
                                >
                                    <i className="fas fa-external-link-alt me-2"></i>
                                    {t('realEstate.cta')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RealEstate;