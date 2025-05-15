import styles from "./ProductDetails.module.css";
import { useProductRating } from "../../hooks/useRating";

export default function ProductDetails() {
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
      // {/* Product Details */}
      <div className={styles.productContainer}>
         <div className={styles.productSection}>
            <div className={styles.productImage}>
               <img
                  src="/applepie2_1.png"
                  alt="Apple Pie Cookie"
                  className={styles.productImg}
               />
            </div>
            <div className={styles.productInfo}>
               <div className={styles.productHeader}>
                  <h1 className={styles.productTitle}>Apple Pie Cookie</h1>
                  <p className={styles.productPrize}>$5.00</p>
               </div>
               <div className={styles.ratingDisplay}>
                  <div className={styles.ratingStars}>
                     {renderStars(averageRating)}
                  </div>
                  <span className={styles.ratingText}>
                     {averageRating} ({totalVotes} reviews)
                  </span>
               </div>
               <div className={styles.productDescriptionContainer}>
                  <h3 className={styles.productSubtitle}>
                     IT'S ALL ABOUT THE APPLES
                  </h3>
                  <p className={styles.productDescription}>
                     Warm and chewy, you won't be able to resist these
                     straight-from-the-orchard delicacies. That's right,
                     friends, an&nbsp;apple pie cookie&nbsp;a day keeps the
                     hunger away. What makes these so tempting? As Eve can tell
                     you, it's all about the apples. <br /> We use organic
                     cartelized apples, which are so bitingly tangy that when we
                     combine them with our curiously comforting cane sugar and
                     vivacious vanilla, the end result is an audacious apple pie
                     cookie that is worth being cast out of Eden for. So, order
                     a batch today and cut yourself a supple slice of this
                     sensual mainstay, guaranteed to make you say "Yum…"
                  </p>
               </div>
            </div>
         </div>
         <div className={styles.smallImageContainer}>
            <div className={styles.smallImage}>
               <img
                  src="/applepienew_1 (1).png"
                  alt="Apple Pie Cookie"
                  className={styles.smallImg}
               />
            </div>
         </div>
      </div>
   );
}
