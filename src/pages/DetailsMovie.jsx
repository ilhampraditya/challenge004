import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Carousel } from "react-bootstrap";
import NavbarComponents from "../components/NavbarComponents";
import { StarFill } from "react-bootstrap-icons";
import { Footer } from "../components/footer";
import "../style/style.css"; 

function DetailsMovie() {
  const [detailMovie, setDetailMovie] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getDetailMovie() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/3/movie/${
            params.movieId
          }?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        setDetailMovie(response.data);
      } catch (error) {
        alert(error);
      }
    }

    getDetailMovie();
  }, [params]);

  const handleWatchTrailer = () => {
    // Mengarahkan pengguna ke halaman Trailer dengan movieId yang sesuai
    window.location.href = `/trailer/${params.movieId}`;
  };

  return (
    <>
      <NavbarComponents />

      <Carousel controls={false}>
        <Carousel.Item>
          <img
            className="Carousel-img d-block w-100"
            src={`https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}`}
            alt={detailMovie?.title}
          />
          <div className="Carousel-img-overlay"></div>{" "}
          <Carousel.Caption className="Movie-caption">
            <h2 className="Movie-caption-title">{detailMovie?.title}</h2>
            <p className="Movie-genres">
              {detailMovie?.genres &&
                detailMovie?.genres?.length > 0 &&
                detailMovie?.genres?.map((genre, i) => {
                  return i === detailMovie?.genres.length - 1
                    ? genre.name
                    : `${genre.name}, `;
                })}
            </p>
            <p className="Movie-caption-text">{detailMovie?.overview}</p>
            <p className="Movie-rate" style={{ color: "yellow" }}>
              <StarFill className="Icon-star" />
              {detailMovie?.vote_average
                ? detailMovie.vote_average.toFixed(1)
                : "-"}
            </p>
            <Button
              className="Movie-caption-button"
              variant="danger"
              onClick={handleWatchTrailer}
            >
              Watch Trailer
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Footer />
    </>
  );
}

export default DetailsMovie;
