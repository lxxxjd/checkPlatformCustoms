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
  Table, message, Modal, DatePicker,Descriptions
} from 'antd/lib/index';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment/moment';
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;



// 查看框
const ReviewFrom = (props => {
  const { modalReviewVisible, handleModalReviewVisible,modalInfo } = props;

  // 处理操作时间
  const handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  return (
    <Modal
      destroyOnClose
      title="查看仪器详情"
      visible={modalReviewVisible}
      width={document.body.clientWidth*0.6}
      height={document.body.clientHeight*0.9}
      style={{ top: 100 }}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Descriptions bordered>
        <Descriptions.Item label="设备编号">{modalInfo.diviceid}</Descriptions.Item>
        <Descriptions.Item label="设备名称">{modalInfo.divicename}</Descriptions.Item>
        <Descriptions.Item label="规格/型号">{modalInfo.specifications}</Descriptions.Item>
        <Descriptions.Item label="国别/生产厂">{modalInfo.manufacturer}</Descriptions.Item>
        <Descriptions.Item label="购置日期">{handleDate(modalInfo.buydate)}</Descriptions.Item>
        <Descriptions.Item label="验收日期">{handleDate(modalInfo.acceptdate)}</Descriptions.Item>
        <Descriptions.Item label="验收人员">{modalInfo.acceptman}</Descriptions.Item>
        <Descriptions.Item label="使用日期">{handleDate(modalInfo.usedate)}</Descriptions.Item>
        <Descriptions.Item label="使用部门">{modalInfo.usesection}</Descriptions.Item>
        <Descriptions.Item label="保管人">{modalInfo.custodian}</Descriptions.Item>
        <Descriptions.Item label="价值">{modalInfo.value}</Descriptions.Item>
        <Descriptions.Item label="检定日期">{handleDate(modalInfo.checkdate)}</Descriptions.Item>
        <Descriptions.Item label="检定周期（月）">{modalInfo.checkcycle}</Descriptions.Item>
        <Descriptions.Item label="检定单位">{modalInfo.checkCompany}</Descriptions.Item>
        <Descriptions.Item label="报废日期">{handleDate(modalInfo.scrapdate)}</Descriptions.Item>
        <Descriptions.Item label="状态">{modalInfo.status}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
});


@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
@Form.create()
class main extends PureComponent {
  state = {
    modalVisible: false,
    addModalVisible:false,
    modalReviewVisible:false,
    modalInfo :{},
    dataSource:[],

    userListData:[], // 本公司所有人员
    departListResult:[], // 本公司所有部门
  };

  columns = [

    {
      title: '设备编号',
      dataIndex: 'diviceid',
    },

    {
      title: '设备名称',
      dataIndex: 'divicename',
    },
    // {
    //   title: '规格/型号',
    //   dataIndex: 'specifications',
    // },

    // {
    //   title: '国别/生产厂',
    //   dataIndex: 'manufacturer',
    // },
    //
    {
      title: ' 首次使用 ',
      dataIndex: 'buydate',
      render: val => this.isValidDate(val),
    },

    // {
    //   title: ' 验收日期 ',
    //   dataIndex: 'acceptdate',
    //   render: val => this.isValidDate(val),
    // },
    //
    // {
    //   title: '验收人员',
    //   dataIndex: 'acceptman',
    // },
    //
    // {
    //   title: '使用日期',
    //   dataIndex: 'usedate',
    //   render: val => this.isValidDate(val),
    // },

    {
      title: '使用部门',
      dataIndex: 'usesection',
    },


    // {
    //   title: '保管人',
    //   dataIndex: 'custodian',
    // },

    // {
    //   title: '价值',
    //   dataIndex: 'value',
    // },
    //
    //
    {
      title: '检定日期',
      dataIndex: 'checkdate',
      render: val => this.isValidDate(val),
    },


    {
      title: '检定周期（月）',
      dataIndex: 'checkcycle',
    },
    //
    // {
    //   title: '检定单位',
    //   dataIndex: 'checkCompany',
    // },
    //
    // {
    //   title: '报废日期',
    //   dataIndex: 'scrapdate',
    //   render: val => this.isValidDate(val),
    // },


    {
      title: '状态',
      dataIndex: 'status',
    },


    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleReview(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];




  componentDidMount() {
    this.init();
  }

  init =()=>{
    const certCode = sessionStorage.getItem('companyusermanage_certcode');
    const { dispatch } = this.props;
    const params = {
      certCode
    };
    dispatch({
      type: 'main/getInstrumentList',
      payload: params,
      callback: (response) => {
        if (response){
          this.state.dataSource = response;
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
      const certCode = sessionStorage.getItem('companyusermanage_certcode');
      const values = {
        kind :fieldsValue.kind.trim(),
        value: fieldsValue.value.trim(),
        certCode
      };
      dispatch({
        type: 'main/getInstrumentList',
        payload: values,
        callback: (response) => {
          if (response){
            this.state.dataSource = response;
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



  handleReview = (flag,text) => {
    this.state.modalInfo = text;
    this.handleModalReviewVisible(flag);
  };


  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
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
                initialValue:"divicename",
                rules: [{  message: '搜索类型' }],
              })(
                <Select placeholder="搜索类型">
                  <Option value="diviceid">设备编号</Option>
                  <Option value="divicename">设备名称</Option>
                  <Option value="specifications">规格/型号</Option>
                  <Option value="manufacturer">国别/生产厂</Option>
                  <Option value="usesection">使用部门</Option>
                  <Option value="checkCompany">检定单位</Option>
                  <Option value="acceptman">验收组人员</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '搜索数据' }],})(<Input style={{ width: '100%' }} placeholder="请输入" />)}
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
  }




  render() {
    const {
      loading,
    } = this.props;

    const {  modalInfo,dataSource,modalReviewVisible} = this.state;
    const parentMethods = {
      handleModalReviewVisible:this.handleModalReviewVisible,
    };


    return (
      <PageHeaderWrapper>
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <ReviewFrom {...parentMethods} modalReviewVisible={modalReviewVisible} modalInfo={modalInfo} />
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={loading}
              dataSource={dataSource}
              columns={this.columns}
              rowKey="keyno"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default main;
