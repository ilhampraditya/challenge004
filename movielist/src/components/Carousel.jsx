import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomeCarousel() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/top_rated?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const data = response.data.results.slice(0, 5);
        setMovies(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      }
    };

    fetchMovies();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Carousel>
      {movies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <Link to={`/trailer/${movie.id}`}>
              <Button className="button" variant="danger">
                Tonton Trailer
              </Button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
