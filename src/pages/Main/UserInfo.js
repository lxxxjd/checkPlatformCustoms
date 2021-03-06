import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Modal,
  Radio,
  Table,
  DatePicker,
  notification,
  Upload,
  Icon,
  message,Popover,Progress
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfo.less';
import moment from 'moment'


const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};


const OldPassWordForm = Form.create()(props => {
  const { form, handleOld, handleOldPasswordVisible,OldPasswordVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleOld(fieldsValue);
    });
  };

  const checkConfirm = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('oldpassword')) {
      callback('密码不一致');
    } else {
      callback();
    }
  };

  return (
    <Modal
      title="确认原密码"
      style={{ top: 100 }}
      visible={OldPasswordVisible}
      onOk={okHandle}
      onCancel={() => handleOldPasswordVisible()}
    >
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原密码">
        {form.getFieldDecorator('oldpassword', {
          rules: [
            {
              required: true,
              message: "请输入原密码",
            },
          ],
        })(<Input placeholder="请输入原密码" type="password" />)}
      </Form.Item>

      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="确认原密码">
        {form.getFieldDecorator('oldconfirm', {
          rules: [
            {
              required: true,
              message: "请再次输入原密码",
            },
            {
              validator: checkConfirm,
            },
          ],
        })(<Input placeholder="请再次输入原密码" type="password" />)}
      </Form.Item>
    </Modal>
  );
});

@Form.create()
@connect(({ register, loading }) => ({
  register,
  loading: loading.models.register,
}))
class UserInfo extends PureComponent {

