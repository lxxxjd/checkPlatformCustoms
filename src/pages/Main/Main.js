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
  Modal,
  Rate,
  notification,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import moment from 'moment';




const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))

@Form.create()
class Main extends PureComponent {
  state = {
    visible:false,
    peopleVisible:false,
    man:[],
    reportno:null,
  };
  columns1 = [
    {
      title: '检验人员',
      dataIndex: 'inspman',
    },

    {
      title: '联系方式',
      dataIndex: 'tel',
    },
    {
      title: '任务',
      dataIndex: 'inspway',
    },
  ];
  columns = [
    {
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },
    {
      title: '委托人',
      dataIndex: 'applicant',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '状态日期',
      dataIndex: 'overalltime',
      render: val => this.handleDate(val),
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.peopleItem(text, record)}>人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.fileItem(text, record)}>审批</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    const { dispatch } = this.props;
    dispatch({
      type: 'main/getReportByConfigor',
      payload: params,
      callback:response =>{

      }
    });
  }

  rateItem = text =>{
    this.setState({reportno:text.reportno});
    this.setState({visible:true});
  };

  handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };


  peopleItem = text =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'main/getAllMan',
      payload: {
        reportno:text.reportno,
        certcode:text.certcode,
      },
      callback:response =>{
        if (response.code === 200) {
          this.setState({man:response.data});
        }
      }
    });
    this.setState({peopleVisible:true});
  };


  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Applicant/DetailForAccept',
    });
  };

  handleFormReset = () => {

    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    const { form,dispatch } = this.props;
    form.resetFields();
    const params = {
      consigoruser:user.userName,
      source:'已受理'
    };
    dispatch({
      type: 'applicant/getReportByConfigor',
      payload: params,
    });
  };



  handleSearch = e => {

    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("customs_userinfo"));
      const values = {
        ...fieldsValue,
        consigoruser:user.userName,
        source:'已受理'
      };
      dispatch({
        type: 'applicant/getReportByConfigor',
        payload: values,
      });
    });
  };

  handleCancel = () =>{
    this.setState({peopleVisible:false});
  };

  handleOk = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const {reportno} = this.state;
    form.validateFields((err, fieldsValue) => {
      console.log(err);
      if (err) return;
      const user = JSON.parse(localStorage.getItem("customs_userinfo"));
      const values = {
        ...fieldsValue,
        consigoruser:user.userName,
        reportno,
      };
      dispatch({
        type: 'applicant/addEvaluation',
        payload: values,
        callback: (response) =>{
          if (response.code === 200) {
            notification.open({
              message: '评分成功',
            });
            this.componentDidMount();
          }else {
            notification.open({
              message: '评分失败',
              description: response.data,
            });
          }
        }
      });
      this.setState({visible:false});
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
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="reportno">委托编号</Option>
                  <Option value="applicant">委托人</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="cargoname">检查品名</Option>
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
      applicant: {reports},
      loading,
      form:{getFieldDecorator}
    } = this.props;
    const { visible,peopleVisible ,man} = this.state;
    return (
      <PageHeaderWrapper>
        <Card size='small' bordered={false}>
          <div>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              className={styles.antTable}
              rowClassName={styles.antTable2}
              loading={loading}
              rowKey='reportno'
              dataSource={reports}
              columns={this.columns}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        <Modal
          title="人员"
          visible={peopleVisible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <Table
              size="middle"
              loading={loading}
              rowKey='inspman'
              dataSource={man}
              columns={this.columns1}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
        </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Main;
