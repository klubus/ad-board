import { useDispatch } from 'react-redux';
import { editAd } from '../../../redux/adsRedux.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import AdForm from '../AdForm/AdForm.js';
import { getAdById } from '../../../redux/adsRedux.js';
import { useEffect } from 'react';

const EditAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const postData = useSelector((state) => getAdById(state, id));

  useEffect(() => {
    if (!postData) {
      navigate('/');
    }
  }, [postData, navigate]);

  if (!postData) return null;

  const handleSubmit = (post) => {
    dispatch(editAd({ ...post, id }));
    navigate('/');
  };

  return (
    <AdForm
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
export default EditAdForm;
