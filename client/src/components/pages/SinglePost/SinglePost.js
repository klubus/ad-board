import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SinglePost = () => {
  const [showModal, setShowModal] = useState(false);

  const postData = {
    title: 'aa',
    seller: 'bb',
    publishedDate: '11',
    description: 'cc',
    location: 'dd',
    price: 11,
  };

  function showDeleteModal() {
    setShowModal(true);
  }

  function hideDeleteModal() {
    setShowModal(false);
  }
  return (
    <Container className="w-50">
      {showModal && (
        <Modal show={true} onHide={hideDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              This operation will completely remove this post from the app. Are
              you sure you want to do that?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger">Remove</Button>
          </Modal.Footer>
        </Modal>
      )}
      <Card className="border-0">
        <Card.Body>
          <Card.Title>
            <div className="d-flex justify-content-between align-items-center">
              <h5>{postData.title}</h5>
              <div>
                <Button
                  as={Link}
                  to={`/post/edit/1`}
                  variant="outline-info me-2"
                >
                  Edit
                </Button>
                <button
                  className="btn btn-outline-danger"
                  onClick={showDeleteModal}
                >
                  Delete
                </button>
              </div>
            </div>
          </Card.Title>
          <Card.Img
            src="http://localhost:8000/uploads/about-us-1771434617202.jpg"
            style={{
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <Card.Text as="div">
            <p className="mb-1 mt-2">
              <strong>Description:</strong> {postData.description}
            </p>
            <p className="mb-1">
              <strong>Seller:</strong> {postData.seller}
            </p>
            <p className="mb-1">
              <strong>Price:</strong> {postData.price}
            </p>
            <p className="mb-2">
              <strong>Published:</strong> {postData.publishedDate}
            </p>
            <p className="mb-1">
              <strong>Location:</strong> {postData.location}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SinglePost;
