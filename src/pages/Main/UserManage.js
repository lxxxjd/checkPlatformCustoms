import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { formatMessage } from 'umi-plugin-react/locale';

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../table.less';



@connect(({ main, loading }) => ({
  main,
  loading: loading.models.main,
}))
@Form.create()
class UserManage extends PureComponent {
  state = {
    dataSource:[],
  };

  columns = [
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
  }


  back = () =>{
    this.props.history.goBack();
  };



  viewInfo = text => {
    const certcode = sessionStorage.getItem('usermanage_certcode');
    sessionStorage.setItem('mandetail_certcode',certcode);
    sessionStorage.setItem('mandetail_namc',text.inspman);
    router.push({
      pathname:'/Main/ManDetail',
    });
  };

  init =()=>{
    const reportno = sessionStorage.getItem('usermanage_reportno');
    const certcode = sessionStorage.getItem('usermanage_certcode');
    const { dispatch } = this.props;
    dispatch({
      type: 'main/getAllMan',
      payload: {
        reportno,
        certcode,
      },
      callback:response =>{
        if (response.code === 200) {
          this.setState({dataSource:response.data})
        }
      }
    });

  };


  isValidDate =date=> {
    if(date !==undefined && date !==null ){
      return <span>{moment(date).format('YYYY-MM-DD')}</span>;
    }
    return [];
  };


  renderSimpleForm() {
    return (
      <div>
        <Row style={{marginBottom:10}}>
          <Col span={22} />
          <Col span={2}>
            <Button type="primary" onClick={this.back}>返回</Button>
          </Col>
        </Row>
      </div>
    );
  };

  render() {
    const {
      loading,
    } = this.props;
    const {dataSource} = this.state;
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

export default UserManage;
