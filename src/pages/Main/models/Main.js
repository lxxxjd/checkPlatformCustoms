import { getAllMan,getReportByCustoms} from '@/services/Main';

export default {
  namespace: 'main',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    reports:[],
    getReportByCustomsResult:[],
  },

  effects: {
    *getAllMan({ payload,callback }, { call, put }) {
      const response = yield call(getAllMan, payload);
      if (callback) callback(response);
    },

    *getReportByCustoms({ payload,callback }, { call, put }) {
      const response = yield call(getReportByCustoms, payload);
      yield put({
        type: 'getReportByCustomsResult',
        payload: response.data,

      });
      if (callback) callback(response.data);
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    getReportByCustomsResult(state, { payload }) {
      return {
        ...state,
        getReportByCustomsResult: payload.data,
      };
    },
  },
};
