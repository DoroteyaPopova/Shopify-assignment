import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./ReviewComments.css";

// Sample review data - in a real app, you would fetch this from an API
const reviewsData = [
   {
      id: 1,
      rating: 5,
      title: "Amazing taste",
      content: "Really like this peanut butter cookies.",
      author: "Sebastian Smith",
      date: "11/21/2024",
      helpful: 7,
      notHelpful: 0,
      hasPicture: true,
      pictureUrl: "/choko.jpg",
   },
   {
      id: 2,
      rating: 5,
      title: "Mom's Favorite",
      content:
         "Super soft tasty cookies. To die for. Were so yummy. Fast shipping. Came in 1 day. Will definitely try again.",
      author: "Sebastian Smith",
      date: "11/20/2024",
      helpful: 3,
      notHelpful: 0,
      hasPicture: true,
      pictureUrl: "/bis.jpg",
   },
   {
      id: 3,
      rating: 5,
      title: "Magic",
      content:
         "They taste so good and I recommend to family and friends and it is thumbs up.",
      author: "Sebastian Smith",
      date: "11/19/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 4,
      rating: 4,
      title: "Melt swell",
      content:
         "Best cookie I've had in a while I'm going to buy more and try the other flavors.",
      author: "Sebastian Smith",
      date: "11/18/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 5,
      rating: 5,
      title: "Amazing cookie!",
      content:
         "So if I go back, probably several, and not complete our highest duty is to respect all resources and be active patient and sheep. Just awesome and it is thumbs-up way.",
      author: "Sebastian Smith",
      date: "11/18/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: true,
      pictureUrl: "/api/placeholder/100/100",
   },
   {
      id: 6,
      rating: 5,
      title: "Love Peanut Butter",
      content:
         "Please don't let me hunger get any more cookies. He just loves them so much that he bought a second batch. No chocolate chips they can don't use the long peanut bars. Large order is almost here. It was it is a snap.",
      author: "Sebastian Smith",
      date: "11/17/2024",
      helpful: 3,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 7,
      rating: 5,
      title: "The best meal I ever had",
      content:
         "Yes I said meal. These cookies are food for my body. They are yummy for my tummy.",
      author: "Sebastian Smith",
      date: "11/16/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 8,
      rating: 5,
      title: "It is good",
      content:
         "I love this one just wish it was just peanut butter without the chocolate chunks - nothing better than a straight peanut butter cookie!",
      author: "Sebastian Smith",
      date: "11/15/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 9,
      rating: 5,
      title: "Great",
      content:
         "Super soft tasty cookies. To die for. Were so yummy. Fast shipping. Came in 1 day. Will definitely try again.",
      author: "Sebastian Smith",
      date: "11/14/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 10,
      rating: 5,
      title: "Not enough peanut butter flavor",
      content:
         "I was hoping for a gooey cookie but it was a less than than expected. The chocolate may have been why I didn't actually taste peanut butter.",
      author: "Sebastian Smith",
      date: "11/13/2024",
      helpful: 2,
      notHelpful: 0,
      hasPicture: false,
   },
   {
      id: 11,
      rating: 3,
      title: "Okay but not amazing",
      content:
         "The cookies were fine, but not as mind-blowing as the other reviews suggested.",
      author: "Sebastian Smith",
      date: "11/12/2024",
      helpful: 1,
      notHelpful: 2,
      hasPicture: false,
   },
   {
      id: 12,
      rating: 2,
      title: "A bit dry",
      content:
         "Was expecting something more moist based on the description. Had to dip it in milk.",
      author: "Sebastian Smith",
      date: "11/11/2024",
      helpful: 4,
      notHelpful: 1,
      hasPicture: true,
      pictureUrl: "/api/placeholder/100/100",
   },
];

// Sort options
const SORT_OPTIONS = {
   HIGHEST_RATING: "Highest Rating",
   LOWEST_RATING: "Lowest Rating",
   ONLY_PICTURES: "Only Pictures",
   MOST_HELPFUL: "Most Helpful",
};

