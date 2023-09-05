import React from "react";
import classes from "./Review.module.css";
import ReviewCard from "./ReviewCard";
const Review = () => {
  return (
    <div id="reviews" className={classes.reviewSection}>
      <h1>Reviews</h1>
      <ReviewCard />
    </div>
  );
};

export default Review;
