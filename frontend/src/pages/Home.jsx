import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    const businesses = [
        {
            id: 'realEstate',
            icon: 'fa-building',
            title: t('businesses.realEstate'),
            desc: t('businesses.realEstateDesc'),
            link: '/realestate',
            color: 'gold'
        },
        {
            id: 'transport',
            icon: 'fa-car',
            title: t('businesses.transport'),
            desc: t('businesses.transportDesc'),
            link: '/transport',
            color: 'gold'
        },
        {
            id: 'cyberCafe',
            icon: 'fa-laptop',
            title: t('businesses.cyberCafe'),
            desc: t('businesses.cyberCafeDesc'),
            link: '/cybercafe',
            color: 'gold'
        }
    ];

    return (
        <>
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="container position-relative">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <h1 className="hero-title">
                                {t('hero.title')} <span>SK Group</span>
                            </h1>
                            <p className="hero-subtitle my-4">
                                {t('hero.subtitle')}
                            </p>
                            <Link to="/enquiry" className="btn btn-gold">
                                {t('hero.cta')} <i className="fas fa-arrow-right ms-2"></i>
                            </Link>
                        </div>
                        <div className="col-lg-5 d-none d-lg-block">
                            <div className="text-center text-white">
                                <div className="display-1 fw-bold text-gold">5+</div>
                                <p className="text-light">{t('stats.yearsRealEstate')}</p>
                                <div className="display-1 fw-bold text-gold">200+</div>
                                <p className="text-light">{t('stats.families')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SK GROUP */}
            <section className="py-5">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <h2 className="section-title">About {t('brand')}</h2>
                            <p className="text-muted fs-5">
                                Built from real experience. SK Group Patna brings together businesses built through years of hands-on experience, local relationships and customer trust.
                            </p>
                            <div className="row g-3 mt-3">
                                <div className="col-6">
                                    <div className="stat-number">5+</div>
                                    <div className="stat-label">{t('stats.yearsRealEstate')}</div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-number">200+</div>
                                    <div className="stat-label">{t('stats.families')}</div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-number">3+</div>
                                    <div className="stat-label">{t('stats.yearsCafe')}</div>
                                </div>
                                <div className="col-6">
                                    <div className="stat-number">2+</div>
                                    <div className="stat-label">{t('stats.customers')}K+</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card-glow">
                                <h4 className="mb-3">Why {t('brand')}?</h4>
                                <p className="text-muted">
                                    Built on experience. Driven by trust. Our businesses have grown through real experience, local connections and customers who continue to trust us.
                                </p>
                                <ul className="list-unstyled mt-3">
                                    <li className="mb-2"><i className="fas fa-check-circle text-gold me-2"></i> 5+ Years Real Estate Experience</li>
                                    <li className="mb-2"><i className="fas fa-check-circle text-gold me-2"></i> 2 Lakh+ Sq. Ft. Land Sale</li>
                                    <li className="mb-2"><i className="fas fa-check-circle text-gold me-2"></i> 200+ Families Trusted</li>
                                    <li className="mb-2"><i className="fas fa-check-circle text-gold me-2"></i> Local Experience, Direct Service</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BUSINESSES */}
            <section className="py-5" style={{ background: 'var(--surface-2)' }}>
                <div className="container">
                    <h2 className="section-title text-center">Our Businesses</h2>
                    <p className="section-subtitle text-center">Local businesses. Real relationships.</p>
                    <div className="row g-4 mt-4">
                        {businesses.map((biz) => (
                            <div className="col-md-4" key={biz.id}>
                                <div className="card-glow text-center">
                                    <div className="icon-box mx-auto">
                                        <i className={`fas ${biz.icon}`}></i>
                                    </div>
                                    <h4>{biz.title}</h4>
                                    <p className="text-muted">{biz.desc}</p>
                                    <Link to={biz.link} className="btn btn-outline-gold btn-sm">
                                        Learn More <i className="fas fa-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;