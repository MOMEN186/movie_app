
const StarRating = ({ rating, voteCount }) => {
  
  const stars = Math.min(5, (rating / 2)); 
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0)); 

  return (
    <div className="d-flex align-items-center">
      <div className="me-2">
        
        {Array.from({ length: fullStars }).map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
        ))}
        
        
        {hasHalfStar && <i className="bi bi-star-half text-warning"></i>}
        
        
        {Array.from({ length: emptyStars }).map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
        ))}
      </div>
      <span className="text-muted">
        {stars.toFixed(1)}/5  {voteCount?"("+voteCount+" " +"votes"+")": ""}
      </span>
    </div>
  );
};

export default StarRating;