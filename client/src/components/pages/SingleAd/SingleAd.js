import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAd, fetchAds, getAdById } from '../../../redux/adsRedux';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const SingleAd = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  if (!ad) {
    return (
      <Container className="w-50">
        <p>Loading ad...</p>
      </Container>
    );
  }
  function showDeleteModal() {
    setShowModal(true);
  }

  function hideDeleteModal() {
    setShowModal(false);
  }

  function removeAd() {
    dispatch(deleteAd(id));
    navigate('/');
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
              This operation will completely remove this ad from the app. Are
              you sure you want to do that?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={removeAd}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Card className="border-0">
        <Card.Body>
          <Card.Title>
            <div className="d-flex justify-content-between align-items-center">
              <h5>{ad.title}</h5>
              <div>
                <Button
                  as={Link}
                  to={`/ad/edit/${ad._id}`}
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
            src={
              ad.image
                ? `http://localhost:8000/uploads/${ad.image}`
                : 'http://localhost:8000/uploads/about-us-1771434617202.jpg'
            }
            style={{
              height: '100%',
              objectFit: 'cover',
            }}
          />

          <Card.Text as="div">
            <p className="mb-1 mt-2">
              <strong>Description:</strong> {ad.description}
            </p>
            <p className="mb-1">
              <strong>Seller:</strong> {ad.seller?.login}
            </p>
            <p className="mb-1">
              <strong>Price:</strong> {ad.price}$
            </p>
            <p className="mb-2">
              <strong>Published:</strong> {ad.publishedDate}
            </p>
            <p className="mb-1">
              <strong>Location:</strong> {ad.location}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleAd;
