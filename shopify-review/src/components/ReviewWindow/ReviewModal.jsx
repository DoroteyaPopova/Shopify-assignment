import React, { useState } from "react";
import "./ReviewModal.css";

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
   // State for form fields
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [rating, setRating] = useState(0);
   const [title, setTitle] = useState("");
   const [review, setReview] = useState("");
   const [hoverRating, setHoverRating] = useState(0);

   // If modal is not open, don't render
   if (!isOpen) return null;

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({
         name,
         email,
         rating,
         title,
         review,
      });

      // Reset form fields
      setName("");
      setEmail("");
      setRating(0);
      setTitle("");
      setReview("");
   };

   // Handle star rating
   const handleStarClick = (value) => {
      setRating(value);
   };

   return (
      <div className="modal-overlay">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Leave a review</h2>
               <button className="close-button" onClick={onClose}>
                  &times;
               </button>
            </div>

            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <label htmlFor="name">
                     Name <span className="required">*</span>
                  </label>
                  <input
                     type="text"
                     id="name"
                     placeholder="Your name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     required
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                     type="email"
                     id="email"
                     placeholder="Enter your e-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <label>Rating</label>
                  <div className="star-rating">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <span
                           key={star}
                           className={`star ${
                              star <= (hoverRating || rating)
                                 ? "filled"
                                 : "empty"
                           }`}
                           onClick={() => handleStarClick(star)}
                           onMouseEnter={() => setHoverRating(star)}
                           onMouseLeave={() => setHoverRating(0)}
                        >
                           ★
                        </span>
                     ))}
                  </div>
               </div>

               <div className="form-group">
                  <label htmlFor="title">Review title</label>
                  <input
                     type="text"
                     id="title"
                     placeholder="Enter review title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="review">Review</label>
                  <textarea
                     id="review"
                     placeholder="Write your review"
                     value={review}
                     onChange={(e) => setReview(e.target.value)}
                     rows={5}
                  />
               </div>

               <div className="form-group">
                  <label>Upload a photo of how it looks (optional)</label>
                  <div className="photo-upload">
                     <input
                        type="file"
                        id="photo"
                        className="hidden-file-input"
                     />
                     <label htmlFor="photo" className="file-upload-button">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        >
                           <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                           ></rect>
                           <circle cx="8.5" cy="8.5" r="1.5"></circle>
                           <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                     </label>
                  </div>
               </div>

               <div className="form-actions">
                  <button type="submit" className="submit-button">
                     Submit review
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ReviewModal;
