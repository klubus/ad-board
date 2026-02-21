import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MiniPostsList = () => {
  return (
    <Row xs={1} className="g-3">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Row className="g-0">
              <Col md={3}>
                <Card.Img
                  src="http://localhost:8000/uploads/about-us-1771434617202.jpg"
                  style={{
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Col>

              <Col md={6}>
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>Description</Card.Text>
                </Card.Body>
              </Col>
              <Col
                md={1}
                className="d-flex justify-content-center align-items-center"
              >
                <Card.Body>
                  <Card.Text>200$</Card.Text>
                </Card.Body>
              </Col>
              <Col
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                <Button as={Link} to={`/post/1`} variant="outline-info me-2">
                  Read more
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MiniPostsList;
