import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { getProducts, getFeaturedProducts } from "../utils/api";
import Loader from "../components/Loader";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [productsData, featuredData] = await Promise.all([
          getProducts({ limit: 8 }),
          getFeaturedProducts(),
        ]);
        setProducts(productsData.data.products);
        setFeaturedProducts(featuredData.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Featured Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <Row>
            {featuredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          <h2 className="mt-5">Latest Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomePage;
