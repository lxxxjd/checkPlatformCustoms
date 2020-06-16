import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Select,
  Table, message, Icon,
  Checkbox,
  Image, Modal, Descriptions,Switch,Tree, Spin, Alert,Rate,Cascader,Tag,
  Layout,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import queryStyles from './MainQuery.less'
import styles from '../table.less';
import areaOptions from './areaOptions';

const { Header, Footer, Sider, Content } = Layout;
const { TreeNode } = Tree;
const { CheckableTag } = Tag;


// 查看框品质异常
const ReviewFrom1 = (props => {
  const { modalReviewVisible1, handleModalReviewVisible1,exceptionData1,loading } = props;
  const columns = [
    {
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },

    {
      title: '指标名称',
      dataIndex:'itemC',
    },
    {
      title: '检验标准',
      dataIndex: 'teststandard',
    },

    {
      title: '检验结果',
      dataIndex: 'testresult',
    },
    {
      title: '参考值',
      dataIndex: 'refervalue1',
    },
    {
      title: '偏差',
      dataIndex: 'diffvalue1',
    },
    {
      title: '样品备注',
      dataIndex: 'weight',
    },
    {
      title: '状态',
      dataIndex: 'qualityerr1',
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="查看品质异常"
      visible={modalReviewVisible1}
      style={{ top: 10 }}
      width={1000}
      onCancel={() => handleModalReviewVisible1()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible1()}>
          关闭
        </Button>
      ]}
    >
      <Table
        size="middle"
        rowKey="keyno"
        loading={loading}
        dataSource={exceptionData1}
        pagination={{showQuickJumper:true,showSizeChanger:true}}
        columns={columns}
      />
    </Modal>
  );
});



// 查看框
const ReviewFrom = (props => {
  const { modalReviewVisible, handleModalReviewVisible,exceptionData,loading } = props;
  const columns = [
    {
      title: '检查项目',
      dataIndex: 'inspway',
    },
    {
      title: '参考值',
      dataIndex: 'quantityd',
    },
    // {
    //   title: '单位',
    //   dataIndex: 'unit',
    // },
    {
      title: '结果',
      dataIndex: 'weight',
    },
    {
      title: '差值',
      dataIndex: 'diff',
    },
    {
      title: '差比（%）',
      dataIndex: 'diffrate',
    },
    {
      title: '状态',
      dataIndex: 'resultcomment',
    },
  ];

  return (
    <Modal
      destroyOnClose
      title="查看异常详情"
      visible={modalReviewVisible}
      style={{ top: 100 }}
      width={600}
      onCancel={() => handleModalReviewVisible()}
      footer={[
        <Button type="primary" onClick={() => handleModalReviewVisible()}>
          关闭
        </Button>
      ]}
    >
      <Table
        size="middle"
        rowKey="reportno"
        loading={loading}
        dataSource={exceptionData}
        pagination={{showQuickJumper:true,showSizeChanger:true}}
        columns={columns}
      />
    </Modal>
  );
});


