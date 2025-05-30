import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import './TvShowReview.css';

const TvShowReview = ({ reviews }) => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  console.log(reviews)

  // Group reviews into chunks of 4
  const chunkSize = 4;
  const reviewGroups = [];
  if (reviews?.results) {
    for (let i = 0; i < reviews.results.length; i += chunkSize) {
      reviewGroups.push(reviews.results.slice(i, i + chunkSize));
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
      className="reviews-slider-container" 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '0 3em',
        margin: '2em 0'
      }}
    >
      <h4 className="mb-4">User Reviews</h4>
      
      <CustomPrevArrow onClick={() => handleSelect(index - 1 < 0 ? reviewGroups.length - 1 : index - 1)} />
      
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect} 
        indicators={false}
        controls={false}
        interval={null}
      >
        {reviewGroups.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>
            <div className="row" style={{ margin: '0 -0.5em' }}>
              {group.map((result) => (
                <div className="col-md-3 col-sm-6 col-12" key={result.id} style={{ padding: '0 0.5em' }}>
                  <div className="review-card">
                    {/* Avatar Section */}
                    <div className="review-avatar">
                      {result.author_details.avatar_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w64_and_h64_face${result.author_details.avatar_path}`} 
                          alt={result.author_details.username}
                          className="avatar-image"
                        />
                      ) : (
                        <i className="bi bi-person-circle avatar-fallback"></i>
                      )}
                      <span className="review-username">{result.author_details.username}</span>
                    </div>

                    {/* Rating Section */}
                    <div className="review-rating">
                      <StarRating rating={result.author_details.rating} />
                      <span className="review-date">
                        {new Date(result.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="review-content">
                      <p>
                        {result.content.length > 150 
                          ? `${result.content.substring(0, 150)}...` 
                          : result.content}
                      </p>
                      <Link to={result.url} className="review-link">
                        Read full review
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <CustomNextArrow onClick={() => handleSelect((index + 1) % reviewGroups.length)} />


    </div>
  );
};

export default TvShowReview;