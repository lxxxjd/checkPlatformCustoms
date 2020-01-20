import { getAllMan, getReportByCustoms, getAllReadRecords, getRecordInfo, queryReport, getRecord,addReadRecordByCustoms,returnReadRecordByCustoms} from '@/services/Main';
import {addReadRecord}  from '@/services/costoms';


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
    report:{},
    getReportByCustomsResult:[],
  },

  effects: {

    *addReadRecord({ payload,callback }, { call, put }) {
      const response = yield call(addReadRecord, payload);
      if (callback) callback(response.data);
    },


    // 海关审阅
    *addReadRecordByCustoms({ payload,callback }, { call, put }) {
      const response = yield call(addReadRecordByCustoms, payload);
      if (callback) callback(response.data);
    },

    // 海关退回
    *returnReadRecordByCustoms({ payload,callback }, { call, put }) {
      const response = yield call(returnReadRecordByCustoms, payload);
      if (callback) callback(response.data);
    },

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
        readRecords: payload.data,
      }
    },
    getReportByCustomsResult(state, { payload }) {
      return {
        ...state,
        getReportByCustomsResult: payload.data,
      };
    },
  },
};
