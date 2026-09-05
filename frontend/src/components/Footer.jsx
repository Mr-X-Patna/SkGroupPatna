import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-dark text-white py-5 mt-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <h5 className="text-gold">{t('brand')}</h5>
                        <p className="text-light-50 small">{t('tagline')}</p>
                        <p className="text-light-50 small mb-0">
                            <i className="fas fa-map-marker-alt text-gold me-2"></i>
                            {t('cafe.address')}
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-gold">{t('footer.contact')}</h5>
                        <p className="text-light-50 small mb-1">
                            <i className="fas fa-whatsapp text-success me-2"></i>
                            <a href="https://wa.me/918340554027" className="text-white text-decoration-none">
                                +91 8340554027
                            </a>
                        </p>
                        <p className="text-light-50 small mb-1">
                            <i className="fas fa-envelope text-gold me-2"></i>
                            <a href="mailto:tk8780078@gmail.com" className="text-white text-decoration-none">
                                tk8780078@gmail.com
                            </a>
                        </p>
                        <p className="text-light-50 small">
                            <i className="fas fa-map-marker-alt text-gold me-2"></i>
                            <a href="https://maps.app.goo.gl/GzCyvBKTzr3LDZiH6" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                                Google Maps
                            </a>
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h5 className="text-gold">{t('footer.follow')}</h5>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white fs-4"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-white fs-4"><i className="fab fa-facebook"></i></a>
                            <a href="https://wa.me/918340554027" className="text-white fs-4"><i className="fab fa-whatsapp"></i></a>
                        </div>
                        <p className="text-light-50 small mt-3">
                            {t('footer.rights')} © {new Date().getFullYear()} {t('brand')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;