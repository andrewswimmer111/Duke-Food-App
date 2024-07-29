import { useState } from "react";
import React, { CSSProperties } from 'react';

interface Props {
  slides: { url: string }[]
}

function Slideshow({ slides }: Props) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles: CSSProperties = {
    height: '100%',
    position: 'relative',
  };
  const slideStyles: CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 1.5s',
  };
  const activeSlideStyles: CSSProperties = {
    ...slideStyles,
    opacity: 1,
    zIndex: 1,
  };
  const inactiveSlideStyles: CSSProperties = {
    ...slideStyles,
    opacity: 0,
    zIndex: 0,
  };
  const leftArrowStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    left: '32px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 2,
    cursor: 'pointer'
  };
  const rightArrowStyles: CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    right: '32px',
    fontSize: '45px',
    color: '#fff',
    zIndex: 2,
    cursor: 'pointer'
  };
  const dotContainerStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };
  const dotStyles: CSSProperties = {
    margin: '0 30px',
    cursor: 'pointer',
    fontSize: '20px',
  };

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }
  const goToSlide = (slide: number) => {
    setCurrentIndex(slide);
  }

  return (
    <>
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrev}> ❰ </div>
      <div style={rightArrowStyles} onClick={goToNext}> ❱ </div>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={currentIndex === index ? activeSlideStyles : inactiveSlideStyles}
          aria-hidden={currentIndex !== index}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '10px',
            }}
          />
        </div>
      ))}
      </div>
      <div style={dotContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} style={dotStyles} onClick={() => goToSlide(slideIndex)}>
            ●
          </div>
        ))}
    </div>
    </>
  );
}

export default Slideshow;
