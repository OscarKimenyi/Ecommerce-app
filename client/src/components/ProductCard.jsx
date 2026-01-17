import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3" className="mt-2">
          ${product.price.toFixed(2)}
        </Card.Text>

        <Link to={`/product/${product._id}`}>
          <Button variant="primary" className="btn-block mt-2">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
