import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;



@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
@Form.create()
class CompanyUserManage extends PureComponent {
  state = {
    dataSource:[],
  };

  columns = [

    {
      title: '姓名',
      dataIndex: 'nameC',
    },

    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '出生年月',
      dataIndex: 'birthday',
      render: val => this.isValidDate(val),
    },

    {
      title: '手机',
      dataIndex: 'tel',
    },

    {
      title: '职务',
      dataIndex: 'workduty',
    },

    {
      title: '任职年限',
      dataIndex: 'workyears',
    },


    {
      title: '授权签字',
      dataIndex: 'isauthorize',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.viewInfo(text, record)}>查看&nbsp;&nbsp;</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  };

  viewInfo = text => {
    sessionStorage.setItem('mandetail_certcode',text.certCode);
    sessionStorage.setItem('mandetail_namc',text.nameC);
    router.push({
      pathname:'/Main/ManDetail',
    });
  };

  init =()=>{
    const certCode = sessionStorage.getItem('companyusermanage_certcode');
    const { dispatch } = this.props;
    const params = {
      certCode,
    };
    dispatch({
      type: 'main/getAllUserListByCertCode',
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
    const certCode = sessionStorage.getItem('companyusermanage_certcode');
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode,
      };
      dispatch({
        type: 'main/getAllUserListByCertCode',
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

  back = () =>{
    this.props.history.goBack();
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
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="userName">用户名</Option>
                  <Option value="nameC">姓名</Option>
                  <Option value="place">地址</Option>
                  <Option value="tel">电话</Option>
                  <Option value="section">部门</Option>
                  <Option value="role">权限角色</Option>
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
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
                返回
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };



  render() {
    const {
      loading,

    } = this.props;
    const {  dataSource} = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="userName"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CompanyUserManage;
