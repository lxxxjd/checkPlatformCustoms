(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{JAxp:function(e,t,a){e.exports={login:"antd-pro-components-login-index-login",getCaptcha:"antd-pro-components-login-index-getCaptcha",icon:"antd-pro-components-login-index-icon",other:"antd-pro-components-login-index-other",register:"antd-pro-components-login-index-register",prefixIcon:"antd-pro-components-login-index-prefixIcon",submit:"antd-pro-components-login-index-submit"}},Y5yc:function(e,t,a){"use strict";a.r(t);a("sRBo");var n=a("kaz8"),r=(a("fOrg"),a("+KLJ")),o=a("p0pE"),i=a.n(o),s=(a("2qtc"),a("kLXV")),c=a("2Taf"),l=a.n(c),p=a("vZ4D"),u=a.n(p),m=a("l4Ni"),d=a.n(m),g=a("ujKo"),h=a.n(g),f=a("MhPg"),b=a.n(f),v=a("q1tI"),y=a.n(v),C=a("MuoO"),E=a("Y2fQ"),x=a("mOP9"),w=(a("y8nQ"),a("Vl3Y")),M=(a("Znn+"),a("ZTPi")),S=a("gWZ8"),T=a.n(S),N=(a("17x9"),a("TSYQ")),O=a.n(N),j=(a("14J3"),a("BMrR")),k=(a("+L6B"),a("2/Rp")),q=(a("jCWc"),a("kPKH")),P=(a("5NDa"),a("5rEg")),I=a("jehZ"),F=a.n(I),A=a("Y/ft"),D=a.n(A),G=a("BGR+"),L=a("JAxp"),B=a.n(L),z=(a("Pwec"),a("CtXQ")),K={UserName:{props:{size:"large",id:"userName",prefix:y.a.createElement(z["a"],{type:"user",className:B.a.prefixIcon}),placeholder:"admin"},rules:[{required:!0,message:"Please enter username!"}]},Password:{props:{size:"large",prefix:y.a.createElement(z["a"],{type:"lock",className:B.a.prefixIcon}),type:"password",id:"password",placeholder:"888888"},rules:[{required:!0,message:"Please enter password!"}]},Mobile:{props:{size:"large",prefix:y.a.createElement(z["a"],{type:"mobile",className:B.a.prefixIcon}),placeholder:"mobile number"},rules:[{required:!0,message:"Please enter mobile number!"},{pattern:/^1\d{10}$/,message:"Wrong mobile number format!"}]},Captcha:{props:{size:"large",prefix:y.a.createElement(z["a"],{type:"mail",className:B.a.prefixIcon}),placeholder:"captcha"},rules:[{required:!0,message:"Please enter Captcha!"}]}},U=Object(v["createContext"])(),J=U,V=w["a"].Item,Y=function(e){function t(e){var a;return l()(this,t),a=d()(this,h()(t).call(this,e)),a.onGetCaptcha=function(){var e=a.props.onGetCaptcha,t=e?e():null;!1!==t&&(t instanceof Promise?t.then(a.runGetCaptchaCountDown):a.runGetCaptchaCountDown())},a.getFormItemOptions=function(e){var t=e.onChange,a=e.defaultValue,n=e.customprops,r=e.rules,o={rules:r||n.rules};return t&&(o.onChange=t),a&&(o.initialValue=a),o},a.runGetCaptchaCountDown=function(){var e=a.props.countDown,t=e||59;a.setState({count:t}),a.interval=setInterval(function(){t-=1,a.setState({count:t}),0===t&&clearInterval(a.interval)},1e3)},a.state={count:0},a}return b()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.updateActive,a=e.name;t&&t(a)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state.count,t=this.props.form.getFieldDecorator,a=this.props,n=(a.onChange,a.customprops),r=(a.defaultValue,a.rules,a.name),o=a.getCaptchaButtonText,i=a.getCaptchaSecondText,s=(a.updateActive,a.type),c=D()(a,["onChange","customprops","defaultValue","rules","name","getCaptchaButtonText","getCaptchaSecondText","updateActive","type"]),l=this.getFormItemOptions(this.props),p=c||{};if("Captcha"===s){var u=Object(G["default"])(p,["onGetCaptcha","countDown"]);return y.a.createElement(V,null,y.a.createElement(j["a"],{gutter:8},y.a.createElement(q["a"],{span:16},t(r,l)(y.a.createElement(P["a"],F()({},n,u)))),y.a.createElement(q["a"],{span:8},y.a.createElement(k["a"],{disabled:e,className:B.a.getCaptcha,size:"large",onClick:this.onGetCaptcha},e?"".concat(e," ").concat(i):o))))}return y.a.createElement(V,null,t(r,l)(y.a.createElement(P["a"],F()({},n,p))))}}]),t}(v["Component"]);Y.defaultProps={getCaptchaButtonText:"captcha",getCaptchaSecondText:"second"};var Z={};Object.keys(K).forEach(function(e){var t=K[e];Z[e]=function(a){return y.a.createElement(J.Consumer,null,function(n){return y.a.createElement(Y,F()({customprops:t.props,rules:t.rules},a,{type:e,updateActive:n.updateActive,form:n.form}))})}});var Q=Z,R=M["a"].TabPane,W=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,"".concat(t).concat(e)}}(),X=function(e){function t(e){var a;return l()(this,t),a=d()(this,h()(t).call(this,e)),a.uniqueId=W("login-tab-"),a}return b()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this.props.tabUtil;e.addTab(this.uniqueId)}},{key:"render",value:function(){var e=this.props.children;return y.a.createElement(R,this.props,e)}}]),t}(v["Component"]),$=function(e){return y.a.createElement(J.Consumer,null,function(t){return y.a.createElement(X,F()({tabUtil:t.tabUtil},e))})};$.typeName="LoginTab";var H=$,_=w["a"].Item,ee=function(e){var t=e.className,a=D()(e,["className"]),n=O()(B.a.submit,t);return y.a.createElement(_,null,y.a.createElement(k["a"],F()({size:"large",className:n,type:"primary",htmlType:"submit"},a)))},te=ee,ae=function(e){function t(e){var a;return l()(this,t),a=d()(this,h()(t).call(this,e)),a.onSwitch=function(e){a.setState({type:e});var t=a.props.onTabChange;t(e)},a.getContext=function(){var e=a.state.tabs,t=a.props.form;return{tabUtil:{addTab:function(t){a.setState({tabs:[].concat(T()(e),[t])})},removeTab:function(t){a.setState({tabs:e.filter(function(e){return e!==t})})}},form:i()({},t),updateActive:function(e){var t=a.state,n=t.type,r=t.active;r[n]?r[n].push(e):r[n]=[e],a.setState({active:r})}}},a.handleSubmit=function(e){e.preventDefault();var t=a.state,n=t.active,r=t.type,o=a.props,i=o.form,s=o.onSubmit,c=n[r];i.validateFields(c,{force:!0},function(e,t){s(e,t)})},a.state={type:e.defaultActiveKey,tabs:[],active:{}},a}return b()(t,e),u()(t,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.children,n=this.state,r=n.type,o=n.tabs,i=[],s=[];return y.a.Children.forEach(a,function(e){e&&("LoginTab"===e.type.typeName?i.push(e):s.push(e))}),y.a.createElement(J.Provider,{value:this.getContext()},y.a.createElement("div",{className:O()(t,B.a.login)},y.a.createElement(w["a"],{onSubmit:this.handleSubmit},o.length?y.a.createElement(y.a.Fragment,null,y.a.createElement(M["a"],{animated:!1,className:B.a.tabs,activeKey:r,onChange:this.onSwitch},i),s):a)))}}]),t}(v["Component"]);ae.defaultProps={className:"",defaultActiveKey:"",onTabChange:function(){},onSubmit:function(){}},ae.Tab=H,ae.Submit=te,Object.keys(Q).forEach(function(e){ae[e]=Q[e]});var ne,re,oe,ie=w["a"].create()(ae),se=a("w2qy"),ce=a.n(se),le=ie.Tab,pe=ie.UserName,ue=ie.Password,me=ie.Mobile,de=ie.Captcha,ge=ie.Submit,he=(ne=Object(C["connect"])(function(e){var t=e.login,a=e.loading;return{login:t,submitting:a.effects["login/login"]}}),ne((oe=function(e){function t(){var e,a;l()(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return a=d()(this,(e=h()(t)).call.apply(e,[this].concat(o))),a.state={type:"account",autoLogin:!0},a.onTabChange=function(e){a.setState({type:e})},a.onGetCaptcha=function(){return new Promise(function(e,t){a.loginForm.validateFields(["mobile"],{},function(n,r){if(n)t(n);else{var o=a.props.dispatch;o({type:"login/getCaptcha",payload:r.mobile}).then(e).catch(t),s["a"].info({title:Object(E["formatMessage"])({id:"app.login.verification-code-warning"})})}})})},a.handleSubmit=function(e,t){var n=a.state.type;if(!e){var r=a.props.dispatch;r({type:"login/login",payload:i()({},t,{type:n})})}},a.changeAutoLogin=function(e){a.setState({autoLogin:e.target.checked})},a.renderMessage=function(e){return y.a.createElement(r["a"],{style:{marginBottom:24},message:e,type:"error",showIcon:!0})},a}return b()(t,e),u()(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.login,r=t.submitting,o=this.state,i=o.type,s=o.autoLogin;return y.a.createElement("div",{className:ce.a.main},y.a.createElement(ie,{defaultActiveKey:i,onTabChange:this.onTabChange,onSubmit:this.handleSubmit,ref:function(t){e.loginForm=t}},y.a.createElement(le,{key:"account",tab:Object(E["formatMessage"])({id:"app.login.tab-login-credentials"})},"error"===a.status&&"account"===a.type&&!r&&this.renderMessage(Object(E["formatMessage"])({id:"app.login.message-invalid-credentials"})),y.a.createElement(pe,{name:"userName",placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d",rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.userName.required"})}]}),y.a.createElement(ue,{name:"password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.password.required"})}],onPressEnter:function(t){t.preventDefault(),e.loginForm.validateFields(e.handleSubmit)}})),y.a.createElement(le,{key:"mobile",tab:Object(E["formatMessage"])({id:"app.login.tab-login-mobile"})},"error"===a.status&&"mobile"===a.type&&!r&&this.renderMessage(Object(E["formatMessage"])({id:"app.login.message-invalid-verification-code"})),y.a.createElement(me,{name:"mobile",placeholder:Object(E["formatMessage"])({id:"form.phone-number.placeholder"}),rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.phone-number.required"})},{pattern:/^1\d{10}$/,message:Object(E["formatMessage"])({id:"validation.phone-number.wrong-format"})}]}),y.a.createElement(de,{name:"captcha",placeholder:Object(E["formatMessage"])({id:"form.verification-code.placeholder"}),countDown:120,onGetCaptcha:this.onGetCaptcha,getCaptchaButtonText:Object(E["formatMessage"])({id:"form.get-captcha"}),getCaptchaSecondText:Object(E["formatMessage"])({id:"form.captcha.second"}),rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.verification-code.required"})}]})),y.a.createElement("div",null,y.a.createElement(n["a"],{checked:s,onChange:this.changeAutoLogin},y.a.createElement(E["FormattedMessage"],{id:"app.login.remember-me"})),y.a.createElement("a",{style:{float:"right"},href:""},y.a.createElement(E["FormattedMessage"],{id:"app.login.forgot-password"}))),y.a.createElement(ge,{loading:r},y.a.createElement(E["FormattedMessage"],{id:"app.login.login"})),y.a.createElement("div",{className:ce.a.other},y.a.createElement(E["FormattedMessage"],{id:"app.login.sign-in-with"}),y.a.createElement(x["a"],{className:ce.a.register,to:"/user/register"},y.a.createElement(E["FormattedMessage"],{id:"app.login.signup"})))))}}]),t}(v["Component"]),re=oe))||re);t["default"]=he},w2qy:function(e,t,a){e.exports={main:"antd-pro-pages-user-login-main",icon:"antd-pro-pages-user-login-icon",other:"antd-pro-pages-user-login-other",register:"antd-pro-pages-user-login-register"}}}]);