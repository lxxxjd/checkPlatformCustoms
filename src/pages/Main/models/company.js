import { getManRecord,getUrl,getCompany,getParent} from '@/services/company';
import { getUserByCertCodeAndName} from '@/services/user';
import {getRecordCompanyList} from '@/services/Recordinfo';

export default {
  namespace: 'company',
  state: {

  },
  effects: {

    *getRecordCompanyList({ payload,callback }, { call, put }) {
      const response = yield call(getRecordCompanyList, payload);
      if (callback) callback(response);
    },

    *getCompany({ payload,callback }, { call, put }) {
      const response = yield call(getCompany, payload);
      if (callback) callback(response);
    },

    *getParent({ payload,callback }, { call, put }) {
      const response = yield call(getParent, payload);
      if (callback) callback(response);
    },

    *getManRecord({ payload,callback }, { call, put }) {
      const response = yield call(getManRecord, payload);
      if (callback) callback(response);
    },

    *getUrl({ payload,callback }, { call, put }) {
      const response = yield call(getUrl, payload);
      if (callback) callback(response);
    },

    *getUserByCertCodeAndName({ payload,callback }, { call, put }) {
      const response = yield call(getUserByCertCodeAndName, payload);
      if (callback) callback(response);
    },



  },

  reducers: {

  }

};
