const methodObj = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
    "x-rapidapi-key": "a19ade71c1msh5c7431aa6816161p1ea3bdjsndfafa4c8a037",
  },
};

const fetchHandler = async (url, methodOptionsObject = {}) => {
  try {
    const response = await fetch(url, methodOptionsObject);

    if (!response.ok) {
      throw new Error([response.status, response.statusText, response.url]);
    }
    return response.json();
  } catch (err) {
    throw err;
  }
};

const loadingTimeLimitHandler = (milliseconds = 3000) => {
  if (!isFinite(milliseconds)) milliseconds = 3000;

  return new Promise((_, reject) =>
    setTimeout(() => {
      reject("Problem with internet connection");
    }, milliseconds)
  );
};

export const getTitles = async (optionObj) => {
  try {
    const response_data = await Promise.race([
      loadingTimeLimitHandler(),
      fetchHandler(
        `https://data-imdb1.p.rapidapi.com/titles?info=base_info&limit=${optionObj.limit}&page=${optionObj.page}&titleType=movie${optionObj.params}`,
        methodObj
      ),
    ]);

    const moviesArr = response_data.results.map((movieObj) => {
      return {
        id: movieObj.id,
        genres: movieObj.genres,
        title: movieObj.titleText.text,
        releaseDate: movieObj.releaseDate,
        rating: movieObj?.ratingsSummary ? movieObj.ratingsSummary : "",
        img: movieObj?.primaryImage?.url || "",
        year: movieObj?.releaseDate?.year || "",
      };
    });
    return moviesArr;
  } catch (err) {
    throw err;
  }
};

export const searchByQuery = async (query) => {
  try {
    const text = query.split(" ").toString().replace(/,/g, "%20");

    const response_data = await Promise.race([
      loadingTimeLimitHandler(),
      fetchHandler(
        `https://data-imdb1.p.rapidapi.com/titles/search/title/${text}?info=base_info&limit=50&page=1&titleType=movie&startYear=1980&endYear=2022`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            "x-rapidapi-key":
              "a19ade71c1msh5c7431aa6816161p1ea3bdjsndfafa4c8a037",
          },
        }
      ),
    ]);

    const moviesArr = response_data.results.map((movieObj) => {
      return {
        id: movieObj.id,
        genres: movieObj.genres,
        title: movieObj.titleText.text,
        releaseDate: movieObj.releaseDate,
        rating: movieObj?.ratingsSummary ? movieObj.ratingsSummary : "",
        img: movieObj?.primaryImage?.url || "",
        year: movieObj?.releaseDate?.year || "",
      };
    });
    return moviesArr;
  } catch (err) {
    throw err;
  }
};

export const getTitle = async (movie_id) => {
  try {
    if (!movie_id) throw "No ID";
    const response_data = await Promise.race([
      loadingTimeLimitHandler(),
      fetchHandler(
        `https://data-imdb1.p.rapidapi.com/titles/${movie_id}?info=base_info`,
        methodObj
      ),
    ]);

    const { results: movieObj } = await response_data;

    const releaseDate =
      movieObj?.releaseDate?.day &&
      movieObj?.releaseDate?.month &&
      movieObj?.releaseDate?.year
        ? `${String(movieObj.releaseDate.day).padStart(2, 0)}-${String(
            movieObj.releaseDate.month
          ).padStart(2, 0)}-${movieObj.releaseDate.year}`
        : "no information";

    const rating = movieObj?.ratingsSummary || "";

    const genres = movieObj?.genres?.genres || [];

    const plot = movieObj?.plot?.plotText?.plainText || "Plot is not available";

    // TODO no image component
    const img = movieObj?.primaryImage?.url || "";

    const title = movieObj?.titleText?.text || "UNTITLED";

    const movieInfo = {
      id: movieObj.id,
      genres,
      title,
      releaseDate,
      rating,
      plot,
      img,
      year: movieObj?.releaseDate?.year || "",
    };

    const response_cast = await Promise.race([
      loadingTimeLimitHandler(),
      fetchHandler(
        `https://data-imdb1.p.rapidapi.com/titles/${movie_id}?info=extendedCast`,
        methodObj
      ),
    ]);

    const castArr = response_cast.results?.cast?.edges;

    if (!castArr) return { ...movieInfo, actors: null };

    const actors = castArr
      .map((item) => item.node.name.nameText.text)
      .join(", ");

    return { ...movieInfo, actors };
  } catch (err) {
    throw err;
  }
};
