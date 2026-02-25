import { useDispatch } from 'react-redux';
import { addAd } from '../../../redux/adsRedux.js';
import { useNavigate } from 'react-router-dom';
import AdForm from '../AdForm/AdForm.js';

const AddAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (ad) => {
    try {
      const formData = new FormData();

      formData.append('title', ad.title);
      formData.append('location', ad.location);
      formData.append('description', ad.description);
      formData.append('price', Number(ad.price));

      if (ad.image instanceof File) {
        formData.append('image', ad.image);
      }

      const res = await fetch('http://localhost:8000/api/ads', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const newAd = await res.json();

      dispatch(addAd(newAd));
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  return <AdForm action={handleSubmit} actionText="Add ad" />;
};
export default AddAdForm;
