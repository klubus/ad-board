import { useDispatch } from 'react-redux';
import { addAd } from '../../../redux/adsRedux';
import { useNavigate } from 'react-router-dom';
import PostForm from '../PostForm/PostForm.js';

const AddPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (post) => {
    try {
      const formData = new FormData();

      formData.append('title', post.title);
      formData.append('seller', post.seller);
      formData.append('location', post.location);
      formData.append('description', post.description);
      formData.append('price', Number(post.price));

      if (post.image instanceof File) {
        formData.append('image', post.image);
      }

      const res = await fetch('http://localhost:8000/api/ads', {
        method: 'POST',
        body: formData,
      });

      const newAd = await res.json();

      dispatch(addAd(newAd));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  return <PostForm action={handleSubmit} actionText="Add post" />;
};
export default AddPostForm;
