import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';

const AdForm = ({ action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [location, setLocation] = useState(props.location || '');
  const [description, setDescription] = useState(props.description || '');
  const [price, setPrice] = useState(props.price || '');
  const [image, setImage] = useState(props.image || null);

  const [priceError, setPriceError] = useState(false);
  const [locationError, setLocationError] = useState('');

  const isPriceEmpty = price.toString().trim() === '';

  const handleSubmit = () => {
    setPriceError(isPriceEmpty);
    setLocationError(!location);

    if (!isPriceEmpty && location) {
      const imageToSubmit = image instanceof File ? image : image;

      action({
        title,
        location,
        description,
        price,
        image: imageToSubmit,
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
      {/* Title */}
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', { required: true, minLength: 10 })}
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <small className="d-block form-text text-danger mt-2">
            Title is too short (min 3 characters)
          </small>
        )}
      </Form.Group>

      {/* Location */}
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Location</Form.Label>
        <Form.Control
          {...register('location', { required: true, minLength: 3 })}
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {errors.location && (
          <small className="d-block form-text text-danger mt-2">
            Title is too short (min 3 characters)
          </small>
        )}
      </Form.Group>

      {/* Image */}
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && !(image instanceof File) && (
          <small className="d-block form-text text-muted mt-2">
            Current image: {image}
          </small>
        )}
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          {...register('description', { required: true, minLength: 20 })}
          as="textarea"
          rows={4}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <small className="d-block form-text text-danger mt-2">
            Description is too short (min 20 characters)
          </small>
        )}
      </Form.Group>

      {/* Price */}
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          {...register('price', { required: true })}
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {(errors.price || priceError) && (
          <small className="d-block form-text text-danger mt-2">
            Price is required
          </small>
        )}
      </Form.Group>

      {props.seller && (
        <Form.Group className="mb-3">
          <Form.Label>Seller</Form.Label>
          <Form.Control
            type="text"
            value={props.seller.login}
            disabled
            readOnly
          />
        </Form.Group>
      )}

      <Button variant="primary" type="submit">
        {actionText}
      </Button>
    </Form>
  );
};

export default AdForm;
