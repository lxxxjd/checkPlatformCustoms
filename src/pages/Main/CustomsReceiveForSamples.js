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

@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
@Form.create()
class CustomsReceiveForSamples extends PureComponent {
  state = {
    dataSource:[],
  };

  columns = [


    {
      title: '检验机构',
      dataIndex: 'namec',
    },
    {
      title: '备案海关名称',
      dataIndex: 'customsname',
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
      title: '已接收',
      dataIndex: 'status',
    },



    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.toSampleIndex(text, record)}>样品指标 &nbsp;&nbsp;</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    const { dispatch } = this.props;
    const params = {
      customsCompany:user.company
    };
    dispatch({
      type: 'main/getCustomReceiveListByCustomsName',
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
      const user = JSON.parse(localStorage.getItem("customs_userinfo"));
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        customsCompany:user.company
      };
      dispatch({
        type: 'main/getCustomReceiveListByCustomsName',
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


  toSampleIndex = text => {
    sessionStorage.setItem('SampleIndex_certCode',text.certcode);
    router.push({
      pathname:'/Main/SampleIndex',
    });
  };


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={5} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:"namec",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="namec">检验机构</Option>
                  <Option value="applyman">联系人</Option>
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
    } = this.props;

    const { dataSource} = this.state;


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
              rowKey="itemno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CustomsReceiveForSamples;
