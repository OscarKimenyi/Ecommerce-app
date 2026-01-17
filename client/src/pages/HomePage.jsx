import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call later
    const mockProducts = [
      {
        _id: "1",
        name: "iPhone 15 Pro",
        price: 999.99,
        image:
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
        rating: 4.5,
        numReviews: 120,
        countInStock: 10,
      },
      {
        _id: "2",
        name: "Samsung Galaxy S23",
        price: 799.99,
        image:
          "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
        rating: 4.3,
        numReviews: 89,
        countInStock: 15,
      },
      {
        _id: "3",
        name: "Nike Air Max 270",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        rating: 4.7,
        numReviews: 256,
        countInStock: 25,
      },
      {
        _id: "4",
        name: "MacBook Pro 14-inch",
        price: 1999.99,
        image:
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        rating: 4.8,
        numReviews: 67,
        countInStock: 5,
      },
      {
        _id: "5",
        name: "Sony WH-1000XM5",
        price: 399.99,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        rating: 4.6,
        numReviews: 142,
        countInStock: 20,
      },
      {
        _id: "6",
        name: "Levi's 501 Jeans",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        rating: 4.4,
        numReviews: 189,
        countInStock: 50,
      },
    ];

    // Simulate API call delay
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
