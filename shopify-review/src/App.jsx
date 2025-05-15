import { useState, useEffect } from "react";
import { Star, X, Upload } from "lucide-react";
import styles from "./App.module.css";
import Stars from "./Stars.jsx";
import { useProductRating } from "./hooks/useRating.jsx";
import CustomerReviews from "./components/CustomerRatings.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import ReviewComments from "./components/ReviewsComments/ReviewsComments.jsx";

export default function CookieReviewWidget() {
   const [showReviewModal, setShowReviewModal] = useState(false);
   const [reviewFormData, setReviewFormData] = useState({
      name: "",
      email: "",
      title: "",
      content: "",
      rating: 0,
   });
   const [reviews, setReviews] = useState([
      {
         id: 1,
         author: "Sebastian Smith",
         date: "13/01/2024",
         rating: 5,
         title: "Amazing taste",
         content: "Really like the peanut butter cookies",
         image: "/api/placeholder/80/80",
         helpfulVotes: 0,
         unhelpfulVotes: 0,
      },
      {
         id: 2,
         author: "Sebastian Smith",
         date: "12/01/2024",
         rating: 5,
         title: "Mom's Favorite",
         content:
            "Super soft tasty cookies. To die for. Were so yummy. Fast shipping. Gone in 1 day. Will definitely buy again!",
         helpfulVotes: 0,
         unhelpfulVotes: 0,
      },
   ]);

   const handleRatingClick = (rating) => {
      setReviewFormData({ ...reviewFormData, rating });
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setReviewFormData({ ...reviewFormData, [name]: value });
   };

   const handleSubmitReview = () => {
      // Validate form data
      if (
         !reviewFormData.name ||
         !reviewFormData.email ||
         !reviewFormData.rating ||
         !reviewFormData.title ||
         !reviewFormData.content
      ) {
         return;
      }

      // Create new review
      const newReview = {
         id: reviews.length + 1,
         author: reviewFormData.name,
         date: new Date().toLocaleDateString(),
         rating: reviewFormData.rating,
         title: reviewFormData.title,
         content: reviewFormData.content,
         helpfulVotes: 0,
         unhelpfulVotes: 0,
      };

      // Add to reviews array
      setReviews([newReview, ...reviews]);

      // Update rating counts
      setRatingCounts({
         ...ratingCounts,
         [reviewFormData.rating]:
            (ratingCounts[reviewFormData.rating] || 0) + 1,
      });

      // Update total reviews count
      setTotalReviews(totalReviews + 1);

      // Reset form and close modal
      setReviewFormData({
         name: "",
         email: "",
         title: "",
         content: "",
         rating: 0,
      });
      setShowReviewModal(false);
   };

   const handleHelpfulVote = (reviewId, isHelpful) => {
      setReviews(
         reviews.map((review) => {
            if (review.id === reviewId) {
               return {
                  ...review,
                  helpfulVotes: isHelpful
                     ? review.helpfulVotes + 1
                     : review.helpfulVotes,
                  unhelpfulVotes: !isHelpful
                     ? review.unhelpfulVotes + 1
                     : review.unhelpfulVotes,
               };
            }
            return review;
         })
      );
   };

   //! DO NOT DELETE THIS FUNCTION
   const { averageRating, totalVotes } = useProductRating({
      r5: 102,
      r4: 10,
      r3: 1,
      r2: 0,
      r1: 0,
   });

   const handleRatingChange = (starLevel, value) => {
      const numValue = value === "" ? 0 : parseInt(value, 10);
      setRatings((prev) => ({
         ...prev,
         [`r${starLevel}`]: isNaN(numValue) ? 0 : numValue,
      }));
   };

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

   return (
      <div className={styles.container}>
         <ProductDetails />

         {/* Reviews Section */}
         <div className={styles.reviewsSection}>
            <CustomerReviews />

            {/* Review List */}
            <div className={styles.reviewsList}>
               <ReviewComments />
            </div>
         </div>
      </div>
   );
}
