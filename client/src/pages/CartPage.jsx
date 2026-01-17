import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { getProductById } from "../utils/api";

const CartPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const addToCart = async (id, quantity) => {
      try {
        const { data } = await getProductById(id);
        const item = {
          product: data._id,
          name: data.name,
          image: data.images?.[0] || "https://via.placeholder.com/300",
          price: data.price,
          stock: data.stock,
          qty: quantity,
        };

        setCartItems((prevItems) => {
          const existItem = prevItems.find((x) => x.product === item.product);

          let updatedItems;
          if (existItem) {
            updatedItems = prevItems.map((x) =>
              x.product === existItem.product ? item : x
            );
          } else {
            updatedItems = [...prevItems, item];
          }

          localStorage.setItem("cartItems", JSON.stringify(updatedItems));
          return updatedItems;
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    if (productId) {
      addToCart(productId, qty);
    }
  }, [productId, qty]);

  const removeFromCartHandler = (id) => {
    const updatedCart = cartItems.filter((item) => item.product !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const updateCartItem = async (id, quantity) => {
    try {
      const { data } = await getProductById(id);
      const item = {
        product: data._id,
        name: data.name,
        image: data.images?.[0] || "https://via.placeholder.com/300",
        price: data.price,
        stock: data.stock,
        qty: quantity,
      };

      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((x) =>
          x.product === id ? item : x
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  // Calculate totals
  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        updateCartItem(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({itemsCount} items)</h2>${itemsPrice.toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
