import React, { useState, useEffect, useRef } from 'react';
import img1 from '../images/Event Images/img1.jpeg';
import img2 from '../images/Event Images/img2.jpeg';
import img3 from '../images/Event Images/img3.jpeg';
import img4 from '../images/Event Images/img4.jpeg';
import img5 from '../images/Event Images/img5.jpeg';
import img6 from '../images/Event Images/img6.jpeg';
import img7 from '../images/Event Images/img7.jpeg';

const Hackethon = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [showSlider, setShowSlider] = useState(false);
    const containerRef = useRef(null);
    
    const images = [img1, img2, img3, img4, img5, img6, img7];

    const imageSources = React.useMemo(() => images.map(img => ({ webp: img, fallback: img })), [images]);

    // Texts to cycle through
    const sliderTexts = [
        {
            title: 'Hackethon Highlights',
            desc: 'Experience the energy, creativity, and teamwork from our recent events. Each moment captured here is a story of innovation and fun!'
        },
        {
            title: 'Teamwork in Action',
            desc: 'Our hackathons bring students together to solve real-world problems, fostering collaboration and leadership.'
        },
        {
            title: 'Innovation Unleashed',
            desc: 'See how young minds turn ideas into reality with code, design, and determination.'
        },
        {
            title: 'Celebrating Success',
            desc: 'Every project, big or small, is a step forward. We celebrate every achievement and learning moment!'
        }
    ];
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % sliderTexts.length);
        }, 3000);
        return () => clearInterval(textInterval);
    }, [sliderTexts.length]);

    useEffect(() => {
        if (!isAutoPlaying || isDragging) return;
       
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // changed from 1200 to 3000

        return () => clearInterval(interval);
    }, [images.length, isAutoPlaying, isDragging]);

    useEffect(() => {
        const t = setTimeout(() => setShowSlider(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX || e.touches?.[0].clientX);
        setIsAutoPlaying(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const currentX = e.clientX || e.touches?.[0].clientX;
        const diff = currentX - startX;
        setTranslateX(diff);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        
        if (Math.abs(translateX) > 100) {
            if (translateX > 0) {
                setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            } else {
                setCurrentIndex((prev) => (prev + 1) % images.length);
            }
        }
        
        setTranslateX(0);
        setTimeout(() => setIsAutoPlaying(true), 2000);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 2000);
    };

    const getSlideStyle = (index) => {
        const diff = index - currentIndex;
        const absIndex = Math.abs(diff);
        
        let transform = '';
        let zIndex = images.length - absIndex;
        let opacity = 1;
        let scale = 1;
        
        if (diff === 0) {
            transform = `translateX(${translateX}px) translateZ(0) rotateY(0deg) scale(1.1)`;
            zIndex = images.length + 1;
            scale = 1.1;
        } else if (diff === -1 || (diff === images.length - 1)) {
            transform = `translateX(${300 + translateX}px) translateZ(-200px) rotateY(-35deg) scale(0.8)`;
            opacity = 0.7;
            scale = 0.8;
        } else if (diff === 1 || (diff === -(images.length - 1))) {
            transform = `translateX(${-300 + translateX}px) translateZ(-200px) rotateY(35deg) scale(0.8)`;
            opacity = 0.7;
            scale = 0.8;
        } else if (absIndex === 2) {
            const side = diff > 0 ? -1 : 1;
            transform = `translateX(${side * 500 + translateX}px) translateZ(-400px) rotateY(${side * 50}deg) scale(0.6)`;
            opacity = 0.4;
            scale = 0.6;
        } else {
            const side = diff > 0 ? -1 : 1;
            transform = `translateX(${side * 700 + translateX}px) translateZ(-600px) rotateY(${side * 65}deg) scale(0.4)`;
            opacity = 0.2;
            scale = 0.4;
        }

        return {
            transform,
            zIndex,
            opacity,
            scale,
        };
    };

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center my-30 p-8 overflow-hidden relative">
            {/* Central heading */}
            <div className="w-full flex justify-center items-center absolute top-8 left-0 z-40">
                <h2 className="text-4xl font-bold text-center mb-20 text-[#1a237e]" style={{fontFamily: 'system-ui, sans-serif'}}>
                    Events We Conducted
                </h2>
            </div>
            {/* Left-side text slider with white background, more content, and badge-style button */}
            <div className="flex flex-col items-start justify-center w-full md:w-1/3 mb-10 md:mb-0 md:mr-8 z-30 mt-24 md:mt-0" style={{ minHeight: '420px' }}>
                <div className="bg-white rounded-2xl p-8 max-w-xs w-full text-[#1a237e] shadow-2xl transition-all duration-700 flex flex-col gap-6 h-full">
                    <h3 className="text-3xl font-bold mb-2 text-[#54F4B9]">{sliderTexts[textIndex].title}</h3>
                    <p className="text-lg font-medium mb-2">{sliderTexts[textIndex].desc}</p>
                    <ul className="list-disc pl-5 text-base text-[#1a237e] mb-4 space-y-2">
                        <li>Real-world coding challenges</li>
                        <li>Teamwork & collaboration</li>
                        <li>Exciting prizes & recognition</li>
                        <li>Mentorship from industry experts</li>
                    </ul>
                    <div className="text-base text-[#1a237e] mb-4">
                        <p>Our hackathons inspire, challenge, and connect you with a vibrant tech community. Join us and turn your ideas into reality!</p>
                    </div>
                    {/* Badge-style button below content */}
                    <div className="w-full flex justify-start mt-2">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1a237e] to-[#54F4B9] text-white rounded-full border-2 border-[#1a237e] px-4 py-1.5 text-base sm:text-lg font-semibold shadow-lg tracking-wide animate-pulse cursor-pointer hover:scale-105 transition-transform">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                            Dive into Hackethon
                        </span>
                    </div>
                </div>
            </div>
            {/* Image slider with dynamic blurred background, centered cards */}
            <div className="relative w-full md:w-2/3 flex flex-col items-center justify-center" style={{marginLeft: 'auto', minHeight: 500}}>
                <div
                    className="absolute inset-0 -z-10 transition-all duration-700 rounded-2xl"
                    style={{
                        background: `url(${images[currentIndex]}) center/cover no-repeat`,
                        filter: 'blur(5px) brightness(0.75)',
                        opacity: 0.85,
                    }}
                />
                <h2 className="text-4xl font-bold text-white text-center mb-12 relative z-10" style={{fontFamily: 'system-ui, sans-serif', minHeight: '2.5em'}}>
                    
                </h2>
                <div className="w-full max-w-4xl flex flex-col  justify-center" style={{height: 400, position: 'relative'}}>
                    {showSlider ? (
                        <>
                            <div 
                                ref={containerRef}
                                className="slider-container flex items-center justify-center"
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleMouseDown}
                                onTouchMove={handleMouseMove}
                                onTouchEnd={handleMouseUp}
                                style={{ cursor: isDragging ? 'grabbing' : 'grab', position: 'relative', zIndex: 1, height: '100%', alignItems: 'center', display: 'flex' }}
                            >
                                {imageSources.map((image, index) => {
                                    const slideStyle = getSlideStyle(index);
                                    // Reduce scale for all cards
                                    let newTransform = slideStyle.transform.replace(/scale\([^)]*\)/, (m) => {
                                        const scaleVal = parseFloat(m.match(/scale\(([^)]*)\)/)[1]);
                                        return `scale(${(scaleVal * 0.8).toFixed(2)})`;
                                    });
                                    return (
                                        <div
                                            key={index}
                                            className="slide"
                                            style={{
                                                ...slideStyle,
                                                transform: newTransform,
                                            }}
                                            onClick={() => index !== currentIndex && goToSlide(index)}
                                        >
                                            <div className="card-container bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center" style={{ width: 400, height: 260, border: 'none' }}>
                                                <picture>
                                                    <source srcSet={image.webp} type="image/webp" />
                                                    <img 
                                                        src={image.fallback}
                                                        alt={`Slide ${index + 1}`}
                                                        className="card-image rounded-xl"
                                                        draggable={false}
                                                        width={380}
                                                        height={240}
                                                        loading={index === 0 ? undefined : "lazy"}
                                                        decoding="async"
                                                        style={{ aspectRatio: '380/240', objectFit: 'cover' }}
                                                    />
                                                </picture>
                                                <div className="card-overlay">
                                                    <h3 className="card-title">Imagino 2025 </h3>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {/* Navigation dots */}
                            <div className="flex justify-center mt-8 space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentIndex 
                                                ? 'bg-black scale-125' 
                                                : 'bg-gray-300 hover:bg-green-500'
                                        }`}
                                        onClick={() => goToSlide(index)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ width: '100%', height: 300, background: 'linear-gradient(145deg, #e6fcf3, #54F4B9)', borderRadius: 24, marginBottom: 24 }} />
                    )}
                </div>
            </div>
            <style jsx>{`
                .slider-container {
                    position: relative;
                    height: 400px;
                    perspective: 1000px;
                    transform-style: preserve-3d;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .slide {
                    position: absolute;
                    width: 350px;
                    height: 400px;
                    transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
                    transform-style: preserve-3d;
                    cursor: pointer;
                }

                .slide:hover {
                    transform-style: preserve-3d;
                }

                .card-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 
                        0 35px 60px -12px rgba(0, 0, 0, 0.6),
                        0 0 0 2px rgba(0, 0, 0, 0.4),
                        0 25px 50px -12px rgba(0, 0, 0, 0.8);
                    transition: all 0.3s ease;
                    background: linear-gradient(145deg, #1e1e2e, #2a2a3a);
                    transform-style: preserve-3d;
                    transform: translateY(-10px);
                }

                .slide:hover .card-container {
                    /* No additional effect needed, already applied by default */
                }

                .card-image {
                    width: 100%;
                    height: 70%;
                    object-fit: cover;
                    border-radius: 20px 20px 0 0;
                    transition: transform 0.3s ease;
                    user-select: none;
                    transform: scale(1.05);
                }

                .slide:hover .card-image {
                    /* No additional effect needed, already applied by default */
                }

                .card-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 30%;
                    background: linear-gradient(
                        to top,
                        rgba(0, 0, 0, 0.9),
                        rgba(0, 0, 0, 0.7),
                        transparent
                    );
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }

                .card-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 8px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                }

                .card-description {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                }

                /* Responsive design */
                @media (max-width: 768px) {
                    .slide {
                        width: 280px;
                        height: 350px;
                    }
                    
                    .card-title {
                        font-size: 1.25rem;
                    }
                    
                    .card-description {
                        font-size: 0.8rem;
                    }
                }

                @media (max-width: 480px) {
                    .slide {
                        width: 250px;
                        height: 320px;
                    }

                    .slider-container {
                        height: 350px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hackethon;