export default function ReviewComments() {
   const [sortBy, setSortBy] = useState(SORT_OPTIONS.HIGHEST_RATING);
   const [currentPage, setCurrentPage] = useState(1);
   const [sortedReviews, setSortedReviews] = useState([]);
   const reviewsPerPage = 10;

   useEffect(() => {
      // Apply sorting logic based on the selected option
      let sorted = [...reviewsData];

      switch (sortBy) {
         case SORT_OPTIONS.HIGHEST_RATING:
            sorted = sorted.sort((a, b) => b.rating - a.rating);
            break;
         case SORT_OPTIONS.LOWEST_RATING:
            sorted = sorted.sort((a, b) => a.rating - b.rating);
            break;
         case SORT_OPTIONS.ONLY_PICTURES:
            sorted = sorted.filter((review) => review.hasPicture);
            break;
         case SORT_OPTIONS.MOST_HELPFUL:
            sorted = sorted.sort((a, b) => b.helpful - a.helpful);
            break;
         default:
            break;
      }

      setSortedReviews(sorted);
      setCurrentPage(1); // Reset to first page when sorting changes
   }, [sortBy]);

   // Calculate pagination
   const indexOfLastReview = currentPage * reviewsPerPage;
   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
   const currentReviews = sortedReviews.slice(
      indexOfFirstReview,
      indexOfLastReview
   );
   const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);

   // Handle page changes
   const goToPage = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const handleHelpful = (id, isHelpful) => {
      // In a real app, you would send this to an API
      console.log(
         `Marked review ${id} as ${isHelpful ? "helpful" : "not helpful"}`
      );
   };

   // Render stars based on rating
   const renderStars = (rating) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
         stars.push(
            <span key={i} className={i < rating ? "star filled" : "star"}>
               ★
            </span>
         );
      }
      return stars;
   };

   // Improved pagination rendering with ellipsis for better UX when there are many pages
   const renderPagination = () => {
      if (totalPages <= 1) return null;

      const pageNumbers = [];

      // Always show first page
      pageNumbers.push(1);

      // Calculate range of pages around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis if there's a gap after page 1
      if (startPage > 2) {
         pageNumbers.push("...");
      }

      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
         pageNumbers.push(i);
      }

      // Add ellipsis if there's a gap before last page
      if (endPage < totalPages - 1) {
         pageNumbers.push("...");
      }

      // Always show last page if more than 1 page exists
      if (totalPages > 1) {
         pageNumbers.push(totalPages);
      }
      return (
         <div className="pagination">
            {currentPage > 1 && (
               <button
                  onClick={() => goToPage(currentPage - 1)}
                  className="arrow-btn"
                  aria-label="Previous page"
               >
                  ←
               </button>
            )}

            {pageNumbers.map((number, idx) =>
               number === "..." ? (
                  <span key={`ellipsis-${idx}`} className="page-ellipsis">
                     ...
                  </span>
               ) : (
                  <button
                     key={number}
                     onClick={() => goToPage(number)}
                     className={`page-btn ${
                        currentPage === number ? "active" : ""
                     }`}
                  >
                     {number}
                  </button>
               )
            )}

            {currentPage < totalPages && (
               <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="arrow-btn"
                  aria-label="Next page"
               >
                  →
               </button>
            )}
         </div>
      );
   };

   return (
      <div className="reviews-container-comments">
         <div className="reviews-header">
            <div className="sort-by">
               <span>Sort by: </span>
               <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
               >
                  <option value={SORT_OPTIONS.HIGHEST_RATING}>
                     {SORT_OPTIONS.HIGHEST_RATING}
                  </option>
                  <option value={SORT_OPTIONS.LOWEST_RATING}>
                     {SORT_OPTIONS.LOWEST_RATING}
                  </option>
                  <option value={SORT_OPTIONS.ONLY_PICTURES}>
                     {SORT_OPTIONS.ONLY_PICTURES}
                  </option>
                  <option value={SORT_OPTIONS.MOST_HELPFUL}>
                     {SORT_OPTIONS.MOST_HELPFUL}
                  </option>
               </select>
            </div>
         </div>
         <div className="reviews-list">
            {currentReviews.map((review) => (
               <div key={review.id} className="review-item">
                  <div className="review-left-section">
                     <div className="review-rating">
                        {renderStars(review.rating)}
                     </div>
                     <div className="review-author">{review.author}</div>
                     <div className="review-date">{review.date}</div>
                  </div>
                  <div className="review-right-section">
                     <div className="review-title">{review.title}</div>
                     <div className="review-content">{review.content}</div>

                     {review.hasPicture && (
                        <div className="review-image">
                           <img src={review.pictureUrl} alt="Review" />
                        </div>
                     )}
                  </div>
                  <div className="review-feedback">
                     <span>Was this helpful? </span>
                     <button
                        className="feedback-btn"
                        onClick={() => handleHelpful(review.id, true)}
                     >
                        <ThumbsUp size={16} /> {review.helpful}
                     </button>
                     <button
                        className="feedback-btn"
                        onClick={() => handleHelpful(review.id, false)}
                     >
                        <ThumbsDown size={16} /> {review.notHelpful}
                     </button>
                  </div>
               </div>
            ))}
         </div>
         {/* Pagination */}
         {/* {totalPages > 1 && (
            <div className="pagination">
               <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-btn"
               >
                  &lt;
               </button>

               {[...Array(totalPages).keys()].map((number) => (
                  <button
                     key={number + 1}
                     onClick={() => goToPage(number + 1)}
                     className={`page-btn ${
                        currentPage === number + 1 ? "active" : ""
                     }`}
                  >
                     {number + 1}
                  </button>
               ))}

               <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-btn"
               >
                  &gt;
               </button>
            </div>
         )} */}

         {/* Enhanced Pagination */}
         {renderPagination()}
      </div>
   );
}
