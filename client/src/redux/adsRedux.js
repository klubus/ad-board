// selectors
export const getAllAds = (state) => state.ads;
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad._id === adId);

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');

// action creators
export const loadAds = (payload) => ({
  type: LOAD_ADS,
  payload,
});

export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (adData) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();

      formData.append('title', adData.title);
      formData.append('description', adData.description);
      formData.append('price', adData.price);
      formData.append('location', adData.location);

      if (adData.image instanceof File) {
        formData.append('image', adData.image);
      }

      const res = await fetch(`http://localhost:8000/api/ads/${adData.id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to edit');

      dispatch(fetchAds());
    } catch (err) {
      console.error(err);
    }
  };
};
export const deleteAd = (adId) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:8000/api/ads/${adId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        dispatch({ type: REMOVE_AD, payload: adId });
      } else {
        console.error('Failed to delete ad');
      }
    } catch (err) {
      console.error('Error deleting ad:', err);
    }
  };
};
export const fetchAds = () => {
  return async (dispatch) => {
    try {
      const res = await fetch('http://localhost:8000/api/ads');
      const ads = await res.json();

      dispatch(loadAds(ads));
    } catch (err) {
      console.error('Error:', err);
    }
  };
};

export const searchAds = (searchPhrase) => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/ads/search/${searchPhrase}`
      );

      const ads = await res.json();
      dispatch(loadAds(ads));
    } catch (err) {
      console.error(err);
    }
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
      return action.payload;
    case ADD_AD:
      return [...statePart, { ...action.payload }];
    case EDIT_AD:
      return statePart.map((ad) =>
        ad._id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload);

    default:
      return statePart;
  }
};

export default adsReducer;
