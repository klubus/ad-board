import { useDispatch, useSelector } from 'react-redux';
import MiniAdsList from '../MiniAdsList/MiniAdsList';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { fetchAds, getAllAds } from '../../../redux/adsRedux';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { searchAds } from '../../../redux/adsRedux';

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);
  const filteredAds = ads.filter((ad) =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  useEffect(() => {
    if (searchPhrase.trim() === '') {
      dispatch(fetchAds());
    } else {
      dispatch(searchAds(searchPhrase));
    }
  }, [searchPhrase, dispatch]);
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="m-4">All ads</h2>
        <Button as={Link} to={`/ad/add`} variant="outline-info">
          Add ad
        </Button>
      </div>
      <Form className="mx-4 mb-3">
        <Form.Control
          type="text"
          placeholder="Search ads..."
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      </Form>
      <Container>
        <Row>
          <MiniAdsList ads={filteredAds} />{' '}
        </Row>
      </Container>
    </section>
  );
};

export default Home;
