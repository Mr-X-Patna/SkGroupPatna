import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

import ConnectionStatus from './ConnectionStatus';

const Navbar = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
            <div className="container">

                {/* Inside the navbar, add this line: */}
                <div className="d-flex align-items-center me-3">
                  <ConnectionStatus />
                </div>

                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img
                        src="/logo.png"
                        alt="SK Group Logo"
                        height="40"
                        className="me-2"
                    />
                    <span>{t('brand')}</span>
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/transport">{t('nav.transport')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/realestate">{t('nav.realEstate')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cybercafe">{t('nav.cyberCafe')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/enquiry">{t('nav.enquiry')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin">{t('nav.admin')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-sm btn-outline-gold ms-2"
                                onClick={toggleLanguage}
                            >
                                {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="btn btn-sm btn-gold ms-1"
                                onClick={toggleTheme}
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
