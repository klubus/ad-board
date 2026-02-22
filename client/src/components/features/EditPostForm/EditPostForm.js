// import { useDispatch } from 'react-redux';
// import { editPost } from '../../../redux/postsRedux';
import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router';
// import { useSelector } from 'react-redux';
import PostForm from '../PostForm/PostForm.js';
// import { getPostById } from '../../../redux/postsRedux.js';
import { useEffect } from 'react';

const EditPostForm = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const { id } = useParams();
  const postData = 'a';
  // useSelector((state) => getPostById(state, id));

  useEffect(() => {
    if (!postData) {
      navigate('/');
    }
  }, [postData, navigate]);

  if (!postData) return null;

  const handleSubmit = (post) => {
    // dispatch(editPost({ ...post, id }));
    navigate('/');
  };

  return (
    <PostForm
      action={handleSubmit}
      actionText="Edit post"
      title={postData.title}
      seller={postData.seller}
      publishedDate={postData.publishedDate}
      description={postData.description}
      price={postData.price}
      location={postData.location}
    />
  );
};
export default EditPostForm;
