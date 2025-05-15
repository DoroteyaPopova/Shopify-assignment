import { useState } from "react";
import "./CustomerRatings.css";
import { useProductRating } from "../hooks/useRating";
import ReviewModal from "./ReviewWindow/ReviewModal";

const CustomerReviews = () => {
   // State for modal visibility
   const [isModalOpen, setIsModalOpen] = useState(false);

   // Sample data - in a real app, this would come from an API or props
   const [reviewsData, setReviewsData] = useState({
      r5: 102,
      r4: 10,
      r3: 1,
      r2: 0,
      r1: 0,
   });

   const { averageRating, totalVotes } = useProductRating(reviewsData);

   // Function to render stars
   const renderStars = (numStars, maxRating = 5) => {
      const stars = [];
      for (let i = 0; i < maxRating; i++) {
         stars.push(
            <span
               key={i}
               className={`star ${i < numStars ? "filled" : "empty"}`}
            >
               ★
            </span>
         );
      }
      return stars;
   };

   // Calculate percentage width for progress bars
   const getProgressWidth = (count) => {
      return totalVotes > 0 ? (count / totalVotes) * 100 : 0;
   };

   // Open the review modal
   const handleOpenModal = () => {
      setIsModalOpen(true);
   };

   // Close the review modal
   const handleCloseModal = () => {
      setIsModalOpen(false);
   };

   // Handle form submission from the modal
   const handleSubmitReview = (reviewData) => {
      console.log("Review submitted:", reviewData);

      // In a real app, you would send this data to your backend
      // For now, let's just update our local state as an example
      if (reviewData.rating > 0) {
         const ratingKey = `r${reviewData.rating}`;
         setReviewsData((prev) => ({
            ...prev,
            [ratingKey]: prev[ratingKey] + 1,
         }));
      }

      // Close the modal
      setIsModalOpen(false);
   };

   return (
      <div className="customer-reviews">
         <h2 className="reviews-title">Customer reviews</h2>

         <div className="reviews-container">
            {/* Left side - overall rating */}
            <div className="overall-rating">
               <div className="stars-container">
                  {renderStars(averageRating)}
                  <span className="rating-value">
                     {averageRating.toFixed(1)}
                  </span>
               </div>
               <p className="review-count">Based on {totalVotes} reviews</p>
            </div>

            {/* Middle section - rating breakdown */}
            <div className="rating-breakdown">
               {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="rating-row">
                     <div className="star-label">{renderStars(star)}</div>
                     <div className="progress-container">
                        <div
                           className="progress-bar"
                           style={{
                              width: `${getProgressWidth(
                                 reviewsData[`r${star}`]
                              )}%`,
                           }}
                        ></div>
                        <div className="progress-background"></div>
                     </div>
                     <span className="vote-count">
                        {reviewsData[`r${star}`]}
                     </span>
                  </div>
               ))}
            </div>

            {/* Right side - leave review button */}
            <div className="review-action">
               <button className="leave-review-btn" onClick={handleOpenModal}>
                  Leave a review
               </button>
            </div>
         </div>

         {/* Sort options */}
         {/* <div className="sort-options">
            <span className="sort-label">Sort by:</span>
            <div className="sort-dropdown">
               <span className="selected-sort">Highest Rating</span>
               <span className="dropdown-arrow">▼</span>
            </div>
         </div>

         <hr className="divider" /> */}

         {/* Review Modal */}
         <ReviewModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitReview}
         />
      </div>
   );
};

export default CustomerReviews;
