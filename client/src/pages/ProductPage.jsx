import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { getProductById, createReview } from "../utils/api";
import Loader from "../components/Loader";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${quantity}`);
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview(id, { rating, comment });
      // Refresh product data
      const { data } = await getProductById(id);
      setProduct(data);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;
  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image
            src={product.images[0] || "https://via.placeholder.com/500"}
            alt={product.name}
            fluid
          />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.reviews.length} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroup.Item>

              {product.stock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {[...Array(Math.min(product.stock, 10)).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.stock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <div>No Reviews</div>}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={6}>
          <h2>Write a Review</h2>
          <Form onSubmit={submitReviewHandler}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value="">Select...</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="comment" className="mt-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                row="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Submit Review
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
