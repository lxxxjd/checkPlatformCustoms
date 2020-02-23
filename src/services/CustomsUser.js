import request from '@/utils/request';
import { stringify } from 'qs';


export async function getCustomsUsers(params) {
  return request(`/api/customsuser/getCustomsUsers`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateCustomsUser(params) {
  if(params.role!==undefined && params.role!==null){
    params.role = params.role.join(" ");
  }
  return request(`/api/customsuser/updateCustomsUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function addCustomsUser(params) {
  if(params.role!==undefined && params.role!==null){
    params.role = params.role.join(" ");
  }
  return request(`/api/customsuser/addCustomsUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}
export async function deleteCustomsUser(params) {
  return request(`/api/customsuser/deleteCustomsUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getCustomsUserListByCustomName(params) {
  return request(`/api/customsUser/getCustomsUserListByCustomName`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function getCustomsNameStringByCustomName(params) {
  return request(`/api/customsUser/getCustomsNameStringByCustomName`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}



export async function getRepeatUsername(params) {
  return request(`/api/customsuser/getRepeatUsername?username=${params.username}`);
}



