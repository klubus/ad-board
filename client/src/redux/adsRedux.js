// selectors
export const getAllAds = (state) => state.ads;

// actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');

// action creators
export const loadAds = (payload) => ({
  type: LOAD_ADS,
  payload,
});

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
    default:
      return statePart;
  }
};

export default adsReducer;
