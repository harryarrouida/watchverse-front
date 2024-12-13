import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const [imageSrc, setImageSrc] = useState('placeholder.jpg');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
        };
    }, [src]);

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={`${className} ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            loading="lazy"
        />
    );
};

export default LazyImage; 