import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavbarComponents from "./NavbarComponents";
import { Footer } from "./Footer";
import "../style/style.css";

function Trailer() {
  const { movieId } = useParams();
  const [trailerKey, setTrailerKey] = useState(null);
  const [error, setError] = useState(null);
  const [backdropPath, setBackdropPath] = useState(null);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        const trailer = data?.results.find(
          (result) => result.type === "Trailer"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setError("Tidak ada trailer yang tersedia.");
        }
      } catch (error) {
        setError(error.message || "Terjadi kesalahan.");
      }
    };

    const getBackdropPath = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;
        setBackdropPath(data?.backdrop_path);
      } catch (error) {
        console.error("Error fetching backdrop path:", error);
      }
    };

    getTrailer();
    getBackdropPath();
  }, [movieId]);

  return (
    <>
      <NavbarComponents />
      <div className="trailer-background">
        {backdropPath && (
          <img
            className="backdrop-image"
            src={`https://image.tmdb.org/t/p/original${backdropPath}`}
            alt="Backdrop"
          />
        )}
        <div className="trailer-overlay">
          <h1>Trailer Film</h1>
          {trailerKey ? (
            <iframe
              title="Trailer"
              width="700"
              height="425"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allowFullScreen
            ></iframe>
          ) : (
            <p>{error}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trailer;
