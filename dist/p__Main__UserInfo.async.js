(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{qNhZ:function(e,a,t){"use strict";t.r(a);t("IzEo");var s,r,l,o,n=t("bx4M"),i=t("jehZ"),c=t.n(i),d=(t("Q9mQ"),t("diRs")),p=(t("+L6B"),t("2/Rp")),m=(t("7Kak"),t("9yH6")),u=(t("MXD1"),t("CFYs")),f=(t("miYZ"),t("tsqr")),g=(t("/xke"),t("TeRw")),h=t("p0pE"),b=t.n(h),v=t("2Taf"),w=t.n(v),y=t("vZ4D"),E=t.n(y),O=t("l4Ni"),S=t.n(O),V=t("ujKo"),C=t.n(V),P=t("MhPg"),F=t.n(P),k=(t("2qtc"),t("kLXV")),I=(t("5NDa"),t("5rEg")),M=(t("y8nQ"),t("Vl3Y")),N=t("q1tI"),q=t.n(N),j=t("MuoO"),D=t("Y2fQ"),J=(t("zHco"),t("sFZ6")),x=t.n(J),L=(t("wd/R"),{ok:q.a.createElement("div",{className:x.a.success},q.a.createElement(D["FormattedMessage"],{id:"validation.password.strength.strong"})),pass:q.a.createElement("div",{className:x.a.warning},q.a.createElement(D["FormattedMessage"],{id:"validation.password.strength.medium"})),poor:q.a.createElement("div",{className:x.a.error},q.a.createElement(D["FormattedMessage"],{id:"validation.password.strength.short"}))}),R={ok:"success",pass:"normal",poor:"exception"},T=M["a"].create()(function(e){var a=e.form,t=e.handleOld,s=e.handleOldPasswordVisible,r=e.OldPasswordVisible,l=function(){a.validateFields(function(e,s){e||(a.resetFields(),t(s))})},o=function(e,t,s){t&&t!==a.getFieldValue("oldpassword")?s("\u5bc6\u7801\u4e0d\u4e00\u81f4"):s()};return q.a.createElement(k["a"],{title:"\u786e\u8ba4\u539f\u5bc6\u7801",style:{top:100},visible:r,onOk:l,onCancel:function(){return s()}},q.a.createElement(M["a"].Item,{labelCol:{span:5},wrapperCol:{span:15},label:"\u539f\u5bc6\u7801"},a.getFieldDecorator("oldpassword",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u539f\u5bc6\u7801"}]})(q.a.createElement(I["a"],{placeholder:"\u8bf7\u8f93\u5165\u539f\u5bc6\u7801",type:"password"}))),q.a.createElement(M["a"].Item,{labelCol:{span:5},wrapperCol:{span:15},label:"\u786e\u8ba4\u539f\u5bc6\u7801"},a.getFieldDecorator("oldconfirm",{rules:[{required:!0,message:"\u8bf7\u518d\u6b21\u8f93\u5165\u539f\u5bc6\u7801"},{validator:o}]})(q.a.createElement(I["a"],{placeholder:"\u8bf7\u518d\u6b21\u8f93\u5165\u539f\u5bc6\u7801",type:"password"}))))}),Z=(s=M["a"].create(),r=Object(j["connect"])(function(e){var a=e.register,t=e.loading;return{register:a,loading:t.models.register}}),s(l=r((o=function(e){function a(){var e,t;w()(this,a);for(var s=arguments.length,r=new Array(s),l=0;l<s;l++)r[l]=arguments[l];return t=S()(this,(e=C()(a)).call.apply(e,[this].concat(r))),t.state={count:0,user:{},parents:[],help:"",visible:!1,passwordVisible:!1,phoneVisible:!1,OldPasswordVisible:!1},t.handleSubmit=function(){var e=t.props,a=e.form,s=e.dispatch,r=a.validateFieldsAndScroll,l=JSON.parse(localStorage.getItem("userinfo"));r(function(e,r){console.log(e),e||(l.company=a.getFieldValue("company"),l.tel=a.getFieldValue("tel"),l.isvisible=a.getFieldValue("isvisible"),s({type:"register/updateCustomsUser",payload:b()({},l),callback:function(e){200===e.code?(g["a"].open({message:"\u4fee\u6539\u6210\u529f"}),localStorage.setItem("userinfo",JSON.stringify(l)),t.componentDidMount()):g["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:e.data})}}))})},t.modifyPassword=function(){var e=t.props,a=e.form,s=e.dispatch,r=a.validateFieldsAndScroll,l=JSON.parse(localStorage.getItem("userinfo"));r(function(e,r){e||(l.password=a.getFieldValue("password"),s({type:"register/updateCustomsUser",payload:b()({},l),callback:function(e){200===e.code?(g["a"].open({message:"\u4fee\u6539\u6210\u529f"}),t.setState({passwordVisible:!1}),localStorage.setItem("userinfo",JSON.stringify(l)),t.componentDidMount()):g["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:e.data})}}))})},t.modifyPhone=function(){var e=t.props,a=e.form,s=e.dispatch,r=a.validateFieldsAndScroll,l=JSON.parse(localStorage.getItem("userinfo"));r(function(e,r){e||(l.tel=a.getFieldValue("tel"),s({type:"register/verifyTel",payload:{tel:r.tel,verifyCode:r.captcha},callback:function(e){"success"===e?s({type:"register/updateCustomsUser",payload:b()({},l),callback:function(e){200===e.code?(g["a"].open({message:"\u4fee\u6539\u6210\u529f"}),t.setState({phoneVisible:!1}),localStorage.setItem("userinfo",JSON.stringify(l)),t.componentDidMount()):g["a"].open({message:"\u4fee\u6539\u5931\u8d25",description:e.data})}}):f["a"].error("\u9a8c\u8bc1\u7801\u9519\u8bef")}}))})},t.checkPassword=function(e,a,s){!1===t.state.passwordVisible&&s();var r=t.state,l=r.visible,o=r.confirmDirty;if(a)if(t.setState({help:""}),l||t.setState({visible:!!a}),a.length<6)s("error");else{var n=t.props.form;a&&o&&n.validateFields(["confirm"],{force:!0}),s()}else t.setState({help:"\u8bf7\u8f93\u5165\u5bc6\u7801",visible:!!a}),s("error")},t.checkConfirm=function(e,a,s){var r=t.props.form;a&&a!==r.getFieldValue("password")?s("\u5bc6\u7801\u4e0d\u4e00\u81f4"):s()},t.showPassword=function(){t.handleOldPasswordVisible(!0)},t.handleCancel=function(){t.setState({passwordVisible:!1}),t.setState({phoneVisible:!1})},t.handleOldPasswordVisible=function(e){t.setState({OldPasswordVisible:!!e})},t.getPasswordStatus=function(){var e=t.props.form,a=e.getFieldValue("password");return a&&a.length>9?"ok":a&&a.length>5?"pass":"poor"},t.onGetCaptcha=function(){var e=59;t.setState({count:e}),t.interval=setInterval(function(){e-=1,t.setState({count:e}),0===e&&clearInterval(t.interval)},1e3);var a=t.props,s=a.form,r=a.dispatch,l=s.getFieldValue("tel");void 0===l?f["a"].success("\u7535\u8bdd\u53f7\u7801\u4e0d\u80fd\u4e3a\u7a7a"):r({type:"register/sendVerify",payload:{tel:l},callback:function(e){e&&("success"===e?f["a"].success("\u53d1\u9001\u6210\u529f"):k["a"].info({title:Object(D["formatMessage"])({id:"app.login.verification-code-warning.noExist"})}))}})},t.getRepeatTel=function(e,a,s){var r=t.props.dispatch;r({type:"register/getRepeatTel",payload:{tel:a},callback:function(e){void 0===e||"null"===e?s("\u53f7\u7801\u5df2\u6ce8\u518c"):"\u53f7\u7801\u5df2\u6ce8\u518c"===e?s("\u53f7\u7801\u5df2\u6ce8\u518c"):s()}})},t.showModifyPhone=function(){t.setState({phoneVisible:!0})},t.renderPasswordProgress=function(){var e=t.props.form,a=e.getFieldValue("password"),s=t.getPasswordStatus();return a&&a.length?q.a.createElement("div",{className:x.a["progress-".concat(s)]},q.a.createElement(u["a"],{status:R[s],className:x.a.progress,strokeWidth:6,percent:10*a.length>100?100:10*a.length,showInfo:!1})):null},t.handleOld=function(e){var a=JSON.parse(localStorage.getItem("userinfo"));e.oldpassword===a.password?t.setState({passwordVisible:!0}):f["a"].error("\u60a8\u7684\u539f\u5bc6\u7801\u786e\u8ba4\u9519\u8bef"),t.handleOldPasswordVisible(!1)},t}return F()(a,e),E()(a,[{key:"componentDidMount",value:function(){var e=this.props,a=(e.dispatch,e.form),t=JSON.parse(localStorage.getItem("userinfo"));this.setState({user:t}),a.setFieldsValue({company:t.company,isvisible:t.isvisible,tel:t.tel,nameC:t.nameC})}},{key:"render",value:function(){var e=this,a=this.props.form.getFieldDecorator,t={labelCol:{span:6},wrapperCol:{span:14}},s=this.state,r=s.user,l=s.help,o=s.visible,i=s.passwordVisible,u=s.phoneVisible,f=s.count,g=s.OldPasswordVisible,h={handleOldPasswordVisible:this.handleOldPasswordVisible,handleOld:this.handleOld};return q.a.createElement(n["a"],null,q.a.createElement(M["a"],t,q.a.createElement(M["a"].Item,{label:"\u7528\u6237\u540d"},q.a.createElement("span",{className:"ant-form-text"},r.username)),q.a.createElement(M["a"].Item,{label:"\u96b6\u5c5e\u6d77\u5173\uff1a"},q.a.createElement("span",{className:"ant-form-text"},r.company)),q.a.createElement(M["a"].Item,{label:"\u624b\u673a\u53f7\u7801\uff1a"},q.a.createElement("span",{className:"ant-form-text"},r.tel),q.a.createElement(N["Fragment"],null,q.a.createElement("a",{onClick:function(){return e.showModifyPhone()}},"\xa0\xa0\u4fee\u6539\u624b\u673a"))),q.a.createElement(M["a"].Item,{label:"\u8054\u7cfb\u65b9\u5f0f:"},a("isvisible",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u662f\u5426\u53ef\u89c1"}]})(q.a.createElement(m["a"].Group,null,q.a.createElement(m["a"],{value:"\u53ef\u89c1"},"\u53ef\u89c1"),q.a.createElement(m["a"],{value:"\u4e0d\u53ef\u89c1"},"\u4e0d\u53ef\u89c1")))),q.a.createElement(M["a"].Item,{label:"\u59d3\u540d\uff1a"},a("nameC",{rules:[{required:!0,message:Object(D["formatMessage"])({id:"validation.company.required"})}]})(q.a.createElement(I["a"],{placeholder:Object(D["formatMessage"])({id:"form.company.placeholder"})}))),q.a.createElement(M["a"].Item,{wrapperCol:{span:12,offset:6}},q.a.createElement(p["a"],{type:"primary",onClick:this.showPassword},"\u4fee\u6539\u5bc6\u7801"),"\xa0\xa0\xa0\xa0\xa0\xa0",q.a.createElement(p["a"],{type:"primary",onClick:this.handleSubmit},"\u4fdd\u5b58")),q.a.createElement(k["a"],{title:"\u8bbe\u7f6e\u65b0\u5bc6\u7801",visible:i,onOk:this.modifyPassword,onCancel:this.handleCancel},q.a.createElement(M["a"].Item,{label:"\u65b0\u5bc6\u7801:",help:l},q.a.createElement(d["a"],{getPopupContainer:function(e){return e.parentNode},content:q.a.createElement("div",{style:{padding:"4px 0"}},L[this.getPasswordStatus()],this.renderPasswordProgress(),q.a.createElement("div",{style:{marginTop:10}},q.a.createElement(D["FormattedMessage"],{id:"validation.password.strength.msg"}))),overlayStyle:{width:240},placement:"right",visible:o},a("password",{rules:[{validator:this.checkPassword}]})(q.a.createElement(I["a"],{type:"password",placeholder:"\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801"})))),q.a.createElement(M["a"].Item,{label:"\u786e\u8ba4\u65b0\u5bc6\u7801:"},a("confirm",{rules:[i?[{required:!0,message:"\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801"}]:[],{validator:this.checkConfirm}]})(q.a.createElement(I["a"],{type:"password",placeholder:"\u8bf7\u786e\u8ba4\u8f93\u5165\u65b0\u5bc6\u7801"})))),q.a.createElement(k["a"],{title:"\u4fee\u6539\u624b\u673a",visible:u,onOk:this.modifyPhone,onCancel:this.handleCancel},q.a.createElement(M["a"].Item,{label:"\u624b\u673a\u53f7:"},a("tel",{rules:[{required:!0,message:Object(D["formatMessage"])({id:"validation.phone-number.required"})},{pattern:/^\d{11}$/,message:Object(D["formatMessage"])({id:"validation.phone-number.wrong-format"})},{validator:this.getRepeatTel}]})(q.a.createElement(I["a"],{style:{width:"75%"},placeholder:Object(D["formatMessage"])({id:"form.phone-number.placeholder"})}))),q.a.createElement(M["a"].Item,{label:"\u9a8c\u8bc1\u7801:"},a("captcha",{rules:u?[{required:!0,message:Object(D["formatMessage"])({id:"validation.verification-code.required"})}]:[]})(q.a.createElement(I["a"],{style:{width:"50%"},placeholder:Object(D["formatMessage"])({id:"form.verification-code.placeholder"})})),q.a.createElement(p["a"],{disabled:f,className:x.a.getCaptcha,onClick:this.onGetCaptcha},f?"".concat(f," s"):Object(D["formatMessage"])({id:"app.register.get-verification-code"}))))),q.a.createElement(T,c()({},h,{OldPasswordVisible:g})))}}]),a}(N["PureComponent"]),l=o))||l)||l);a["default"]=Z},sFZ6:function(e,a,t){e.exports={tableList:"antd-pro-pages-main-user-info-tableList",tableListOperator:"antd-pro-pages-main-user-info-tableListOperator",tableListForm:"antd-pro-pages-main-user-info-tableListForm",submitButtons:"antd-pro-pages-main-user-info-submitButtons"}}}]);