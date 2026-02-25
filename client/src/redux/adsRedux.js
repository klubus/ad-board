import shortid from 'shortid';

// selectors
export const getAllAds = (state) => state.ads;
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad._id === adId);

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');

// action creators
export const loadAds = (payload) => ({
  type: LOAD_ADS,
  payload,
});

export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });

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

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
      return action.payload;
    case ADD_AD:
      return [...statePart, { ...action.payload, _id: shortid() }];
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    default:
      return statePart;
  }
};

export default adsReducer;
