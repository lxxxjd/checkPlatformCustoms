import { getAllMan, getReportByCustoms, getAllReadRecords, getRecordInfo, queryReport, getRecord,addReadRecordByCustoms,
  returnReadRecordByCustoms,getCompanyList,selectCheckWeightForCustoms} from '@/services/Main';
import {addReadRecord,getPreCustomReceiveListByCustomsName,acceptReceive,refuseReceive,getCustomReceiveListByCustomsName,}  from '@/services/costoms';
import {getAllUserListByCertCode} from '@/services/Certificate'
import { getInstrument} from '@/services/Intrusment';




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

    *getCustomReceiveListByCustomsName({ payload,callback }, { call, put }) {
      const response = yield call(getCustomReceiveListByCustomsName, payload);
      if (callback) callback(response);
    },

    *getCompanyList({ payload ,callback}, { call, put }) {
      const response = yield call(getCompanyList, payload);
      if (callback) callback(response);
    },

    *selectCheckWeightForCustoms({ payload ,callback}, { call, put }) {
      const response = yield call(selectCheckWeightForCustoms, payload);
      if (callback) callback(response);
    },


    *acceptReceive({ payload,callback }, { call, put }) {
      const response = yield call(acceptReceive, payload);
      if (callback) callback(response.data);
    },

    *refuseReceive({ payload,callback }, { call, put }) {
      const response = yield call(refuseReceive, payload);
      if (callback) callback(response.data);
    },


    *getAllUserListByCertCode({ payload,callback }, { call, put }) {
      const response = yield call(getAllUserListByCertCode, payload);
      if (callback) callback(response);
    },

    *getInstrumentList({ payload,callback }, { call, put }) {
      const response = yield call(getInstrument, payload);
      yield put({
        type: 'getInstrumentResult',
        payload: response,
      });
      if (callback) callback(response.data);
    },

    *addReadRecord({ payload,callback }, { call, put }) {
      const response = yield call(addReadRecord, payload);
      if (callback) callback(response.data);
    },

    *getPreCustomReceiveListByCustomsName({ payload,callback }, { call, put }) {
      const response = yield call(getPreCustomReceiveListByCustomsName, payload);
      if (callback) callback(response);
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
