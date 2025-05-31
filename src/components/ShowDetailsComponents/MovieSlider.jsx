import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Style/MovieSlider.css'

const MovieSlider = ({ recommendations }) => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Group films into chunks of 6
  const chunkSize = 6;
  const filmGroups = [];
  if (recommendations?.results) {
    for (let i = 0; i < recommendations.results.length; i += chunkSize) {
      filmGroups.push(recommendations.results.slice(i, i + chunkSize));
    }
  }

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Custom arrow components
  const CustomPrevArrow = ({ onClick }) => (
    <div 
      className="carousel-arrow carousel-arrow-left"
      onClick={onClick}
      style={{
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <FaChevronLeft size={24} />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div 
      className="carousel-arrow carousel-arrow-right"
      onClick={onClick}
      style={{
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <FaChevronRight size={24} />
    </div>
  );

  return (
    <div 
      className="slider-container" 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '3em',
        margin: '.5em 0'
      }}
    >
      <h4 className="mb-5">Movies You May Like</h4>
      <CustomPrevArrow onClick={() => handleSelect(index - 1 < 0 ? filmGroups.length - 1 : index - 1)} />
      
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect} 
        indicators={false}
        controls={false}
        interval={null}
      >
        {filmGroups.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="row" style={{ margin: '0 -0.5em' }}>
              {group.map((result) => (
                <div className="col-md-2 col-sm-4 col-6" key={result.id} style={{ padding: '0 0.5em' }}>
                  <Link to={`/movie/${result.id}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w1280/${result.poster_path}`}
                      className="img-fluid"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        marginBottom: '0.5em',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      alt={result.title}
                    />
                  </Link>
                  <div style={{ padding: '0 0.5em' }}>
                    <b className="d-block text-truncate">{result.title}</b>
                    <small className="text-muted">{result.release_date?.substring(0, 4)}</small>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <CustomNextArrow onClick={() => handleSelect((index + 1) % filmGroups.length)} />

      
    </div>
  );
};

export default MovieSlider;