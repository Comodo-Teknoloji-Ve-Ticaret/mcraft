import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import blogAuthor from './../../assets/blog-author.jpeg';
import activitiesData from '../../Activities.json';

import galleryimage1 from '../../assets/gallery-image1.webp';
import galleryimage2 from '../../assets/gallery-image2.webp';
import galleryimage3 from '../../assets/gallery-image3.webp';
import galleryimage4 from '../../assets/gallery-image4.webp';
import galleryimage5 from '../../assets/gallery-image5.webp';

function Activities() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { t, i18n } = useTranslation();

    const currentLanguage = (i18n.language || 'en').split('-')[0];
    const activityLanguage = ['tr', 'en', 'ru'].includes(currentLanguage) ? currentLanguage : 'en';

    const activities = activitiesData.map(activity => {
        const selectedTranslation = activity.translations[activityLanguage] || activity.translations.en;
        const selectedCategory = activity.category[activityLanguage] || activity.category.en;

        return {
            id: activity.id,
            image: selectedTranslation.image,
            title: selectedTranslation.title,
            category: selectedCategory,
            description: selectedTranslation.description
        };
    });

    const filterByCategory = (category) => {
        setSelectedCategory(category);
    };

    const filteredActivities = selectedCategory === 'all'
        ? activities
        : activities.filter(activity => activity.category === selectedCategory);

    const uniqueCategories = [...new Set(activities.map(activity => activity.category))].map(
        category => ({
            name: category,
            count: activities.filter(activity => activity.category === category).length
        })
    );

    return (
        <>
            {/* Page Section */}
            <div className="section-banner w-100">
                <div className="container">
                    <div className="section-banner-content">
                        <h2>{t('activit')}</h2>
                        <ul>
                            <li>
                                <Link to="/">{t('nav.home')}</Link> &nbsp;
                            </li>
                            <li>
                                <i className="bi bi-gear fs-6 pe-2"></i>
                                {t('nav.activities')}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="blog py-5">
                <div className="container">
                    <div className="row g-4 blog-page">
                        <div className="col-12 mb-4">
                            <div className="categories-card border-0 p-3 bg-light rounded">
                                <h5 className="fw-bold mb-3">{t('categories')}</h5>
                                <ul className="list-group list-group-horizontal flex-wrap">
                                    {uniqueCategories.map(category => (
                                        <li
                                            key={category.name}
                                            className={`list-group-item border me-2 mb-2 rounded ${selectedCategory === category.name ? 'bg-primary text-white' : 'bg-white'}`}
                                            onClick={() => filterByCategory(category.name)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-asterisk me-2"></i>
                                                <span>{category.name}</span>
                                                <span className="ms-2 badge bg-secondary">{category.count}</span>
                                            </div>
                                        </li>
                                    ))}
                                    <li
                                        className={`list-group-item border me-2 mb-2 rounded ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-white'}`}
                                        onClick={() => filterByCategory('all')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-asterisk me-2"></i>
                                            <span>{t('all')}</span>
                                            <span className="ms-2 badge bg-secondary">{activities.length}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            {filteredActivities.map(activity => (
                                <div className="col-lg-12" key={activity.id}>
                                    <div className="blog-card mb-4 shadow">
                                        <img src={activity.image} className="card-img-top img-fluid" alt={activity.title} />
                                        <div className="blog-card-body p-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div className="blog-img mt-4">
                                                    <img src={blogAuthor} className="me-3" alt="Author" />
                                                </div>
                                            </div>
                                            <h3 className="card-title fw-bold mb-3">{activity.title}</h3>
                                            <p className="card-text mb-3">{activity.description}</p>
                                            <a style={{ cursor: 'pointer' }}>
                                                {activity.category} <i className="bi bi-tag-fill ms-2"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg-4">
                            <div className="recent-card">
                                <h4>{t('recentPosts')}</h4>
                                {activities.slice(0, 4).map(activity => (
                                    <div className="d-flex mb-4" key={activity.id}>
                                        <img src={activity.image} className="me-3 img-fluid" alt={activity.title} />
                                        <div>
                                            <small className="d-block">
                                                <i className="bi bi-calendar2-week me-1"></i> {new Date().toLocaleDateString()}
                                            </small>
                                            <p className="text-decoration-none">{activity.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* gallery section */}
            <section className="gallery-grid my-5 mb-0">
                <div className="row">
                    <Swiper
                        slidesPerView={5}
                        autoplay={true}
                        loop={true}
                        breakpoints={{
                            1300: { slidesPerView: 5 },
                            575: { slidesPerView: 3 },
                            0: { slidesPerView: 3 },
                        }}
                        className="gallery-swiper">
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage1} alt="gallery" data-lightbox="image-1" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage2} alt="gallery" data-lightbox="image-2" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage3} alt="gallery" data-lightbox="image-3" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage4} alt="gallery" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage5} alt="gallery" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage2} alt="gallery" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="gallery-image">
                                <img src={galleryimage3} alt="gallery" className="img-fluid w-100" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default Activities;