import Container from 'react-bootstrap/Container';
import EditPostForm from '../../features/EditPostForm/EditPostForm.js';

const EditPost = () => {
  return (
    <Container className="w-75">
      <h1>Edit Post</h1>
      <EditPostForm />
    </Container>
  );
};

export default EditPost;
