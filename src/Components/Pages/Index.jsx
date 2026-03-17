import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Navigation, EffectFade } from 'swiper/modules';
import btnArrow from '././../../assets/btn-arrow.svg'
import plane from '././../../assets/raftico.svg'
import Destination from './../../Destination.json';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import steps1 from './../../assets/steps-1.svg'
import steps2 from './../../assets/steps-2.svg'
import steps3 from './../../assets/steps-3.svg'
import FeatureImg1 from './../../assets/Feature-image-1.webp'
import testBG from './../../assets/test-bg.webp'
import { Link } from 'react-router-dom';
import { motion } from "motion/react"
import Footer from '../../Components/Footer/Footer';
import discoverData from '../../AfisDesination.json';
import comment from '../../Comment.json';
import LanguageSwitcher from '../LanguageSwitcher';

function Index() {
    const { t, i18n } = useTranslation();
    const destinationsRef = React.useRef(null);
    const [modalImage, setModalImage] = useState(null);
    const getPublicAssetUrl = (path) => encodeURI(`${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`);
    const whatsappBaseUrl = 'https://wa.me/905331530229';

    const comboSectionContent = {
        tr: {
            badge: '4LU COMBO',
            title: 'Buyuk Macera Kartlari',
            description: 'Ingilizce, Turkce ve Almanca afisler ile 4 farkli deneyimi tek alanda inceleyin.'
        },
        en: {
            badge: '4-IN-1 COMBO',
            title: 'Large Adventure Cards',
            description: 'Review four experiences in one place with English, Turkish, and German visuals.'
        },
        de: {
            badge: '4ER KOMBO',
            title: 'Grosse Abenteuerkarten',
            description: 'Sehen Sie vier Erlebnisse in einem Bereich mit englischen, turkischen und deutschen Bildern.'
        }
    };

    const comboCards = [
        {
            id: 'combo-4-plus-1',
            images: {
                tr: 'Images/Afis/tr/tazı_xtreme_tr_4&1.jpeg',
                en: 'Images/Afis/en/tazı_xtreme_en_4&1.jpeg',
                de: 'Images/Afis/de/tazı_xtreme_de_4&1.jpeg'
            },
            translations: {
                tr: {
                    chip: '4+1 COMBO',
                    title: '4+1 Tazi Xtreme Combo',
                    description: 'Aktiviteleri tek afiste karsilastirip en iyi paketi hizli secin.'
                },
                en: {
                    chip: '4+1 COMBO',
                    title: '4+1 Tazi Xtreme Combo',
                    description: 'Compare experiences in one poster and pick the best package quickly.'
                },
                de: {
                    chip: '4+1 KOMBO',
                    title: '4+1 Tazi Xtreme Kombi',
                    description: 'Vergleichen Sie Erlebnisse auf einem Poster und wahlen Sie schnell das beste Paket.'
                }
            }
        },
        {
            id: 'combo-5-plus-1',
            images: {
                tr: 'Images/Afis/tr/adventure_day_tazı_tr_5&1.jpeg',
                en: 'Images/Afis/en/adventure_day_tazı_en_5&1.jpeg',
                de: 'Images/Afis/de/adventure_day_tazı_de_5&1.jpeg'
            },
            translations: {
                tr: {
                    chip: '5+1 COMBO',
                    title: '5+1 Adventure Day Combo',
                    description: 'Aktiviteleri tek afiste karsilastirip en iyi paketi hizli secin.'
                },
                en: {
                    chip: '5+1 COMBO',
                    title: '5+1 Adventure Day Combo',
                    description: 'Compare experiences in one poster and pick the best package quickly.'
                },
                de: {
                    chip: '5+1 KOMBO',
                    title: '5+1 Adventure Day Kombi',
                    description: 'Vergleichen Sie Erlebnisse auf einem Poster und wahlen Sie schnell das beste Paket.'
                }
            }
        },
        {
            id: 'combo-6-plus-1',
            images: {
                tr: 'Images/Afis/tr/all_in_tazı_tr_6&1.jpeg',
                en: 'Images/Afis/en/all_in_tazı_en_6&1.jpeg',
                de: 'Images/Afis/de/all_in_tazı_de_6&1.jpeg'
            },
            translations: {
                tr: {
                    chip: '6+1 COMBO',
                    title: '6+1 All In Combo',
                    description: 'Aktiviteleri tek afiste karsilastirip en iyi paketi hizli secin.'
                },
                en: {
                    chip: '6+1 COMBO',
                    title: '6+1 All In Combo',
                    description: 'Compare experiences in one poster and pick the best package quickly.'
                },
                de: {
                    chip: '6+1 KOMBO',
                    title: '6+1 All In Kombi',
                    description: 'Vergleichen Sie Erlebnisse auf einem Poster und wahlen Sie schnell das beste Paket.'
                }
            }
        }
    ];

    const currentLanguage = useMemo(() => (i18n.language || 'en').split('-')[0], [i18n.language]);
    const defaultLanguage = useMemo(() => ['tr', 'en', 'de'].includes(currentLanguage) ? currentLanguage : 'en', [currentLanguage]);
    const destinationLanguage = useMemo(() => ['tr', 'en', 'ru'].includes(currentLanguage) ? currentLanguage : 'en', [currentLanguage]);
    const heroLanguage = useMemo(() => ['tr', 'en', 'ru', 'de'].includes(currentLanguage) ? currentLanguage : 'en', [currentLanguage]);
    const selectedComboSection = useMemo(() => comboSectionContent[defaultLanguage] || comboSectionContent.en, [defaultLanguage]);

    const buildWhatsappLink = (text) => `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;

    const createComboWhatsappMessage = (comboTitle) => {
        const messages = {
            tr: `Merhaba, ${comboTitle} paketi icin fiyat ve rezervasyon bilgisi almak istiyorum.`,
            en: `Hello, I would like pricing and reservation details for the ${comboTitle} package.`,
            de: `Hallo, ich moechte Preis- und Reservierungsinformationen fuer das Paket ${comboTitle} erhalten.`
        };

        return messages[defaultLanguage] || messages.en;
    };

    const createActivityWhatsappMessage = (activityName) => {
        const messages = {
            tr: `Merhaba, ${activityName} aktivitesi icin rezervasyon yapmak istiyorum.`,
            en: `Hello, I want to make a reservation for ${activityName}.`,
            ru: `Здравствуйте, хочу забронировать активность: ${activityName}.`
        };

        return messages[destinationLanguage] || messages.en;
    };

    const createHeroWhatsappMessage = (buttonLabel) => {
        const messages = {
            tr: `Merhaba, ${buttonLabel} secenegi icin bilgi ve rezervasyon almak istiyorum.`,
            en: `Hello, I would like information and reservation details for ${buttonLabel}.`,
            ru: `Здравствуйте, я хочу получить информацию и детали бронирования по опции ${buttonLabel}.`,
            de: `Hallo, ich moechte Informationen und Reservierungsdetails fuer die Option ${buttonLabel} erhalten.`
        };

        return messages[heroLanguage] || messages.en;
    };

    const openHeroWhatsapp = (buttonLabel) => {
        const link = buildWhatsappLink(createHeroWhatsappMessage(buttonLabel));
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    const comboReservationLabel = {
        tr: 'REZERVASYON',
        en: 'RESERVATION',
        de: 'RESERVIERUNG'
    }[defaultLanguage] || 'RESERVATION';

    return (
        <>
            <div className="position-fixed top-0 end-0 m-3 z-3">
                <LanguageSwitcher />
            </div>
            {/* Hero Slider */}
            <Swiper
                modules={[Navigation, EffectFade]}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={true}
                effect={"fade"}
                navigation={{
                    prevEl: '.swiper-prev',
                    nextEl: '.swiper-next',
                }}
                className='overflow-hidden'
            >
                <SwiperSlide>
                    <div className="hero hero1 d-flex flex-column justify-content-center align-items-center">
                        <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center text-center">                            <h1 className='text-white'>MC Raft</h1>
                            <h2 className="text-white">{t('hero.slide1.title')}</h2>
                            <p className="text-white fs-5">{t('hero.slide1.description')}</p>
                            <button onClick={() => openHeroWhatsapp(t('explore'))} className="btn text-white hero-btn mt-4">{t('explore')} <img src={btnArrow} className="img-fluid ms-2" alt="" /></button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="hero hero2 d-flex flex-column justify-content-center align-items-center">
                        <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center text-center">
                            <h1 className='text-white'>MC Raft</h1>
                            <h2 className="text-white">{t('hero.slide2.title')}</h2>
                            <p className="text-white fs-5">{t('hero.slide2.description')}</p>
                            <button onClick={() => openHeroWhatsapp(t('viewTour'))} className="btn text-white hero-btn mt-4">{t('viewTour')} <img src={btnArrow} className="img-fluid ms-2" alt="" /></button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="hero hero3 d-flex flex-column justify-content-center align-items-center">
                        <div className="hero-content w-100 d-flex flex-column justify-content-center align-items-center text-center">
                            <h1 className='text-white'>MC Raft</h1>
                            <h2 className="text-white">{t('hero.slide3.title')}</h2>
                            <p className="text-white fs-5">{t('hero.slide3.description')}</p>
                            <button onClick={() => openHeroWhatsapp(t('viewDetails'))} className="btn text-white hero-btn mt-4">{t('viewDetails')} <img src={btnArrow} className="img-fluid ms-2" alt="" /></button>
                        </div>
                    </div>
                </SwiperSlide>


                <i className="bi bi-arrow-left-short swiper-btn swiper-prev"></i>
                <i className="bi bi-arrow-right-short swiper-btn swiper-next"></i>
            </Swiper>
            {/* Destinations */}            <div className="destinations py-5 my-5" ref={destinationsRef}>
                <motion.div className="section-title"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="text-center flex-column d-flex align-items-center justify-content-center gap-3">                        <span>{t('destinations.subtitle')}</span>
                        <div className=" d-flex align-items-center gap-2">
                            <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                            <h2>{t('destinations.title')}</h2>
                            <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                        </div>
                        <p>{t('destinations.description')}</p>
                    </div>
                </motion.div>
                <motion.div className="destinations-wrapper mt-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Splide
                        hasTrack={false}
                        options={{
                            type: 'loop',
                            drag: 'free',
                            focus: 'center',
                            gap: 50,
                            perPage: 3,
                            arrows: false,
                            pagination: false,
                            autoScroll: {
                                speed: 1,
                                autoStart: true,
                            },
                            breakpoints: {
                                1199: { perPage: 3 },
                                991: { perPage: 2 },
                                767: { perPage: 2 },
                                575: { perPage: 1 },
                                0: { perPage: 1 },
                            },
                        }}

                        extensions={{ AutoScroll }}
                    >
                        <SplideTrack>                            {Destination.map(dest => {
                            const selectedDestinationTranslation = dest.translations?.[destinationLanguage] || dest.translations?.en;
                            if (!selectedDestinationTranslation) return null;
                            const destinationWhatsappLink = buildWhatsappLink(createActivityWhatsappMessage(selectedDestinationTranslation.name));
                            const destinationBuyLabel = dest.buy?.[destinationLanguage] || dest.buy?.en;
                            const destinationDayLabel = dest.days?.[destinationLanguage] || dest.days?.en;

                            return (
                                <SplideSlide key={dest.id}>
                                    <div className="dest-card position-relative">                                        <div className="dest-img overflow-hidden rounded">
                                            <img src={selectedDestinationTranslation.image} className='img-fluid' alt={selectedDestinationTranslation.name} loading="lazy" decoding="async" />
                                            <a 
                                                href={destinationWhatsappLink}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="dest-price position-absolute top-0 end-0"
                                            >
                                                {destinationBuyLabel}
                                            </a>
                                        </div>
                                        <div className="dest-content p-4 rounded border top-0 start-0 mt-3 position-absolute">
                                            <a
                                                href={destinationWhatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="dest-arrow position-absolute"
                                                aria-label={destinationBuyLabel}
                                            >
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </a>
                                            <a
                                                href={destinationWhatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-decoration-none text-reset"
                                            >
                                                <h2>{selectedDestinationTranslation.name}</h2>
                                            </a>
                                            <a
                                                href={destinationWhatsappLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-decoration-none text-reset"
                                            >
                                                <p>{selectedDestinationTranslation.pere}</p>
                                            </a>
                                            <div className="dest-day border-top pt-3">
                                                <i className="bi bi-send-fill me-2"></i>
                                                <span>{destinationDayLabel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                            );
                        })}
                        </SplideTrack>
                    </Splide>
                </motion.div>
            </div>
            {/* Combo Showcase */}
            <div className="discover py-5">
                <div className="container">
                    <div className="combo-showcase">
                        <div className="combo-showcase-head">
                            <div>
                                <p className="combo-eyebrow mb-2">{selectedComboSection.badge}</p>
                                <h3 className="combo-title mb-2">{selectedComboSection.title}</h3>
                                <p className="combo-subtitle mb-0">{selectedComboSection.description}</p>
                            </div>
                        </div>

                        <div className="row g-4 mt-1">
                            {comboCards.map(card => {
                                const selectedCardTranslation = card.translations[defaultLanguage] || card.translations.en;
                                const selectedCardImage = getPublicAssetUrl(card.images[defaultLanguage] || card.images.en);
                                const comboWhatsappLink = buildWhatsappLink(createComboWhatsappMessage(selectedCardTranslation.title));

                                return (
                                    <div className="col-lg-4 col-md-6 col-sm-6" key={card.id}>
                                        <article className="combo-card">
                                            <img
                                                src={selectedCardImage}
                                                alt={selectedCardTranslation.title}
                                                className="combo-card-image combo-card-image-clickable"
                                                loading="lazy"
                                                decoding="async"
                                                onClick={() => setModalImage(selectedCardImage)}
                                                onError={(event) => {
                                                    event.currentTarget.onerror = null;
                                                    event.currentTarget.src = getPublicAssetUrl(card.images.en);
                                                }}
                                            />
                                            <div className="combo-card-content">
                                                <span className="combo-card-chip">{selectedCardTranslation.chip}</span>
                                                <h4>{selectedCardTranslation.title}</h4>
                                                <p>{selectedCardTranslation.description}</p>
                                                <a 
                                                    href={comboWhatsappLink}
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="combo-reservation-btn"
                                                >
                                                    <i className="bi bi-whatsapp"></i>
                                                    {comboReservationLabel}
                                                </a>
                                            </div>
                                        </article>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* Discover */}
            <div className="discover py-5">
                <motion.div className="section-title discover-title"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="text-center flex-column d-flex align-items-center justify-content-center gap-3">                        <span>{t('discover.subtitle')}</span>
                        <div className=" d-flex align-items-center gap-2">
                            <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                            <h2>{t('discover.title')}</h2>
                            <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                        </div>
                        <p>{t('discover.description')}</p>
                    </div>
                </motion.div>
                <div className="row px-5 my-5 mx-0 gap-3 align-items-center justify-content-center">                    {discoverData.map((item, index) => {
                    const selectedDiscoverTranslation = item.translations?.[destinationLanguage] || item.translations?.en;
                    if (!selectedDiscoverTranslation) return null;

                    return (
                        <motion.div
                            key={item.id}
                            className="col-lg-2 discover-card position-relative"
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <img src={selectedDiscoverTranslation.image} className="img-fluid" alt={selectedDiscoverTranslation.name} loading="lazy" decoding="async" />
                            <div className="discover-card-content position-absolute d-flex flex-column align-items-center justify-content-center text-center">
                                <span><i className="bi bi-geo-alt-fill"></i> {selectedDiscoverTranslation.name}</span>
                                <h2 className="mt-4">{selectedDiscoverTranslation.pere}</h2>
                            </div>
                        </motion.div>
                    );
                })}
                </div>
            </div>
            {/* working Steps */}
            <div className="working py-5 position-relative">
                <img src={FeatureImg1} className='FeatureImg FeatureImg1 img-fluid position-absolute' alt="" />
                {/* <img src={FeatureImg2} className='FeatureImg FeatureImg2 img-fluid position-absolute' alt="" /> */}
                <div className="container">
                    <div className="row">
                        <div className="section-title discover-title">
                            <div className="text-start flex-column d-flex align-items-start justify-content-start gap-3">                                <span>{t('steps.section.subtitle')}</span>
                                <div className=" d-flex align-items-center gap-2">
                                    <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                                    <h2>{t('steps.section.title')}</h2>
                                    <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 gap-3">
                        <div className="col-lg-4 step-card rounded border p-4 d-flex flex-column gap-3">
                            <div className="step-img rounded">
                                <img src={steps1} className='img-fluid' alt="" />
                            </div>
                            <div className="step-content">
                                <h2>{t('steps.step1.title')}</h2>
                                <p>{t('steps.step1.description')}</p>
                            </div>
                        </div>
                        <div className="col-lg-4 step-card rounded border p-4 d-flex flex-column gap-3">
                            <div className="step-img step-img2 rounded">
                                <img src={steps2} className='img-fluid' alt="" />
                            </div>
                            <div className="step-content">
                                <h2>{t('steps.step2.title')}</h2>
                                <p>{t('steps.step2.description')}</p>
                            </div>
                        </div>
                        <div className="col-lg-4 step-card rounded border p-4 d-flex flex-column gap-3">
                            <div className="step-img step-img3 rounded">
                                <img src={steps3} className='img-fluid' alt="" />
                            </div>
                            <div className="step-content">
                                <h2>{t('steps.step3.title')}</h2>
                                <p>{t('steps.step3.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial */}
            <div className="testimonial py-5 position-relative">
                <img src={testBG} className='img-fluid test-bg-img position-absolute' alt="" />
                <img src={testBG} className='img-fluid test-bg-img2 position-absolute' alt="" />
                <div className="section-title test-title">
                    <div className="text-center flex-column d-flex align-items-center justify-content-center gap-3">                        <span>{t('testimonials.subtitle')}</span>
                        <div className=" d-flex align-items-center gap-2">
                            <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                            <h2>{t('testimonials.title')}</h2>
                            <img src={plane} alt="" className="img-fluid" style={{ width: 60, height: 60 }} />
                        </div>
                        <p>{t('testimonials.description')}</p>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <Swiper slidesPerView={1} spaceBetween={10} loop={true} className="test-Swiper">
                            {comment.map(item => (
                                <SwiperSlide key={item.id}>
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <div className="test-img d-flex align-items-center justify-content-center">
                                                <img src={item.image} className="img-fluid" alt="testimonial" loading="lazy" decoding="async" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="test-content">
                                                <img src={item.quoteImage} className="img-fluid test-content-img" alt="quote" />                                                <p className="test-pere">"{item.text[i18n.language]}"</p>
                                                <div className="test-stars">
                                                    {[...Array(item.stars)].map((_, i) => (
                                                        <i key={i} className="bi bi-star-fill"></i>
                                                    ))}
                                                </div>
                                                <div className="test-user mt-3 d-flex align-items-center gap-2">
                                                    <img src={item.user.avatar} className="img-fluid" alt={item.user.name} loading="lazy" decoding="async" />
                                                    <div className="test-user-info">
                                                        <h3>{item.user.name}</h3>
                                                        <p className="m-0">{item.user.info[i18n.language]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            {/* Image Modal */}
            {modalImage && (
                <div className="combo-modal" onClick={() => setModalImage(null)}>
                    <div className="combo-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="combo-modal-close" onClick={() => setModalImage(null)}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                        <img src={modalImage} alt="Combo Card" className="combo-modal-image" />
                    </div>
                </div>
            )}
            {/* Footer */}
            <Footer />
        </>
    )
}

export default Index