import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAllMan(params) {
  return request(`/api/task_info/getAllMan?reportno=${params.reportno}&&certcode=${params.certcode}`);
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
