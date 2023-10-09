import { useEffect, useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import HomeCarousel from "../components/Carousel";
import NavbarComponents from "../components/NavbarComponents";
import { Footer } from "../components/Footer";
import axios from "axios"; 

const SearchMovies = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const query = searchParams.get("query");
        const page = searchParams.get("page") || 1;
        const apiKey = import.meta.env.VITE_API_AUTH_TOKEN; 
        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;

        setLoading(true);

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`, 
          },
        });

        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    // Ambil parameter pencarian dari location state
    const query = location.state?.query; // Pastikan location.state.query tidak null

    // Lakukan pencarian hanya jika query tersedia
    if (query) {
      searchParams.set("query", query);
      fetchMovies();
    }
  }, [searchParams, location.state]);

  return (
    <>
      <NavbarComponents />
      <HomeCarousel />
      <div className="mt-4 mb-4">
        <h3>
          <b>SEARCH MOVIE</b>
        </h3>
      </div>
      <Container>
        <Row className="g-5">
          {loading ? (
            <p>Loading...</p>
          ) : (
            movies.map((movie) => (
              <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <Link to={`/details/${movie.id}`}>
                    {console.log("Poster Path:", movie.poster_path)}
                    {console.log(
                      "Image URL:",
                      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    )}
                    <Card.Img
                      variant="top"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SearchMovies;
