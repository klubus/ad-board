import Container from 'react-bootstrap/Container';
import AddPostForm from '../../features/AddPostForm/AddPostForm';

const AddPost = () => {
  return (
    <Container className="w-75">
      <h1>Add Post</h1>
      <AddPostForm />
    </Container>
  );
};

export default AddPost;