const CertForm = Form.create()(props => {
  const { form,showVisible,showCancel,value,onSelect,treeData,reviewReport,renderFileInfo,renderTreeNodes,returnReport ,reportDetail,user,isValidDate} = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        message.error("请填写质量评价");
        return;
      }
      reviewReport(fieldsValue);
      form.resetFields();
    });
  };

  const okHandleReturn = () => {
    form.validateFields((err, fieldsValue) => {
      if (err){
        message.error("请填写质量评价");
        return;
      }
      returnReport();
      form.resetFields();
    });
  };


  return (
    <Modal
      title="审阅"
      visible={showVisible}
      onCancel={showCancel}
      destroyOnClose={()=>{return true}}
      footer={[
        <div>
          {reportDetail.approvemanUserName===null?
            [
              <div>
                <span style={{marginRight:20}}>检验质量：</span>
                {form.getFieldDecorator('approver1', {
                  initialValue:0,
                  rules: [{  required: true, message: '请评分检验质量' }],
                })(
                  <Rate />
                )}
                <span style={{marginRight:20}}>证单质量：</span>
                {form.getFieldDecorator('approver2', {
                  initialValue:0,
                  rules: [{  required: true, message: '请评分证单质量' }],
                })(
                  <Rate />
                )}
                <Button key="submit2" type="primary" onClick={okHandle}>审阅</Button>
                <Button key="cancel" type="primary" onClick={showCancel}> 关闭</Button>
              </div>]:[
              <div>
                <span style={{marginRight:20,marginLeft:20}}>审阅人：{reportDetail.approveManNameC}</span>
                <span style={{marginRight:20,marginLeft:20}}>审阅日期：{isValidDate(reportDetail.approvedate)}</span>
                {user.username ===reportDetail.approvemanUserName?[<Button key="submit3" type="primary" onClick={okHandleReturn}>退回</Button>]:[]}
                <Button key="cancel" type="primary" onClick={showCancel}> 关闭</Button>
              </div>
            ]
          }

        </div>
      ]}
      style={{ top: 10 }}
      width={document.body.clientWidth*0.95}
      height={document.body.clientHeight*0.6}
    >
      <Layout>
        <Content style={{margin:15}}>
          <div>
            <Row>
              <Col span={24}>
                {renderFileInfo(value)}
              </Col>
            </Row>
          </div>
        </Content>
        <Sider theme='light' width={400} style={{paddingLeft:60}}>
          <Tree showLine defaultSelectedKeys={[value]} defaultExpandAll onSelect={onSelect}>{renderTreeNodes(treeData)}</Tree>
        </Sider>
      </Layout>
    </Modal>
  );

});





let id = 0;

// 正文页面
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
@Form.create()
class MainQuery extends PureComponent {
  state = {
    modalReviewVisible1:false,
    exceptionData1:[],

    modalReviewVisible:false,
    exceptionData:[],
    modalInfo :{},
    mainResult:[],
    peopleVisible:false,
    man:[],

    // 加载中
    loadingState: false,

    kindValue:"customsNo",
    // 审阅部分
    showVisible: false,
    urls: "", // 切换pdf的url
    value: 'reportDetail', // 切换tab拟制页面

    checkData: {},   // 现场检查信息
    reportDetail: {},  // 当前委托详情
    company:[],
    treeData: [],
    renderFormData: [], // 当前data
    renderFormColumns: [],// 当前表格的信息
    sampleColumnsLink: [ // 分析检测表格头
      {
        title: '委托编号',
        dataIndex: 'reportno',
      },
      {
        title: '样品编号',
        dataIndex: 'sampleno',
      },
      {
        title: '样品名称',
        dataIndex: 'samplename',
      },
      {
        title: '检查项目',
        dataIndex: 'itemC',
      },
      {
        title: '检验标准',
        dataIndex: 'teststandard',
      },
      {
        title: '结果',
        dataIndex: 'testresult',
      }
    ],


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
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => this.isValidDate(val),
    },
    {
      title: '报关号',
      dataIndex: 'customsNo',
    },
    {
      title: '检验机构',
      dataIndex: 'namec',
      width:'16%'
    },
    {
      title: '检查品名',
      dataIndex: 'cargoname',
    },
    {
      title: '申报数量',
      dataIndex: 'quantityd',
    },
    {
      title: '船名标识',
      dataIndex: 'shipname',
      width:120,
    },
    {
      title: '状态日期',
      dataIndex: 'overalltime',
      render: val => this.isValidDate(val),
    },
    {
      title: '状态',
      dataIndex: 'overallstate',
    },
    // {
    //   title: '审阅人',
    //   dataIndex: 'approveManNameC',
    // },
    // {
    //   title: '审阅日期',
    //   dataIndex: 'approvedate',
    //   render: val => this.isValidDate(val),
    // },

    {
      title: '数重量',
      render: (text, record) => this.getExceptionInfo(text),
      // width:150,
    },

