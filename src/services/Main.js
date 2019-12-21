import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAllMan(params) {
  return request(`/api/task_info/getAllMan?reportno=${params.reportno}&&certcode=${params.certcode}`);
}

export async function getAllReadRecords(params) {
  return request(`/api/readrecord/getAllReadRecords?reportno=${params.reportno}`);
}

//get_pdf
export async function getRecordInfo(params) {
	return request(`/api/recordinfo/get_recordInfo?reportno=${params.reportno}&source=${params.source}`);
}


export async function queryReport(params) {
  return request(`/api/report/get_report?reportNo=${params}`);
}

export async function getRecord(params) {
  return request(`/api/recordinfo/get_record?recordname=${params.recordname}&reportno=${params.reportno}`);
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function getReportByCustoms(params) {
  return request(`/api/report/getReportByCustoms`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
