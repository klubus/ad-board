import Container from 'react-bootstrap/Container';
import EditAdForm from '../../features/EditAdForm/EditAdForm.js';

const EditAd = () => {
  return (
    <Container className="w-75">
      <h1>Edit Ad</h1>
      <EditAdForm />
    </Container>
  );
};

export default EditAd;
