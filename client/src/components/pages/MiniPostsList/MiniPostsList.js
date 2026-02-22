import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAds, fetchAds } from '../../../redux/adsRedux';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MiniPostsList = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <section>
      <Row>
        {ads && ads.length > 0 ? (
          ads.map((ad) => (
            <Col key={ad._id} md={12} className="mb-3">
              <Card style={{ maxHeight: '200px', overflow: 'hidden' }}>
                <Row className="g-0">
                  <Col md={3}>
                    <Card.Img
                      src={
                        ad.image
                          ? `http://localhost:8000/uploads/${ad.image}`
                          : 'http://localhost:8000/uploads/about-us-1771434617202.jpg'
                      }
                    />
                  </Col>

                  <Col md={6}>
                    <Card.Body>
                      <Card.Title>{ad.title}</Card.Title>
                      <Card.Text>{ad.description}</Card.Text>
                    </Card.Body>
                  </Col>

                  <Col
                    md={1}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Card.Body>
                      <Card.Text>{ad.price ? `${ad.price}$` : 'N/A'}</Card.Text>
                    </Card.Body>
                  </Col>

                  <Col
                    md={2}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Button
                      as={Link}
                      to={`/post/${ad._id}`}
                      variant="outline-info me-2"
                    >
                      Read more
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <p>No ads available</p>
        )}
      </Row>
    </section>
  );
};

export default MiniPostsList;
