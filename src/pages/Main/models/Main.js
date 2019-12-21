import { getAllMan} from '@/services/Main';

export default {
  namespace: 'main',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    reports:[],
  },

  effects: {
    *getAllMan({ payload,callback }, { call, put }) {
      const response = yield call(getAllMan, payload);
      if (callback) callback(response);    
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
