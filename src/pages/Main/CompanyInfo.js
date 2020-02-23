import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import router from 'umi/router';
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
  message
} from 'antd';
import moment from 'moment'
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './company.less';

const { Option } = Select;




@Form.create()
@connect(({ company, loading }) => ({
  company,
  loading: loading.models.company,
}))
class CompanyInfo extends PureComponent {

	state = {
		company:{},
		parents:[],
    modifyModalVisble:false,

    previewVisible: false,
    previewImage: '',
    fileList: [],

    dataSource:[],

	};

  columns = [
    {
      title: '文件名称',
      dataIndex: 'recordname',
      render: val => {
        //取文件名
        var pattern = /\.{1}[a-z]{1,}$/;
        if (pattern.exec(val) !== null) {
          return <span>{val.slice(0, pattern.exec(val).index)}</span>;
        } else {
          return <span>{val}</span>;
        }
      }
    },
    {
      title: '上传日期',
      dataIndex: 'createtime',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
    },

    {
      title: '上传人',
      dataIndex: 'creator',
    },

    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a> &nbsp;&nbsp;
        </Fragment>
      ),
    },
  ];

	componentDidMount() {
	    this.init();
	};

	init=()=>{
    const {
      dispatch ,
      form
    } = this.props;
    const certCode = sessionStorage.getItem("companyusermanage_certcode");
    dispatch({
      type: 'company/getCompany',
      payload:{
        certCode
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({company:response.data});
          form.setFieldsValue({
            'namee':response.data.namee,
            'adres':response.data.adres,
            'account':response.data.account,
            'bank' : response.data.bank,
            'belongto': response.data.belongto,
            'cocode':response.data.cocode,
          });
        }
      }
    });
    dispatch({
      type: 'company/getParent',
      payload:{
        certCode,
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({parents:response.data});
        }
      }
    });

    dispatch({
      type: 'company/getRecordCompanyList',
      payload:{
        certCode,
      },
      callback:(response)=>{
        if(response.code === 200){
          this.setState({dataSource:response.data});
        }
      }
    });

  };

	handleSubmit = () =>{
	    const {
	      form,
	      dispatch,
	    } = this.props;
	    const {validateFieldsAndScroll} = form;
	    let company  = this.state.company;
	    validateFieldsAndScroll((error, values) => {
	      if (!error) {
	        // submit the values
	        company.namee = form.getFieldValue('namee');
	       	company.adres = form.getFieldValue('adres');
	        company.account = form.getFieldValue('account');
	        company.bank = form.getFieldValue('bank');
	        company.belongto = form.getFieldValue('belongto');
	       	company.cocode = form.getFieldValue('cocode');
	        dispatch({
	          type: 'company/updateCompany',
	          payload: {
	          	...company,
	          },
	          callback: (response) => {
	            if (response.code === 200) {
	              notification.open({
	                message: '修改成功',
	              });
	              this.componentDidMount();
	            } else {
	              notification.open({
	                message: '添加失败',
	                description: response.data,
	              });
	            }
	          }
	        });
	      }
	    });
	};

  previewItem = text => {
    const {dispatch} = this.props;
    dispatch({
      type: 'company/getUrl',
      payload: {
        url:text.osspath
      },
      callback: (response) => {
        if (response.code === 400) {
          notification.open({
            message: '打开失败',
            description: response.data,
          });
        } else {
          const url = response.data;
          window.open(url);
        }
      }
    });
  };


  deleteItem = text => {
    Modal.confirm({
      title: '确定删除此文件吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const {
          dispatch,
        } = this.props;
        dispatch({
          type: 'company/deleteRecordCompany',
          payload: text,
          callback: (response) => {
            console.log(response);
            if (response === "success") {
              message.success("删除成功");
              this.init();
            } else {
              message.error("删除失败");
            }
          }
        });
      }
    });
  };


  // 显示模态框
  handleModifyModalVisble = (flag) => {
    this.setState({
      modifyModalVisble: !!flag,
    });
  };

  openModal =()=>{
    this.setState({
      modifyModalVisble: true,
    });
  };

  Cancel = () => this.setState({previewVisible: false});

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };



  setStateFileList=(fileList)=>{
    this.setState({fileList: fileList});
  };

  handleBeforeUpload = file => {
    return false;
  };

  back = () =>{
    this.props.history.goBack();
  };

  render() {
 	  const {loading } = this.props;
 		const { getFieldDecorator } = this.props.form;
 		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 14 },
	    };
    const { company ,parents,dataSource,} = this.state;
    const parentsOptions = parents.map(d => <Option key={d.certcode} value={d.certcode}>{d.namec}</Option>);

    return(
 			<Card>
        <Row>
          <Col span={22} />
          <Col span={2}>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={this.back}>
              返回
            </Button>
          </Col>
        </Row>
	 			<Form {...formItemLayout} >
	 				<Form.Item label="公司名称">
						<span className="ant-form-text">{company.namec}</span>
	 				</Form.Item>
          {/*<Form.Item label="英文名称">*/}
			    {/*      {getFieldDecorator('namee', {*/}
			    {/*        rules: [*/}
			    {/*          {*/}
			    {/*            required: true,*/}
			    {/*            message: '请输入英文名',*/}
			    {/*          },*/}
			    {/*        ],*/}
			    {/*      })(<Input />)}*/}
			    {/*    </Form.Item>*/}
			       	<Form.Item label="注册地址">
                <span className="ant-form-text">{company.adres}</span>
			        </Form.Item>
			        {/*<Form.Item label="银行账户">*/}
			        {/*  {getFieldDecorator('account', {*/}
			        {/*    rules: [*/}
			        {/*      {*/}
			        {/*        required: true,*/}
			        {/*        message: '请输入银行账户',*/}
			        {/*      },*/}
			        {/*    ],*/}
			        {/*  })(<Input />)}*/}
			        {/*</Form.Item>*/}
			        <Form.Item label="社会统一信用代码">
                <span className="ant-form-text">{company.cocode}</span>
			        </Form.Item>
			        {/*<Form.Item label="开户行">*/}
			        {/*  {getFieldDecorator('bank', {*/}
			        {/*    rules: [*/}
			        {/*      {*/}
			        {/*        required: true,*/}
			        {/*        message: '请输入开户行',*/}
			        {/*      },*/}
			        {/*    ],*/}
			        {/*  })(<Input />)}*/}
			        {/*</Form.Item>*/}
			        {/*<Form.Item*/}
	            {/*      label="母公司"*/}
	            {/*    >*/}
	            {/*      {getFieldDecorator('belongto', {*/}
	            {/*      })(*/}
	            {/*        <Select*/}
	            {/*          placeholder="请选择母公司"*/}
	            {/*          filterOption={false}*/}
	            {/*        >*/}
	            {/*          {parentsOptions}*/}
	            {/*        </Select>*/}
	            {/*      )}*/}
			        {/*</Form.Item>*/}
              <Form.Item label="相关资料">
                <span>营业执照、资质证书等</span>
              </Form.Item>
			        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
                <div style={{width:'100%'}}>
                  <Table
                    size="middle"
                    loading={loading}
                    dataSource={dataSource}
                    columns={this.columns}
                    rowKey="recordname"
                  />
                </div>
			        </Form.Item>
			    </Form>
		    </Card>
 		);
 	}
}

export default CompanyInfo;
