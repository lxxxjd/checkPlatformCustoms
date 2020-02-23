import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import { Card, Divider ,Descriptions,Row, Col,  Button,Typography ,Modal,Icon,Table,notification} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
import areaOptions from './areaOptions';
import styles from './style.less';


const { Title} = Typography;
@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
class DetailForEnturstment extends Component {
  state = {
    visible: false ,
    showVisible:false,
    url:"",
    cnasInfo: {
      checkcode: '',
      checkname: '',
      domaincode: '',
      domainname: '',
      subdomaincode: '',
      subdomainname: '',
    },
    readRecords:[],
  };

  columns = [
    {
      title: '文件名称',
      dataIndex: 'recordname',
    },
    {
      title: '上传日期',
      dataIndex: 'recorddate',
      render: val => this.isValidDate(val),
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.previewItem(text, record)}>查看</a>
        </Fragment>
      ),
    },
  ];

  columns1 = [
    {
      title: '审阅人姓名',
      dataIndex: 'realname',
    },
    {
      title: '审阅时间',
      dataIndex: 'readdate',
      render: val => this.isValidDate(val),
    },
    {
      title: '联系电话',
      dataIndex: 'tel',
    },
    {
      title: '审阅人所在单位',
      dataIndex: 'company',
    },

    {
      title: '来源',
      dataIndex: 'organization',
    },

    {
      title: '状态',
      dataIndex: 'state',
    },
  ];

  componentWillMount() {
    const reportnNo = sessionStorage.getItem("reportno");
    const { dispatch } = this.props;
    const user = JSON.parse(localStorage.getItem("userinfo"));
    dispatch({
      type: 'main/getReport',
      payload: reportnNo,
    });
    dispatch({
      type: 'main/getRecordInfo',
      payload:{
         reportno : reportnNo,
         source : '委托',
      }
    });
    dispatch({
      type: 'main/getAllReadRecords',
      payload:{
         reportno : reportnNo,
      },
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '审阅记录失败',
            description:response.data,
          });
        }else{
            this.setState({readRecords:response.data});
        }
      }
    });
  }

  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };

  previewItem = text => {
    const { dispatch } = this.props;
    const reportno = sessionStorage.getItem('reportno');
    const params = {
      ...text,
      reportno:reportno,
      source : '委托',
    };
    dispatch({
      type: 'main/getRecord',
      payload:params,
      callback:(response) =>{
        if(response.code === 400){
          notification.open({
            message: '打开失败',
            description:response.data,
          });
        }else{
          const url = response.data;
          this.setState({url:url});
          //window.open(url);
        }
      }
    });
    this.setState({showVisible:true});
  };

  handleOk = e => {
    console.log(e);
    const { dispatch, match } = this.props;
    const reportnNo = sessionStorage.getItem("reportno");
    dispatch({
      type: 'entrustment/remove',
      payload: {reportno:reportnNo},
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  deleteReport = () => {
    this.setState({
      visible: true,
    });
  };

  back = () =>{
    this.props.history.goBack();
  };

  showCancel = () =>{
    this.setState({showVisible:false});
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

  render() {
    const {
      main:{recordData, report},
      loading
    } = this.props;
    const { showVisible ,url, cnasInfo,readRecords} = this.state;
    return (
      <PageHeaderWrapper loading={loading}>
        <Card bordered={false}>
          <Row gutter={16}>
            <Col span={3}>
              <Title level={3}>委托详情</Title>
            </Col>
            <Col span={19} />
            <Col span={2}>
              <Button type="primary" style={{ marginLeft: 8 ,paddingLeft:0,paddingRight:15}} onClick={this.back}>
                <Icon type="left" />返回
              </Button>
            </Col>
          </Row>
          <Modal
            title="确认"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>是否撤销</p>
          </Modal>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="业务信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="报关号">{report.customsNo}</Descriptions.Item>
            <Descriptions.Item label="委托号">{report.reportno}</Descriptions.Item>
            <Descriptions.Item label="报检日期">{moment(report.reportdate).format('YYYY-MM-DD')}</Descriptions.Item>
            <Descriptions.Item label="收/发货人">{report.applicant}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.applicantname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.applicanttel}</Descriptions.Item>
            <Descriptions.Item label="代理人">{report.agent}</Descriptions.Item>
            <Descriptions.Item label="联系人">{report.agentname}</Descriptions.Item>
            <Descriptions.Item label="联系电话">{report.agenttel}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="货物信息" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item label="货物名称">{report.cargoname}</Descriptions.Item>
            <Descriptions.Item label="俗称">{report.chineselocalname}</Descriptions.Item>
            <Descriptions.Item label="船名标识">{report.shipname}</Descriptions.Item>
            <Descriptions.Item label="报检数量">{((report.quantityd === undefined || report.quantityd === null ) ? "":report.quantityd  )+report.unit }</Descriptions.Item>
            <Descriptions.Item span={2} label="地点">{(report.inspplace1===undefined||report.inspplace1===null)?"":this.getPlaceFromCode(report.inspplace1)}{report.inspplace2}</Descriptions.Item>
          </Descriptions>
          <Divider style={{ marginBottom: 32 }} />
          <Descriptions size="large" title="检查项目" style={{ marginBottom: 32 }} bordered>
            <Descriptions.Item span={3} label="检验项目">{report.inspway}</Descriptions.Item>
            <Descriptions.Item span={3} label="备注">{report.inspwaymemo1}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card bordered={false} title="附件">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={recordData}
              columns={this.columns}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Card bordered={false} title="审阅记录">
          <div>
            <Table
              size="middle"
              loading={loading}
              dataSource={readRecords}
              columns={this.columns1}
              rowKey="recordname"
              pagination={{showQuickJumper:true,showSizeChanger:true}}
            />
          </div>
        </Card>
        <Modal
          title="记录详情"
          visible={showVisible}
          onCancel={this.showCancel}
          footer={null}
          width={800}
          style={{ top: 10 }}
        >
          <embed src={url} style={{width:'100%', height:document.body.clientHeight*0.8}} type="application/pdf" />
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default DetailForEnturstment;