    {
      title: '品质',
      render: (text, record) => this.getExceptionInfo1(text),
      // width:150,
    },


    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.peopleItem(text, record)}>人员</a>&nbsp;&nbsp;
          {text.overallstate==="已发布"?[<a onClick={() => this.approveItem(text, record)}>审阅&nbsp;&nbsp;</a>]:[<span>审阅&nbsp;&nbsp;</span>]}
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
    const { dispatch } = this.props;
    dispatch({
      type: 'main/getCompanyList',
      payload: {
        // certCode: user.certCode,
      },
      callback: (response) => {
        this.setState({company : response.data})
      }
    });
  }




  // eslint-disable-next-line react/sort-comp
  init =() =>{
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    const params = {
      customsCompany:user.company,
    };
    dispatch({
      type: 'main/getReportByCustoms',
      payload: params,
      callback: (response) => {
        this.state.mainResult = response;
      }
    });
  };


  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  getExceptionInfo =(text)=>{
    let diff = '';
    // eslint-disable-next-line camelcase
    const reportdate = new Date(+new Date(text.reportdate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    const timestamp2 = Date.parse(new Date(reportdate));
    const time_diff = new Date().getTime() - timestamp2;
    // 计算相差天数
    // eslint-disable-next-line camelcase
    const days = Math.floor(time_diff / (24 * 3600 * 1000));
    if (days > 0) {
      diff += `第${days }天`;
    }
    return [
      <Fragment>
        {(text.overallstate!=="已发布" && days > 15)?[<Tag color="orange">{diff}</Tag>]:[]}
        {(text.overallstate==="已发布" && text.exceptioninfo!==null && text.exceptioninfo!=="")?
          // eslint-disable-next-line react/jsx-no-bind
          [<Tag color="orange" onClick={this.onTagClick.bind(this,text.reportno)}>{text.exceptioninfo}</Tag>]:[]}
      </Fragment>
    ]
  };

  getExceptionInfo1 =(text)=>{

    return [
      <Fragment>
        {(text.overallstate==="已发布" && text.quanlityerr1!==null && text.quanlityerr1!=="")?
          // eslint-disable-next-line react/jsx-no-bind
          [<Tag color="orange" onClick={this.onTagClick1.bind(this,text.reportno)}>{text.quanlityerr1}</Tag>]:[]}
      </Fragment>
    ]
  };

  onTagClick1 =(reportno)=>{
    this.handleModalReviewVisible1(true);
    const{dispatch} = this.props;
    dispatch({
      type: 'main/qualityErrView',
      payload:{reportno},
      callback:(response) =>{
        if(response.code===200){
          this.setState({exceptionData1:response.data});
        }
      }
    });
  };

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Main/DetailForEnturstment',
    });
  };

  onTagClick =(reportno)=>{
    this.handleModalReviewVisible(true);
    const{dispatch} = this.props;
    dispatch({
      type: 'main/selectCheckWeightForCustoms',
      payload:{reportno},
      callback:(response) =>{
        if(response.code===200){
          this.setState({exceptionData:response.data});
        }
      }
    });
  };

  approveItem = text =>{
    message.success("正在拉取数据，请稍等几秒...");
    this.setState({loadingState:true});
    const { dispatch } = this.props;
    this.setState({reportDetail:text});
    this.setState({value:"reportDetail"});
    const reportnNo = text.reportno;
    // 获取信息
    dispatch({
      type: 'certificate/getMainInfo',
      payload:{reportno:reportnNo},
      callback: (response2) => {
        if(response2){
          this.setState({treeData:[]});
          this.state.treeData.push(response2);
          this.setState({showVisible:true});
          // eslint-disable-next-line react/no-unused-state
          this.setState({value: "reportDetail"});
          this.setState({text});
          this.setState({loadingState:false});
        }
      }
    });


  };

  peopleItem = text =>{

    sessionStorage.setItem('usermanage_reportno',text.reportno);
    sessionStorage.setItem('usermanage_certcode',text.certcode);
    router.push({
      pathname:'/Main/UserManage',
    });



    //this.setState({peopleVisible:true});


  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({kindValue:"customsNo"});
    this.init();
    this.flag = 0;

  };

  handleCancel = () =>{
    this.setState({peopleVisible:false});
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const {kindValue} = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];
      if( fieldsValue.check ===true && fieldsValue.kind !==undefined &&fieldsValue.value !==undefined &&fieldsValue.condition !== undefined ){
        let value;
        if(kindValue==="inspplace1"  && fieldsValue.value.length!==0){
          value = fieldsValue.value[2];
        }else{
          value=fieldsValue.value.trim();
        }
        mkinds.push(fieldsValue.kind );
        mvalues.push(value);
        mconditions.push(fieldsValue.condition );
      }
      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        const kind = form.getFieldValue(`kinds${k}`);
        const condition = form.getFieldValue(`conditions${k}`);
        const value = form.getFieldValue(`values${k}`);
        const checkk = form.getFieldValue(`check${k}`);
        if( checkk ===true &&  kind!==undefined &&value !==undefined &&condition !== undefined ){
          mkinds.push(kind );
          mvalues.push(value);
          mconditions.push(condition);
        }
      }
      const user = JSON.parse(localStorage.getItem("customs_userinfo"));
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
        customsCompany:user.company,
      };
      dispatch({
        type: 'main/getReportByCustoms',
        payload: params,
        callback: (response) => {
          this.state.mainResult = response;
        }
      });
    });
  };

  handleReview = (flag,text) => {
    this.handleModalReviewVisible(flag);
    this.state.modalInfo = text;
  };



  handleModalReviewVisible = (flag) => {
    this.setState({
      modalReviewVisible: !!flag,
    });
  };



  // eslint-disable-next-line react/sort-comp
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const {kindValue,company} = this.state;
    const companyOptions = company.map(d =><Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 18, xl: 5 }}>
          <Col md={1} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('check', {
                initialValue: true,
                valuePropName: 'checked',
              })(
                <Switch checkedChildren="开" unCheckedChildren="关"  />
              )}
            </Form.Item>
          </Col>
          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('kind', {
                initialValue:"customsNo",
                rules: [{  message: '选择字段' }],
              })(
                <Select placeholder="选择字段" onChange={this.onChangeKind}>
                  <Option value="reportno"> 委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="customsNo">报关号</Option>
                  <Option value="maininfo.certCode">检验机构</Option>
                  <Option value="applicant">收发货人</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="inspplace1">检验地区</Option>
                  <Option value="inspplace2">详细地点</Option>
                  <Option value="cargoname">货物名称</Option>

                </Select>
              )}
            </Form.Item>
          </Col>

          <Col md={3} sm={20}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 6 }}
              colon={false}
            >
              {getFieldDecorator('condition', {
                initialValue:"=",
                rules: [{  message: '条件' }],
              })(
                <Select placeholder="条件">
                  <Option value="=">等于</Option>
                  <Option value="!=">不等于</Option>
                  <Option value="like">包含</Option>
                  <Option value="not like">不包含</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          {kindValue === "maininfo.certCode" ?
            [
              <Col md={8} sm={20}>
                <FormItem>
                  {getFieldDecorator('value', { rules: [{ message: '搜索数据' }], })(
                    <Select placeholder="请选择检验机构">
                      {companyOptions}
                    </Select>
                  )}
                </FormItem>
              </Col>
            ]:[]}
          {kindValue === "inspplace1" ?
            [
              <Col md={4} sm={20}>
                <FormItem>
                  {getFieldDecorator('value',)(<Cascader options={areaOptions} placeholder="请选择所属地区" />)}
                </FormItem>

              </Col>
            ]:[]}

          {kindValue !== "inspplace1" && kindValue !== "maininfo.certCode" ?
            [
              <Col md={4} sm={20}>
                <FormItem>
                  {getFieldDecorator('value',{rules: [{ message: '请输入' }],})(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            ]:[]}


          <Col md={1} sm={20}>  <Icon type="plus-circle" style={{fontSize:24, marginLeft: 8 ,marginTop:4}} theme='twoTone' twoToneColor="#00ff00" onClick={this.add} /></Col>

          <Col md={8} sm={20}>
            <span className={styles.submitButtons}>
              <Button style={{ marginLeft: 0 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleAdvanceSearch}>
                高级检索
              </Button>
              <Button type="primary" style={{ marginLeft: 8 }} htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>

      </Form>
    );
  }


  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };



  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // eslint-disable-next-line no-plusplus
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  flag = 0;
  handleAdvanceSearch =()=>{
    if(this.flag ===0){
      let i =4;
      while(i>0){
        this.add();
        // eslint-disable-next-line no-plusplus
        i--;
      }
      this.flag = 1;
    }
  };


  // 树控件的目录数据
  onSelect = (selectedKeys, info) => {
    const { dispatch } = this.props;
    if(selectedKeys ===undefined || selectedKeys[0] ===undefined){
      return null;
    }
    if( selectedKeys[0] === 'reportDetail' ){ // 委托详情
      this.state.reportDetail = this.state.treeData[0].children[0].children[0].data;
      this.setState({ value: selectedKeys[0] });
    }else if (selectedKeys[0].indexOf("checkitem")  === 0) { //   检查
      this.state.checkData = this.state.treeData[0].children[1].children[0].children[selectedKeys[0].substring(9)].data;
      this.setState({ value: selectedKeys[0] });
    } else if (selectedKeys[0].indexOf("testitem")  === 0) {   // 检测
      this.state.renderFormData = this.state.treeData[0].children[2].children[0].children[selectedKeys[0].substring(8)].data;
      this.state.renderFormColumns  = this.state.sampleColumnsLink;
      this.setState({ value: selectedKeys[0] });
    } else if (selectedKeys[0].indexOf("recordinfo")  === 0) {  // 附件
      const key = selectedKeys[0].substring(10);
      // 附件的url
      dispatch({
        type: 'certificate/getPdfUrlFetch',
        payload: { id: key },
        callback: (pdfresponse) => {
          if (pdfresponse) {
            this.state.urls = pdfresponse.data;
            this.forceUpdate();
          }
        }
      });
      this.setState({ value: selectedKeys[0] });
    }else if(selectedKeys[0].indexOf("certpdf")  === 0){   // 证书
      const key = selectedKeys[0].substring(7);
      dispatch({
        type: 'certificate/getPdfByOssPath',
        payload:{osspath:key},
        callback: (response) => {
          if (response) {
            this.state.urls = response.data;
            this.forceUpdate();
          }
        }
      });
      this.setState({ value: selectedKeys[0] });
    }else if(selectedKeys[0].indexOf("abandon")  === 0){   // 证书
      console.log( selectedKeys[0]);
      const key = selectedKeys[0].substring(7);
      dispatch({
        type: 'certificate/getPdfByOssPath',
        payload:{osspath:key},
        callback: (response) => {
          if (response) {
            this.state.urls = response.data;
            this.forceUpdate();
          }
        }
      });
      this.setState({ value: selectedKeys[0] });
    }
    return null;
  };


  showCancel = () =>{
    this.setState({showVisible:false});
  };

  onChangeKind =(value) =>{
    this.setState({kindValue:value});
  };


  getPlaceFromCode =(val)=>{
    const onelevel = `${val.substring(0,2)}0000`;
    const twolevel = `${val.substring(0,4)}00`;
    const threelevel = val;
    const oneitem = areaOptions.find(item => item.value === onelevel );
    if(oneitem===undefined){
      return <span>{threelevel}</span>;
    }
    const twoitem = oneitem.children.find(item => item.value === twolevel );
    const threeitem = twoitem.children.find(item => item.value === threelevel );
    return <span>{oneitem.label }/{  twoitem.label}/{   threeitem.label}</span>;
  };


  renderReportForm() {
    const {reportDetail} = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="业务信息" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="委托编号">{reportDetail.reportno}</Descriptions.Item>
          <Descriptions.Item label="委托日期">{(reportDetail.reportdate===undefined|| reportDetail.reportdate===null)?"": moment(reportDetail.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="检验费">{reportDetail.price}</Descriptions.Item>
          <Descriptions.Item label="申请人">{reportDetail.applicant}</Descriptions.Item>
          <Descriptions.Item label="联系人">{reportDetail.applicantname}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{reportDetail.applicanttel}</Descriptions.Item>
          <Descriptions.Item label="代理人">{reportDetail.agent}</Descriptions.Item>
          <Descriptions.Item label="联系人">{reportDetail.agentname}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{reportDetail.agenttel}</Descriptions.Item>
          <Descriptions.Item label="付款人">{reportDetail.payer}</Descriptions.Item>
          <Descriptions.Item label="业务来源">{reportDetail.businesssource}</Descriptions.Item>
          <Descriptions.Item label="贸易方式">{reportDetail.tradeway}</Descriptions.Item>
          <Descriptions.Item label="证书要求">{reportDetail.certstyle}</Descriptions.Item>
          <Descriptions.Item label="自编号">{reportDetail.reportno20}</Descriptions.Item>
          <Descriptions.Item label="业务分类">{reportDetail.businesssort}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查对象" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="货物名称">{reportDetail.cargoname}</Descriptions.Item>
          <Descriptions.Item label="俗名">{reportDetail.chineselocalname}</Descriptions.Item>
          <Descriptions.Item label="船名标识">{reportDetail.shipname}</Descriptions.Item>
          <Descriptions.Item label="报检数量">{((reportDetail.quantityd === undefined || reportDetail.quantityd === null ) ? "":reportDetail.quantityd  )+reportDetail.unit }</Descriptions.Item>
          <Descriptions.Item label="检验时间">{(reportDetail.inspdate===undefined|| reportDetail.inspdate===null)?"": moment(reportDetail.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="地点">{(reportDetail.inspplace1===undefined||reportDetail.inspplace1===null)?"":this.getPlaceFromCode(reportDetail.inspplace1)}{reportDetail.inspplace2}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查项目" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item span={3} label="申请项目">{reportDetail.inspway}</Descriptions.Item>
          <Descriptions.Item span={3} label="检验备注">{reportDetail.inspwaymemo1}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  // 处理操作时间
  handleDate = (val) => {
    if(val!==undefined && val!==null){
      return  <span>{ moment(val).format('YYYY-MM-DD')}</span>;
    }
    return null;
  };

  renderCheckForm() {
    const {checkData} = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="现场检查" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="检验项目">{checkData.inspway}</Descriptions.Item>
          <Descriptions.Item label="开始日期">{this.handleDate(checkData.begindate)}</Descriptions.Item>
          <Descriptions.Item label="结束日期">{this.handleDate(checkData.finishdate)}</Descriptions.Item>
          <Descriptions.Item label="重量">{checkData.weight}</Descriptions.Item>
          <Descriptions.Item label="人员" span={2}>{checkData.inspman}</Descriptions.Item>
          <Descriptions.Item label="仪器" span={3}><div style={{"white-space":"pre"}}>{checkData.instrument}</div></Descriptions.Item>
          <Descriptions.Item label="检验标准" span={3}><div style={{"white-space":"pre"}}>{checkData.standard}</div></Descriptions.Item>
          <Descriptions.Item label="结果描述" span={3}>{checkData.result}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }



  renderLinkFileForm (){
    const  {urls}  = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.2,backgroundColor:'white',padding:10}}>
        <embed runat="server" src={urls} style={{width:'100%', height:document.body.clientHeight*1.15}} type="application/pdf" />
      </div>
    );
  }




  renderForm(){
    const {renderFormData,renderFormColumns} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*1.35,backgroundColor:'white',padding:10}}>
        <Table
          size="middle"
          dataSource={renderFormData}
          columns={renderFormColumns}
          rowKey="keyno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true,pageSize: 20}}
        />
      </div>
    );
  }


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

  renderFileInfo =(value)=>{
    if(value === 'reportDetail'){
      return this.renderReportForm();
    }else if(value.indexOf("checkitem")  === 0){  // 现场检查
      return this.renderCheckForm();
    } else if(value.indexOf("testitem")  === 0){  // 分析测试
      return this.renderForm();
    }else if(value.indexOf("recordinfo")  === 0) { // 附件
      return this.renderLinkFileForm();
    }else if(value.indexOf("certpdf")  === 0) {  // 已经盖章的证书
      return this.renderLinkFileForm();
    }else if(value.indexOf("abandon")  === 0) {  // 已经盖章的证书
      return this.renderLinkFileForm();
    }
    else{
      return null;
    }
  };

  reviewReport = (fieldValue) =>{
    if(fieldValue.approver1===0 || fieldValue.approver2 ===0){
      message.error("请选择服务评价");
    }else{
      // 海关审阅
      const {dispatch} =  this.props;
      const user = JSON.parse(localStorage.getItem("customs_userinfo"));
      const {reportDetail} = this.state;
      const params = {
        reader:user.username,
        organization:"海关",
        company:user.company,
        reportno:reportDetail.reportno,
        tel:user.tel,
        realname:user.nameC,
      };
      dispatch({
        type: 'main/addReadRecordByCustoms',
        payload:params,
        callback:(response) =>{
          if(response==="success"){
            message.success("审阅成功");
            this.init();
          }else{
            message.success("审阅失败");
          }
        }
      });
      this.setState({showVisible:false});
    }
  };


  returnReport = () =>{
    // 海关审阅
    const {dispatch} =  this.props;
    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    const {reportDetail} = this.state;
    const params = {
      reader:user.username,
      organization:"海关",
      company:user.company,
      reportno:reportDetail.reportno,
    };
    dispatch({
      type: 'main/returnReadRecordByCustoms',
      payload:params,
      callback:(response) =>{
        if(response==="success"){
          message.success("退回成功");
          this.init();
        }else if(response==="noExist"){
          message.success("记录不存在，退回失败");
        }
        else{
          message.success("退回失败");
        }
      }
    });
    this.setState({showVisible:false});
  };


  handleModalReviewVisible1 = (flag) => {
    this.setState({
      modalReviewVisible1: !!flag,
    });
  };


  render() {
    const {
      loading,
    } = this.props;


    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const { mainResult, peopleVisible,man ,showVisible,value,treeData,
      loadingState ,reportDetail,modalReviewVisible,exceptionData ,modalReviewVisible1,exceptionData1 } = this.state;
    const user = JSON.parse(localStorage.getItem("customs_userinfo"));
    const parentMethods = {
      handleModalReviewVisible:this.handleModalReviewVisible,
      handleModalReviewVisible1:this.handleModalReviewVisible1,
      showCancel: this.showCancel,
      onSelect:this.onSelect,
      reviewReport:this.reviewReport,
      returnReport:this.returnReport,
      renderFileInfo:this.renderFileInfo,
      renderTreeNodes:this.renderTreeNodes,
      isValidDate:this.isValidDate,

    };

    const formItems = keys.map((k, index) => (
      <div>
        { index %2===0 && keys.length!==0? (
          <Row className={queryStyles.rowClass} />
        ) : null}
        <Col md={1} sm={20}>
          <Form.Item
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
            colon={false}
          >
            {getFieldDecorator(`check${k}`, {
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`kinds${k}`, {
              rules: [{  message: '选择字段' }],
            })(
              <Select placeholder="选择字段">
                <Option value="reportno"> 委托编号</Option>
                <Option value="shipname">船名标识</Option>
                <Option value="customsNo">报关号</Option>
                <Option value="applicant">收发货人</Option>
                <Option value="agent">代理人</Option>
                <Option value="inspplace2">详细地点</Option>
                <Option value="cargoname">货物名称</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={3} sm={20}>
          <Form.Item
            style={{marginRight:8}}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 6 }}
          >
            {getFieldDecorator(`conditions${k}`, {
              rules: [{  message: '选择条件' }],
            })(
              <Select placeholder="选择条件">
                <Option value="=">等于</Option>
                <Option value="!=">不等于</Option>
                <Option value="like">包含</Option>
                <Option value="not like">不包含</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col md={4} sm={10}>
          <FormItem>
            {getFieldDecorator(`values${k}`,{rules: [{ message: '选择数值' }],})(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={1} sm={5}>
          {keys.length >= 1 ? (
            <Icon style={{fontSize:24,marginLeft:8}} type="minus-circle" theme='twoTone' twoToneColor="#ff0000" onClick={() => this.remove(k)} />
          ) : null}
        </Col>
      </div>
    ));

    // 加载中
    const container = (
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    );



    return (
      <PageHeaderWrapper title="主页">
        <Card bordered={false} size="small">
          <div className={queryStyles.loadingClass}><Spin spinning={loadingState} size="default" tip="正在加载数据..." /> </div>
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Row className={styles.tableListForm}>{formItems}</Row>
          </Form>
          <div className={styles.tableList}>
            <Table
              size="middle"
              rowKey="reportno"
              loading={loading}
              dataSource={mainResult}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
            />
          </div>
        </Card>
        <CertForm {...parentMethods} loading={loading} showVisible={showVisible} treeData={treeData} value={value} reportDetail={reportDetail} user={user} />
        <ReviewFrom {...parentMethods} loading={loading} modalReviewVisible={modalReviewVisible} exceptionData={exceptionData} />
        <ReviewFrom1 {...parentMethods} loading={loading} modalReviewVisible1={modalReviewVisible1} exceptionData1={exceptionData1} />
        <Modal
          title="人员"
          visible={peopleVisible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <Table
            size="middle"
            loading={loading}
            rowKey='reportno'
            dataSource={man}
            columns={this.columns1}
            pagination={{showQuickJumper:true,showSizeChanger:true}}
          />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default MainQuery;
