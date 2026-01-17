import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
import Loader from "../components/Loader";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = () => {
      // Mock product data
      const mockProduct = {
        _id: id,
        name: "Sample Product",
        image:
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        description: "This is a sample product description.",
        brand: "Sample Brand",
        category: "Electronics",
        price: 99.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
      };

      setTimeout(() => {
        setProduct(mockProduct);
        setLoading(false);
      }, 1000);
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: quantity,
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      existingCart[existingItemIndex].qty = quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.location.href = `/cart/${product._id}?qty=${quantity}`;
  };

  if (loading) return <Loader />;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
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
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                      >
                        {[
                          ...Array(Math.min(product.countInStock, 10)).keys(),
                        ].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block w-100"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
