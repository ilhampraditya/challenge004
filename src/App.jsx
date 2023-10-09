import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailsMovie from "./pages/DetailsMovie";
import SearchMovies from "./pages/SearchMovies";
import Trailer from "./components/Trailer";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:movieId" element={<DetailsMovie />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/trailer/:movieId" element={<Trailer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
