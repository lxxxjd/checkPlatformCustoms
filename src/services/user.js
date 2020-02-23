import { stringify } from 'qs';
import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function getRepeatTel(params) {
  return request(`/api/customsuser/getRepeatTel?tel=${params.tel}`);
}

export async function getRepeatUsername(params) {
  return request(`/api/customsuser/getRepeatUsername?username=${params.username}`);
}

export async function getUserByCertCodeAndName(params) {
  return request(`/api/user/getUserByCertCodeAndName?certCode=${params.certCode}&nameC=${params.nameC}`);
}



// 发送验证码
export async function sendVerify(params) {
  return request(`/api/verify/send_verify?tel=${params.tel}`);
}

// 验证验证码
export async function verifyTel(params) {
  return request(`/api/verify/verify_tel?verifyCode=${params.verifyCode}&tel=${params.tel}`);
}

// 得到所有user
export async function getUserList() {
  return request(`/api/user/getUserList`);
}


// 预注册公司
export async function addCustomsUser(params) {
  return request(`/api/customsuser/addCustomsUser`,{
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function updateCustomsUser(params) {
  return request(`/api/customsuser/updateCustomsUser`,{
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}





