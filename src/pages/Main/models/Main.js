import { getAllMan, getAllReadRecords, getRecordInfo, queryReport, getRecord} from '@/services/Main';

export default {
  namespace: 'main',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    reports:[],
    readRecords:[],
    recordData:[],
    report:{}
  },

  effects: {
    *getAllMan({ payload,callback }, { call, put }) {
      const response = yield call(getAllMan, payload);
      if (callback) callback(response);    
    },
    *getAllReadRecords({ payload,callback }, { call, put }) {
      const response = yield call(getAllReadRecords, payload);
      yield put({
        type: 'getReadRecords',
        payload: response,
      });
      if (callback) callback(response);    
    },
    *getRecordInfo({ payload,callback }, { call, put }) {
      const response = yield call(getRecordInfo, payload);
      yield put({
        type: 'getRecords',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getReport({ payload,callback }, { call, put }) {
      const response = yield call(queryReport, payload);
      yield put({
        type: 'get',
        payload: response,
      });
      if (callback) callback(response.data);
    },
    *getRecord({ payload,callback }, { call, put }) {
      const response = yield call(getRecord, payload);
      yield put({
        type: 'getURL',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    get(state, { payload }) {
      return {
        ...state,
        report: payload.data,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    getRecords(state, { payload }) {
      return {
        ...state,
        recordData : payload.data,
      };
    },
    getReadRecords(state, action) {
      return {
        ...state,
        readRecords: action.payload,
      };
    },
  },
};
