import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    const mockProducts = [
      {
        _id: "1",
        name: "Sample Product 1",
        price: 99.99,
        images: ["https://via.placeholder.com/300"],
        rating: 4.5,
        numReviews: 10,
        stock: 10,
      },
      {
        _id: "2",
        name: "Sample Product 2",
        price: 149.99,
        images: ["https://via.placeholder.com/300"],
        rating: 4.0,
        numReviews: 5,
        stock: 5,
      },
    ];

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
