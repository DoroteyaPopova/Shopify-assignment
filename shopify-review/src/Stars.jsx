import styles from "./Stars.module.css";
import { useState } from "react";

const starIcon = "★"; // Unicode for filled star
const unfilledStarIcon = "☆"; // Unicode for unfilled star

export default function Stars({ userRating, totalVotes }) {
   const [rating, setRating] = useState(userRating);
   const [temporarryRating, setTemporaryRating] = useState(0);

   let stars = Array(5).fill(unfilledStarIcon);

   const handleClick = (rating) => {
      setRating(rating);

      //! Save the rating to the server!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //   localStorage.setItem("starRating", rating);
   };

   return (
      <div className={styles.starsContainer}>
         {stars.map((item, index) => {
            const isActiveRating =
               (rating || temporarryRating) &&
               (index < rating || index < temporarryRating);

            const isFilledStar = isActiveRating ? starIcon : unfilledStarIcon;

            if (isActiveRating) {
               stars[index] = isFilledStar;
            }

            return (
               <div
                  className={styles.star}
                  key={index}
                  onMouseEnter={() => {
                     setTemporaryRating(index + 1);
                  }}
                  onMouseLeave={() => {
                     setTemporaryRating(0);
                  }}
                  onClick={() => {
                     handleClick(index + 1);
                  }}
               >
                  {isFilledStar}
               </div>
            );
         })}
      </div>
   );
}
