import Container from 'react-bootstrap/Container';
import AddAdForm from '../../features/AddAdForm/AddAdForm';

const AddAd = () => {
  return (
    <Container className="w-75">
      <h1>Add Ad</h1>
      <AddAdForm />
    </Container>
  );
};

export default AddAd;
