import request from '@/utils/request';
import { stringify } from 'qs';

export async function getAllMan(params) {
  return request(`/api/task_info/getAllMan?reportno=${params.reportno}&&certcode=${params.certcode}`);
}