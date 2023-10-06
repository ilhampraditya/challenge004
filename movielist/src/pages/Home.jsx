import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import MovieItem from "../components/MovieItem";
import HomeCarousel from "../components/Carousel";
import NavbarComponents from "../components/NavbarComponents";
import { Footer } from "../components/footer";
import "../style/style.css";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setPopularMovies(data?.results);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });
          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getPopularMovies();
  }, [errors]);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (popularMovies.length === 0) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <NavbarComponents />
      <HomeCarousel />
      <div className="mt-4 mb-5">
        <h3>
          <b>POPULAR MOVIE</b>
        </h3>
      </div>
      <Container className="mt-3">
        <Row className="g-5">
          {popularMovies.map((movie) => (
            <Col md={3} key={movie?.id}>
              <MovieItem
                id={movie?.id}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path
                }
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
