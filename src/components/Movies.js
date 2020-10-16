import React, { useEffect, useState } from 'react';
import TextTruncate from 'react-text-truncate';
const url =
  'https://api.themoviedb.org/3/trending/all/day?api_key=ee6fdf67b0b4cf0acc0aed720f3da8ce';
const imgUrl = 'https://image.tmdb.org/t/p/original';
function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const response = await fetch(url);
    const movies = await response.json();
    setMovies(movies);
    setIsLoading(false);
    // console.log(movies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  const seenIt = (id) => {
    let newMovies = movies.results.filter((movie) => movie.id !== id);
    setMovies(newMovies);
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='card__container'>
          {movies.results.map((movie) => {
            console.log(movie);
            const {
              id,
              original_title,
              original_name,
              overview,
              backdrop_path,
            } = movie;
            return (
              <div className='card' key={id}>
                <img src={imgUrl + backdrop_path} alt='' />
                <h2 className='card__title'>
                  {original_name || original_title}
                </h2>
                <TextTruncate
                  line={2}
                  element='p'
                  truncateText='…'
                  text={overview}
                  className='card__overview'
                />
                {/* <p>{overview}</p> */}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Movies;
