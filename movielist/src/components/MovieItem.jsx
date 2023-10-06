import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieItem({ id, imageURL }) {
  return (
    <Card
      style={{ width: "15rem" }}
      className="mx-auto d-flex align-items-center"
    >
      <Link to={`/details/${id}`}>
        <Card.Img variant="top" src={imageURL} />
      </Link>
    </Card>
  );
}

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
};

export default MovieItem;
