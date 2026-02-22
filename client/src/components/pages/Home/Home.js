import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MiniPostsList from '../MiniPostsList/MiniPostsList';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import { fetchAds, getAllAds } from '../../../redux/adsRedux';

const Home = () => {
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="m-4">All posts</h2>
        <Button as={Link} to={`/post/add`} variant="outline-info">
          Add post
        </Button>
      </div>

      <Container>
        <Row>
          <MiniPostsList posts={ads} />
        </Row>
      </Container>
    </section>
  );
};

export default Home;
