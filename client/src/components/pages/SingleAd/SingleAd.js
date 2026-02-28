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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const SingleAd = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const ad = useSelector((state) => getAdById(state, id));
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);
  console.log(ad);
  if (!ad) {
    return (
      <Container className="w-50">
        <p>Loading ad...</p>
      </Container>
    );
  }
  const canEdit =
    currentUser && ad.seller?._id?.toString() === currentUser?._id?.toString();
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
              {canEdit && (
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
              )}
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

          <Card.Text as="div" className="mt-4">
            <ListGroup>
              <ListGroup.Item variant="primary">
                <strong>Product info:</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <p className="mb-1 mt-2">{ad.description}</p>
              </ListGroup.Item>
              <br></br>
              <Row className="mb-4">
                <Col>
                  <ListGroup.Item variant="secondary">
                    <strong>Location:</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p className="mb-1">{ad.location}</p>
                  </ListGroup.Item>
                </Col>
                <Col>
                  <ListGroup.Item variant="secondary">
                    <strong>Price:</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p className="mb-1">{ad.price}$</p>
                  </ListGroup.Item>
                </Col>
              </Row>
              <ListGroup.Item variant="info">
                <strong>Seller</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="mb-4">
                  <Col>
                    <div className="d-flex flex-column gap-5">
                      <h4>{ad.seller?.login}</h4>
                      <div>
                        {' '}
                        <strong>Phone: </strong>
                        {ad.seller?.phone}
                      </div>
                    </div>
                  </Col>
                  <Col xs={4} md={3} className="text-center">
                    {ad.seller?.avatar && (
                      <img
                        src={`http://localhost:8000/uploads/${ad.seller.avatar}`}
                        alt="avatar"
                        className="img-fluid rounded-circle shadow-sm"
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>{' '}
            </ListGroup>
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item>
                {' '}
                <p className="mb-2">
                  <strong>Published:</strong>{' '}
                  {new Date(ad.createdAt).toLocaleDateString()}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SingleAd;
