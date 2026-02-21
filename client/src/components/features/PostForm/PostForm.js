import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
// import { getAllCategories } from '../../../redux/categoriesRedux';
// import { useSelector } from 'react-redux';

const PostForm = ({ action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [seller, setSeller] = useState(props.seller || '');
  const [publishedDate, setPublishedDate] = useState(props.publishedDate || '');
  const [description, setDescription] = useState(props.description || '');
  const [price, setPrice] = useState(props.price || '');
  const [image, setImage] = useState(props.image || '');
  // const [location, setLocation] = useState(props.location || '');
  const [priceError, setPriceError] = useState();
  const [dateError, setDateError] = useState();

  const isEmpty = price.replace(/<(.|\n)*?>/g, '').trim() === '';
  // const categories = useSelector(getAllCategories);

  const handleSubmit = () => {
    setPriceError(isEmpty);
    setDateError(!publishedDate);

    if (!isEmpty && publishedDate) {
      action({
        title,
        seller: seller,
        publishedDate,
        description,
        price,
        image,
      });
    }
  };

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', { required: true, minLength: 3 })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            Title is too short (min is 3)
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          {...register('seller', { required: true, minLength: 3 })}
          type="text"
          value={seller}
          placeholder="Enter seller"
          onChange={(e) => setSeller(e.target.value)}
        />
        {errors.seller && (
          <small className="d-block form-text text-danger mt-2">
            Author is too short (min is 3)
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPublished">
        <Form.Label>Published</Form.Label>
        <br></br>
        <DatePicker
          selected={publishedDate}
          onChange={(date) => setPublishedDate(date)}
        />
        {dateError && (
          <small className="d-block form-text text-danger mt-2">
            Published date can't be empty
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => {
            // e.target.files to tablica wybranych plików, zwykle pierwszy plik
            setImage(e.target.files[0]);
          }}
        />
      </Form.Group>{' '}
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...register('description', { required: true, minLength: 20 })}
          as="textarea"
          rows={3}
          placeholder="Leave a comment here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <small className="d-block form-text text-danger mt-2">
            Short description is too short (min is 20){' '}
          </small>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control
          {...register('price', { required: true, minLength: 3 })}
          value={title}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Enter price"
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            Title is too short (min is 3)
          </small>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        {actionText}
      </Button>
    </Form>
  );
};
export default PostForm;
