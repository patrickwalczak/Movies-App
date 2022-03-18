export const countRating = (userRatings, data, movieID) => {
  const checkIfRated = userRatings.find((movie) => movie.id === movieID);
  const userRating = checkIfRated ? checkIfRated.rating : "-";

  let rating, newRating;
  if (data?.rating) {
    rating = data.rating?.aggregateRating
      ? data.rating?.aggregateRating.toFixed(3)
      : 0;
    const voteCount = data.rating?.voteCount || 0;

    if (checkIfRated) {
      newRating =
        (+rating * +voteCount + checkIfRated.rating) / (+voteCount + 1);

      return { movieRating: newRating.toFixed(3), userRating };
    }
    return { movieRating: rating, userRating };
  }
};
