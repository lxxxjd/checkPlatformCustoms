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
  Image, Modal, Descriptions,Switch,Tree, Spin, Alert,Rate,
  Layout,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import queryStyles from './MainQuery.less'
import styles from '../table.less';

const { Header, Footer, Sider, Content } = Layout;
const { TreeNode } = Tree;





const CertForm = Form.create()(props => {

  const { form,showVisible,showCancel,value,onSelect,treeData,reviewReport,renderFileInfo,renderTreeNodes,returnReport ,reportDetail,user} = props;
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
                  {user.username ===reportDetail.approvemanUserName?[<Button key="submit3" type="primary" onClick={okHandleReturn}>退回</Button>]:[]}
                  <Button key="cancel" type="primary" onClick={showCancel}> 关闭</Button>
                </div>
            ]
          }

        </div>
      ]}
      style={{ top: 10 }}
      width={document.body.clientWidth*0.9}
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
        <Sider theme='light' width={310} style={{paddingLeft:60}}>
          <Tree showLine defaultExpandedKeys={['reportDetail']} defaultExpandAll onSelect={onSelect}>{renderTreeNodes(treeData)}</Tree>
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

    modalReviewVisible:false,
    modalInfo :{},
    mainResult:[],
    peopleVisible:false,
    man:[],

    // 加载中
    loadingState: false,


    // 审阅部分
    showVisible: false,
    urls: "", // 切换pdf的url
    value: 'reportDetail', // 切换tab拟制页面
    checkData: {},   // 现场检查信息
    reportDetail: {},  // 当前委托详情
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
      title: '委托编号',
      dataIndex: 'reportno',
    },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => this.isValidDate(val),
    },
    {
      title: '检验机构',
      dataIndex: 'applicant',
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
    {
      title: '审阅人',
      dataIndex: 'approvemanUserName',
    },
    {
      title: '审阅日期',
      dataIndex: 'approvedate',
      render: val => this.isValidDate(val),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.peopleItem(text, record)}>人员</a>
          &nbsp;&nbsp;
          <a onClick={() => this.approveItem(text, record)}>审批</a>
          &nbsp;&nbsp;
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    this.init();
  }


  // eslint-disable-next-line react/sort-comp
  init =() =>{
    const { dispatch } = this.props;
    const params = {
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

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    router.push({
      pathname:'/Main/DetailForEnturstment',
    });
  };

  approveItem = text =>{

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
          this.setState({text});
          this.setState({loadingState:false});
        }
      }
    });


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

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.init();
    this.flag = 0;

  };

  handleCancel = () =>{
    this.setState({peopleVisible:false});
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err){
        console.log(err);
        return;
      }
      let mkinds=[];
      let mvalues=[];
      let mconditions=[];

      if( fieldsValue.check ===true && fieldsValue.kind !==undefined &&fieldsValue.value !==undefined &&fieldsValue.condition !== undefined ){
        mkinds.push(fieldsValue.kind );
        mvalues.push(fieldsValue.value);
        mconditions.push(fieldsValue.condition );
      }
      const keys = form.getFieldValue('keys');
      for(let key in keys){
        let k = keys[key];
        console.log(k);
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
      const params = {
        kinds :mkinds,
        values: mvalues,
        conditions:mconditions,
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
                <Select placeholder="选择字段">
                  <Option value="reportno"> 委托编号</Option>
                  <Option value="shipname">船名标识</Option>
                  <Option value="customsNo">报关号</Option>
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
          <Col md={4} sm={20}>
            <FormItem>
              {getFieldDecorator('value',{rules: [{ message: '请输入' }],})(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
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
    }
    return null;
  };


  showCancel = () =>{
    this.setState({showVisible:false});
  };




  renderReportForm() {
    const {reportDetail} = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*0.8,backgroundColor:'white',padding:10}}>
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
          <Descriptions.Item label="检查品名">{reportDetail.cargoname}</Descriptions.Item>
          <Descriptions.Item label="中文俗名">{reportDetail.chineselocalname}</Descriptions.Item>
          <Descriptions.Item label="船名标识">{reportDetail.shipname}</Descriptions.Item>
          <Descriptions.Item label="申报数量和单位">{((reportDetail.quantityd === undefined || reportDetail.quantityd === null ) ? "":reportDetail.quantityd  )+reportDetail.unit }</Descriptions.Item>
          <Descriptions.Item label="检验时间">{(reportDetail.inspdate===undefined|| reportDetail.inspdate===null)?"": moment(reportDetail.inspdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="检查港口">{reportDetail.inspplace2}</Descriptions.Item>
          <Descriptions.Item label="到达地点">{reportDetail.inspplace1}</Descriptions.Item>
        </Descriptions>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="检查项目" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="申请项目">{reportDetail.inspway}</Descriptions.Item>
          <Descriptions.Item label="检验备注">{reportDetail.inspwaymemo1}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }

  renderCheckForm() {
    const {checkData} = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*0.8,backgroundColor:'white',padding:10}}>
        <Descriptions style={{ marginBottom: 10 }} size='small' title="现场检查" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
          <Descriptions.Item label="检查项目">{checkData.inspway}</Descriptions.Item>
          <Descriptions.Item label="开始日期">{(checkData.begindate===undefined|| checkData.begindate===null)?"":moment(checkData.begindate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="结束日期">{(checkData.finishdate===undefined|| checkData.finishdate===null)?"":moment(checkData.finishdate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="重量">{checkData.weight}</Descriptions.Item>
          <Descriptions.Item label="标准">{checkData.standard}</Descriptions.Item>
          <Descriptions.Item label="检验员">{checkData.inspman}</Descriptions.Item>
          <Descriptions.Item label="检验仪器">{checkData.instrument}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }



  renderLinkFileForm (){
    const  {urls}  = this.state;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*0.8,backgroundColor:'white',padding:10}}>
        <embed runat="server" src={urls} style={{width:'100%', height:document.body.clientHeight*0.8}} type="application/pdf" />
      </div>
    );
  }




  renderForm(){
    const {renderFormData,renderFormColumns} = this.state;
    const {loading} = this.props;
    return (
      <div style={{width:'100%',height:document.body.clientHeight*0.8,backgroundColor:'white',padding:10}}>
        <Table
          size="middle"
          dataSource={renderFormData}
          columns={renderFormColumns}
          rowKey="keyno"
          loading={loading}
          pagination={{showQuickJumper:true,showSizeChanger:true}}
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
    }else{
      return null;
    }
  };

  reviewReport = (fieldValue) =>{
    if(fieldValue.approver1===0 || fieldValue.approver2 ===0){
      message.error("请选择服务评价");
    }else{
        // 海关审阅
        const {dispatch} =  this.props;
        const user = JSON.parse(localStorage.getItem("userinfo"));
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
    const user = JSON.parse(localStorage.getItem("userinfo"));
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





  render() {
    const {
      loading,
    } = this.props;


    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const { mainResult, peopleVisible,man ,showVisible,value,treeData,loadingState ,reportDetail } = this.state;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const parentMethods = {
      handleModalReviewVisible:this.handleModalReviewVisible,
      showCancel: this.showCancel,
      onSelect:this.onSelect,
      reviewReport:this.reviewReport,
      returnReport:this.returnReport,
      renderFileInfo:this.renderFileInfo,
      renderTreeNodes:this.renderTreeNodes,
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
                <Option value="cargoname">检查品名</Option>
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
