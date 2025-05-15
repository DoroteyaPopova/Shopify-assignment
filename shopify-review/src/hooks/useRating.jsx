import { useState, useEffect } from "react";

/**
 * Custom hook to calculate the average rating of a product
 * Formula: (5*r5 + 4*r4 + 3*r3 + 2*r2 + 1*r1) / (r5 + r4 + r3 + r2 + r1)
 */
export const useProductRating = (
   ratings = { r5: 0, r4: 0, r3: 0, r2: 0, r1: 0 }
) => {
   const [averageRating, setAverageRating] = useState(0);
   const [totalVotes, setTotalVotes] = useState(0);

   useEffect(() => {
      // Extract rating counts
      const { r5, r4, r3, r2, r1 } = ratings;

      // Calculate the sum of weighted ratings
      const weightedSum = 5 * r5 + 4 * r4 + 3 * r3 + 2 * r2 + 1 * r1;

      // Calculate the total number of votes
      const total = r5 + r4 + r3 + r2 + r1;

      // Calculate the average rating (avoid division by zero)
      const average = total > 0 ? weightedSum / total : 0;

      // Round to 1 decimal place
      const roundedAverage = Math.round(average * 10) / 10;

      setAverageRating(roundedAverage);
      setTotalVotes(total);
   }, [ratings]);

   return { averageRating, totalVotes };
};
