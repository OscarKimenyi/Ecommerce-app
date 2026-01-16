import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getProducts, deleteProduct } from "../../utils/api";
import Loader from "../../components/Loader";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getProducts({ limit: 100 });
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching products");
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(error.response?.data?.message || "Error deleting product");
      }
    }
  };

  const createProductHandler = () => {
    // Navigate to create product page
  };

  if (loading) return <Loader />;

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {error && <div className="alert alert-danger">{error}</div>}

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>STOCK</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(product._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductList;
