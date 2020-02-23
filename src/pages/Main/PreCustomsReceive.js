import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale/index';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Modal, DatePicker,
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;




// 修改的Form
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleEdit, handleModalVisible,modalInfo } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleEdit(fieldsValue,modalInfo);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="业务来源修改"
      style={{ top: 100 }}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="业务来源名称">
        {form.getFieldDecorator('itemname', {
          initialValue: modalInfo.itemname,
          rules: [
            {
              required: true,
              message: "请输入业务来源名称",
            },
          ],
        })(<Input placeholder="请输入业务来源名称" />)}
      </FormItem>


    </Modal>
  );
});


@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
@Form.create()
class PreCustomsReceive extends PureComponent {
  state = {
    modalVisible: false,
    modalInfo :{},
    dataSource:[],
  };

  columns = [


    {
      title: '检验机构',
      dataIndex: 'namec',
    },
    {
      title: '提交日期',
      dataIndex: 'applydate',
      render: val => this.isValidDate(val),
    },
    {
      title: '提交人',
      dataIndex: 'applyman',
    },

    {
      title: '联系电话',
      dataIndex: 'applytel',
    },

    {
      title: '状态',
      dataIndex: 'status',
    },



    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.modifyItem(text, record)}>修改 &nbsp;&nbsp;</a>
          <a onClick={() => this.toUserInfo(text, record)}>人员信息 &nbsp;&nbsp;</a>
          <a onClick={() => this.toIntrusment(text, record)}>仪器设备 &nbsp;&nbsp;</a>
          <a onClick={() => this.toCompanyinfo(text, record)}>公司信息 &nbsp;&nbsp;</a>
          <a onClick={() => this.deleteItem(text, record)}>删除</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const { dispatch } = this.props;
    const params = {
      customsCompany:user.company
    };
    dispatch({
      type: 'main/getPreCustomReceiveListByCustomsName',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response.data;
        }
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
  };

  handleSearch = e=> {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const user = JSON.parse(localStorage.getItem("userinfo"));
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        customsCompany:user.company
      };
      dispatch({
        type: 'main/getPreCustomReceiveListByCustomsName',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response.data;
          }
        }
      });
    });
  };

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  modifyItem = text => {
    this.setState({
      modalInfo:text,
    });
    this.handleModalVisible(true);
  };

  toUserInfo = text => {
    sessionStorage.setItem('companyusermanage_certcode',text.certcode);
    router.push({
      pathname:'/Main/CompanyUserManage',
    });
  };

  toIntrusment = text => {
    sessionStorage.setItem('companyusermanage_certcode',text.certcode);
    router.push({
      pathname:'/Main/Intrusment',
    });
  };

  toCompanyinfo = text => {
    sessionStorage.setItem('companyusermanage_certcode',text.certcode);
    router.push({
      pathname:'/Main/CompanyInfo',
    });
  };

  deleteItem = text =>{
    const { dispatch } = this.props;
    const values = {
      ...text
    };
    dispatch({
      type: 'main/deleteBusinessSource',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          this.init();
          message.success("删除成功");
        } else{
          message.success("删除失败");
        }
      }
    });
  };





  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  handleEdit = (fields,modalInfo) => {
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    let prams = modalInfo;
    prams.itemname =  fields.itemname;
    const values = {
      ...prams
    };
    console.log(values);
    dispatch({
      type: 'main/updateBusinessSource',
      payload:values,
      callback: (response) => {
        if(response==="success"){
          message.success("保存成功");
          this.init();
        } else {
               message.error("保存失败");
        }
      }
    });
    this.setState({
      modalVisible: false,
    });
  };


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:"applyman",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="applyman">提交人</Option>
                  <Option value="applytel">联系电话</Option>
                  <Option value="status">状态</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }




  render() {
    const {
      loading,
      dispatch,
    } = this.props;

    const {  modalVisible,modalInfo,dataSource} = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <CreateForm {...parentMethods} modalVisible={modalVisible} modalInfo={modalInfo} dispatch={dispatch} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="itemno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PreCustomsReceive;
