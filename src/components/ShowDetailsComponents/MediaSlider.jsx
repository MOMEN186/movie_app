import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Style/MediaSlider.css';

const MediaSlider = ({ recommendations, mediaType, title }) => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Group items into chunks of 6
  const chunkSize = 6;
  const itemGroups = [];
  if (recommendations?.results) {
    for (let i = 0; i < recommendations.results.length; i += chunkSize) {
      itemGroups.push(recommendations.results.slice(i, i + chunkSize));
    }
  }

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Custom arrows (appear on hover)
  const CustomPrevArrow = ({ onClick }) => (
    <div
      className="carousel-arrow carousel-arrow-left"
      onClick={onClick}
      style={{
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
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
        transition: 'opacity 0.3s ease',
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
        margin: '.5em 0',
      }}
    >
      <h4 className="mb-4">{title}</h4>

      <CustomPrevArrow
        onClick={() =>
          handleSelect(index - 1 < 0 ? itemGroups.length - 1 : index - 1)
        }
      />

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
        interval={null}
      >
        {itemGroups.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="row" style={{ margin: '0 -0.5em' }}>
              {group.map((item) => (
                <div
                  className="col-md-2 col-sm-4 col-6"
                  key={item.id}
                  style={{ padding: '0 0.5em' }}
                >
                  <Link to={`/${mediaType}/${item.id}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w1280/${item.poster_path}`}
                      className="img-fluid"
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        marginBottom: '0.5em',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.05)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = 'scale(1)')
                      }
                      alt={item.title || item.name}
                    />
                  </Link>
                  <div style={{ padding: '0 0.5em' }}>
                    <b className="d-block text-truncate">
                      {item.title || item.name}
                    </b>
                    <small className="text-muted">
                      {(item.release_date || item.first_air_date)?.substring(
                        0,
                        4
                      )}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <CustomNextArrow
        onClick={() => handleSelect((index + 1) % itemGroups.length)}
      />
    </div>
  );
};

export default MediaSlider;
