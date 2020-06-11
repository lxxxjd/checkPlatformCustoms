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
  Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment'
// eslint-disable-next-line import/extensions
import Search from './Search.js'
import styles from '../table.less';

const FormItem = Form.Item;
const { Option } = Select;
const SearchForm = Form.create()(Search);

/* eslint react/no-multi-comp:0 */
@connect(({ inspectionAnalysis, loading }) => ({
  inspectionAnalysis,
  loading: loading.models.inspectionAnalysis,
}))
@Form.create()
class SampleIndex extends PureComponent {
  state = {
    formValues: {},
    visible:false,
    dataSource:[],
    shipname:'',
    cargoname:'',
  };

  columns = [
    // {
    //   title: '委托编号',
    //   dataIndex: 'reportno',
    // },
    {
      title: '委托日期',
      dataIndex: 'reportdate',
      render: val => <span>{
        moment(val).format('YYYY-MM-DD')
      }</span>
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
      title: '样品编号',
      dataIndex: 'sampleno',
    },
    {
      title: '样品名称',
      dataIndex: 'samplename',
    },
    {
      title: '样品状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.mobileItem(text, record)}>设定&nbsp;&nbsp;</a>]
          <a onClick={() => this.detailItem(text, record)}>查看&nbsp;&nbsp;</a>
          <a onClick={() => this.previewItem(text, record)}>委托详情</a>
        </Fragment>
      ),
    },
  ];


  componentDidMount() {
    const { dispatch } = this.props;
    const reportno =  sessionStorage.getItem('usermanage_reportno');
    dispatch({
      type: 'inspectionAnalysis/selectSamplesForCustoms',
      payload:{
        reportno,
      },
      callback:(response) =>{
        if (response.code === 200) {
          this.setState({dataSource: response.data});
        }
      }
    });
  }

  previewItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
   window.open("/Entrustment/DetailForEntrustment");
    localStorage.setItem('reportDetailNo',text.reportno);
  };

  mobileItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('sampleno',text.sampleno);
    sessionStorage.setItem('cargoname',text.cargoname);
    sessionStorage.setItem( 'applicant' , text.applicant);
    router.push({
      pathname:'/Main/SampleModify',
    });
  };

  detailItem = text => {
    sessionStorage.setItem('reportno',text.reportno);
    sessionStorage.setItem('sampleno',text.sampleno);
    sessionStorage.setItem('cargoname',text.cargoname);
    router.push({
      pathname:'/Main/SampleDetail',
    });
  };

  render() {
    const {
      loading,
    } = this.props;

    const {dataSource} = this.state;
    return (
      <PageHeaderWrapper title="指标监管">
        <Card bordered={false} size="small">
          <div className={styles.tableList}>
            <div className={styles.tableListForm}><SearchForm></SearchForm></div>
            <Table
              style={{marginTop:5}}
              size="middle"
              loading={loading}
              dataSource={dataSource}
              pagination={{showQuickJumper:true,showSizeChanger:true}}
              columns={this.columns}
              rowKey="sampleno"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default SampleIndex;
