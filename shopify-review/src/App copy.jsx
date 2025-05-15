import React, { useState } from "react";

function ReviewWidget() {
   const [reviews, setReviews] = useState([
      { name: "Alice", rating: 5, comment: "Awesome product!" },
      { name: "Bob", rating: 4, comment: "Pretty good!" },
   ]);

   const [form, setForm] = useState({ name: "", rating: 5, comment: "" });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setReviews([...reviews, form]);
      setForm({ name: "", rating: 5, comment: "" });
   };

   return (
      <div
         className="review-widget"
         style={{ maxWidth: 400, margin: "0 auto" }}
      >
         <h2>Product Reviews</h2>
         <ul>
            {reviews.map((r, idx) => (
               <li key={idx}>
                  <strong>{r.name}</strong> ({r.rating}★): {r.comment}
               </li>
            ))}
         </ul>

         <h3>Add a Review</h3>
         <form onSubmit={handleSubmit}>
            <input
               name="name"
               placeholder="Your name"
               value={form.name}
               onChange={handleChange}
               required
            />
            <br />
            <select name="rating" value={form.rating} onChange={handleChange}>
               {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                     {n} Star{n > 1 ? "s" : ""}
                  </option>
               ))}
            </select>
            <br />
            <textarea
               name="comment"
               placeholder="Your review"
               value={form.comment}
               onChange={handleChange}
               required
            />
            <br />
            <button type="submit">Submit Review</button>
         </form>
      </div>
   );
}

export default function App() {
   return (
      <div>
         <ReviewWidget />
      </div>
   );
}