	state = {
		count: 0,
		user:{},
		parents:[],
		help:'',
		visible: false,
		passwordVisible:false,
		phoneVisible:false,
    OldPasswordVisible:false,
	};
	componentDidMount() {
	    const {
	    	dispatch ,
	    	form
	    } = this.props;
	    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
	    this.setState({user});
	    form.setFieldsValue({
			'company':user.company,
			'isvisible':user.isvisible,
			'tel':user.tel,
			'nameC':user.nameC
		});
	};

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user = JSON.parse(localStorage.getItem("customs_userinfo"));
	    validateFieldsAndScroll((error, values) => {
	    	console.log(error);
	      if (!error) {
	        // submit the values
	        user.company = form.getFieldValue('company');
	        user.tel = form.getFieldValue('tel');
	        user.isvisible = form.getFieldValue('isvisible');
	        dispatch({
	          type: 'register/updateCustomsUser',
	          payload: {
	          	...user,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              localStorage.setItem('customs_userinfo',JSON.stringify(user));
	              this.componentDidMount();
	            } else {
	              notification.open({
	                message: '修改失败',
	                description: response.data,
	              });
	            }
	          }
	        });
	      }
	    });
	};

	modifyPassword = () =>{
		const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user = JSON.parse(localStorage.getItem("customs_userinfo"));
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        user.password = form.getFieldValue('password');
	        dispatch({
	          type: 'register/updateCustomsUser',
	          payload: {
	          	...user,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              this.setState({passwordVisible:false});
	              localStorage.setItem('customs_userinfo',JSON.stringify(user));
	              this.componentDidMount();
	            } else {
	              notification.open({
	                message: '修改失败',
	                description: response.data,
	              });
	            }
	          }
	        });
	      }
	    });
	};

	modifyPhone = () =>{
		const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let user = JSON.parse(localStorage.getItem("customs_userinfo"));
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        user.tel = form.getFieldValue('tel');
	        dispatch({
	          type: 'register/verifyTel',
	          payload:{
	          	tel:values.tel,
	          	verifyCode:values.captcha,
	          },
	          callback: (response) => {
	          	if(response === "success"){
	          		dispatch({
			          type: 'register/updateCustomsUser',
			          payload: {
			          	...user,
			          },
			          callback: (response) => {
			            if (response.code === 200) {
			              notification.open({
			                message: '修改成功',
			              });
			              this.setState({phoneVisible:false});
			              localStorage.setItem('customs_userinfo',JSON.stringify(user));
			              this.componentDidMount();
			            } else {
			              notification.open({
			                message: '修改失败',
			                description: response.data,
			              });
			            }
			          }
			        });
	          	}else{
	          		message.error("验证码错误");
	          	}
	          }
	      	});
	      }
	    });
	};

	checkPassword = (rule, value, callback) => {
		if(this.state.passwordVisible === false){
			callback();
		}
		const {
			visible,
			confirmDirty
		} = this.state;
		if (!value) {
			this.setState({
				help: '请输入密码',
				visible: !!value,
			});
			callback('error');
		} else {
			this.setState({
				help: '',
			});
			if (!visible) {
				this.setState({
					visible: !!value,
				});
			}
			if (value.length < 6) {
				callback('error');
			} else {
				const {
					form
				} = this.props;
				if (value && confirmDirty) {
					form.validateFields(['confirm'], {
						force: true
					});
				}
				callback();
			}
		}
	};
	checkConfirm = (rule, value, callback) => {
		const {
			form
		} = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('密码不一致');
		} else {
			callback();
		}
	};

	showPassword= () => {
    this.handleOldPasswordVisible(true);
	};

	handleCancel= () =>{
		this.setState({passwordVisible:false});
		this.setState({phoneVisible:false});
	};

  handleOldPasswordVisible = (flag) => {
    this.setState({
      OldPasswordVisible: !!flag,
    });
  };


  getPasswordStatus = () => {
		const {
			form
		} = this.props;
		const value = form.getFieldValue('password');
		if (value && value.length > 9) {
			return 'ok';
		}
		if (value && value.length > 5) {
			return 'pass';
		}
		return 'poor';
	};

	onGetCaptcha = () => {
	    let count = 59;
	    this.setState({
	        count
	    });
	    this.interval = setInterval(() => {
	        count -= 1;
	        this.setState({
	            count
	        });
	        if (count === 0) {
	            clearInterval(this.interval);
	        }
	    }, 1000);
	    const {form, dispatch} = this.props;
	    const tel = form.getFieldValue("tel");
	    // 判断电话是否未空
	    if (tel === undefined) {
	        message.success("电话号码不能为空");
	    } else {
	        // 存在电话号码
	        dispatch({
	            type: 'register/sendVerify',
	            payload: {
	                tel
	            },
	            callback: (response) => {
	                if (response) {
	                    // 请求服务成功
	                    if (response === "success") {
	                        message.success("发送成功");
	                    } else {
	                        // 失败
	                        Modal.info({
	                            title: formatMessage({
	                                id: 'app.login.verification-code-warning.noExist'
	                            }),
	                        });
	                    }
	                }
	            }
	        });
	    }
	};


	getRepeatTel = (rule, value, callback) => {
	    const {dispatch} = this.props;
	    dispatch({
	        type: 'register/getRepeatTel',
	        payload: {
	            tel: value
	        },
	        callback: (response) => {
	            if (response === undefined || response === "null" ) {
	                callback("号码已注册");
	            } else if (response === "号码已注册") {
	                callback("号码已注册");
	            } else {
	                callback();
	            }
	        }
	    });
	};
	showModifyPhone = () =>{
		this.setState({phoneVisible:true});
	};

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  handleOld=(fieldValues)=>{
    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    if(fieldValues.oldpassword ===user.password){
      this.setState({passwordVisible:true});
    }else{
      message.error("您的原密码确认错误");
    }
    this.handleOldPasswordVisible(false);
  };


  render() {
 		const { getFieldDecorator } = this.props.form;
 		const FormItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
	    const { user ,help,visible, passwordVisible,phoneVisible, count,OldPasswordVisible} = this.state;
      const parentMethods = {
        handleOldPasswordVisible: this.handleOldPasswordVisible,
        handleOld:this.handleOld,
      };
 		return(
 			<Card>
	 			<Form {...FormItemLayout} >
	 				<Form.Item label="用户名">
						<span className="ant-form-text">{user.username}</span>
			        </Form.Item>
			        <Form.Item label='隶属海关：'>
                <span className="ant-form-text">{user.company}</span>
			          </Form.Item>
			          <Form.Item label='手机号码：'>
                  <span className="ant-form-text">{user.tel}</span>
		              <Fragment><a onClick={() => this.showModifyPhone()}>&nbsp;&nbsp;修改手机</a></Fragment>
			          </Form.Item>
			          <Form.Item label='联系方式:'>
			                {getFieldDecorator('isvisible', {
			                  rules: [
			                    {
			                      required: true,
			                      message: '请选择是否可见',
			                    },
			                  ],
			                })(
			                  <Radio.Group >
			                    <Radio value='可见'>可见</Radio>
			                    <Radio value='不可见'>不可见</Radio>
			                  </Radio.Group>                )}
			          </Form.Item>
			    	<Form.Item label='姓名：'>
		                {getFieldDecorator('nameC', {
		                  rules: [
		                    {
		                      required: true,
		                      message: formatMessage({ id: 'validation.company.required' }),
		                    },
		                  ],
		                })(
		                  <Input placeholder={formatMessage({ id: 'form.company.placeholder' })} />
		                )}
			         </Form.Item>
			        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
						<Button type="primary" onClick={this.showPassword}>
					  	修改密码
						</Button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<Button type="primary" onClick={this.handleSubmit}>
					  	保存
						</Button>
			        </Form.Item>
			        <Modal
			        	title="设置新密码"
          				visible={passwordVisible}
          				onOk={this.modifyPassword}
          				onCancel={this.handleCancel}>
          				<Form.Item label='新密码:' help={help}>
			                <Popover
			                  getPopupContainer={node => node.parentNode}
			                  content={
			                    <div style={{ padding: '4px 0' }}>
			                      {passwordStatusMap[this.getPasswordStatus()]}
			                      {this.renderPasswordProgress()}
			                      <div style={{ marginTop: 10 }}>
			                        <FormattedMessage id="validation.password.strength.msg" />
			                      </div>
			                    </div>
			                  }
			                  overlayStyle={{ width: 240 }}
			                  placement="right"
			                  visible={visible}
			                >
			                  {getFieldDecorator('password', {
			                    rules: [
			                      {
			                        validator: this.checkPassword,
			                      },
			                    ],
			                  })(
			                    <Input
			                      type="password"
                            placeholder="请输入新密码"
			                    />
			                  )}
			                </Popover>
				        </Form.Item>
          				<Form.Item label='确认新密码:'>
							{getFieldDecorator('confirm', {
			                  rules: [
			                   passwordVisible ?[{
			                      required: true,
			                      message: '请输入新密码',
			                    }]:[],
			                    {
			                      validator: this.checkConfirm,
			                    },
			                  ],
			                })(
			                  <Input
			                    type="password"
			                    placeholder='请确认输入新密码'
			                  />
			                )}
				          </Form.Item>
			        </Modal>
			        <Modal
			        	title="修改手机"
          				visible={phoneVisible}
          				onOk={this.modifyPhone}
          				onCancel={this.handleCancel}>
          				<Form.Item label='手机号:' >
			                {getFieldDecorator('tel', {
			                    rules: [
			                      {
			                        required: true,
			                        message: formatMessage({ id: 'validation.phone-number.required' }),
			                      },
			                      {
			                        pattern: /^\d{11}$/,
			                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
			                      },
			                      {
			                        validator: this.getRepeatTel,
			                      },
			                    ],
			                  })(
			                    <Input
			                      style={{ width: '75%' }}
			                      placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
			                    />
			                  )}
				        </Form.Item>
          				<Form.Item label='验证码:'>
							{getFieldDecorator('captcha', {
			                  rules:
			                  	phoneVisible ?
			                    [{
			                      required: true,
			                      message: formatMessage({ id: 'validation.verification-code.required' }),
			                    }]:[],
			                })(
			                  <Input
			                   	style={{ width: '50%' }}
			                    placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
			                  />
			                )}
			                <Button
			                  disabled={count}
			                  className={styles.getCaptcha}
			                  onClick={this.onGetCaptcha}
			                >
			                  {count
			                    ? `${count} s`
			                    : formatMessage({ id: 'app.register.get-verification-code' })}
			                </Button>
				        </Form.Item>
			        </Modal>
			    </Form>
        <OldPassWordForm {...parentMethods} OldPasswordVisible={OldPasswordVisible} />
		    </Card>
 		);
 	}
}

export default UserInfo;
