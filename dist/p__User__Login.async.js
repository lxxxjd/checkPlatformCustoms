(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{JAxp:function(e,t,a){e.exports={login:"antd-pro-components-login-index-login",getCaptcha:"antd-pro-components-login-index-getCaptcha",icon:"antd-pro-components-login-index-icon",other:"antd-pro-components-login-index-other",register:"antd-pro-components-login-index-register",prefixIcon:"antd-pro-components-login-index-prefixIcon",submit:"antd-pro-components-login-index-submit"}},Y5yc:function(e,t,a){"use strict";a.r(t);a("sRBo");var n=a("kaz8"),r=(a("fOrg"),a("+KLJ")),o=a("p0pE"),i=a.n(o),c=(a("2qtc"),a("kLXV")),s=a("2Taf"),l=a.n(s),u=a("vZ4D"),p=a.n(u),m=a("MhPg"),f=a.n(m),d=a("l4Ni"),g=a.n(d),h=a("ujKo"),v=a.n(h),b=a("q1tI"),y=a.n(b),C=a("MuoO"),E=a("Y2fQ"),x=a("wY1l"),w=a.n(x),S=(a("y8nQ"),a("Vl3Y")),M=(a("Znn+"),a("ZTPi")),T=a("gWZ8"),N=a.n(T),R=(a("17x9"),a("TSYQ")),O=a.n(R),j=(a("14J3"),a("BMrR")),D=(a("+L6B"),a("2/Rp")),P=(a("jCWc"),a("kPKH")),k=(a("5NDa"),a("5rEg")),q=a("jehZ"),I=a.n(q),F=a("Y/ft"),A=a.n(F),G=a("BGR+"),L=a("JAxp"),B=a.n(L),z=(a("Pwec"),a("CtXQ")),K={UserName:{props:{size:"large",id:"userName",prefix:y.a.createElement(z["a"],{type:"user",className:B.a.prefixIcon}),placeholder:"admin"},rules:[{required:!0,message:"Please enter username!"}]},Password:{props:{size:"large",prefix:y.a.createElement(z["a"],{type:"lock",className:B.a.prefixIcon}),type:"password",id:"password",placeholder:"888888"},rules:[{required:!0,message:"Please enter password!"}]},Mobile:{props:{size:"large",prefix:y.a.createElement(z["a"],{type:"mobile",className:B.a.prefixIcon}),placeholder:"mobile number"},rules:[{required:!0,message:"Please enter mobile number!"},{pattern:/^1\d{10}$/,message:"Wrong mobile number format!"}]},Captcha:{props:{size:"large",prefix:y.a.createElement(z["a"],{type:"mail",className:B.a.prefixIcon}),placeholder:"captcha"},rules:[{required:!0,message:"Please enter Captcha!"}]}},U=Object(b["createContext"])(),J=U;function V(e){return function(){var t,a=v()(e);if(Y()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return g()(this,t)}}function Y(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var Z=S["a"].Item,Q=function(e){f()(a,e);var t=V(a);function a(e){var n;return l()(this,a),n=t.call(this,e),n.onGetCaptcha=function(){var e=n.props.onGetCaptcha,t=e?e():null;!1!==t&&(t instanceof Promise?t.then(n.runGetCaptchaCountDown):n.runGetCaptchaCountDown())},n.getFormItemOptions=function(e){var t=e.onChange,a=e.defaultValue,n=e.customprops,r=e.rules,o={rules:r||n.rules};return t&&(o.onChange=t),a&&(o.initialValue=a),o},n.runGetCaptchaCountDown=function(){var e=n.props.countDown,t=e||59;n.setState({count:t}),n.interval=setInterval(function(){t-=1,n.setState({count:t}),0===t&&clearInterval(n.interval)},1e3)},n.state={count:0},n}return p()(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.updateActive,a=e.name;t&&t(a)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state.count,t=this.props.form.getFieldDecorator,a=this.props,n=(a.onChange,a.customprops),r=(a.defaultValue,a.rules,a.name),o=a.getCaptchaButtonText,i=a.getCaptchaSecondText,c=(a.updateActive,a.type),s=A()(a,["onChange","customprops","defaultValue","rules","name","getCaptchaButtonText","getCaptchaSecondText","updateActive","type"]),l=this.getFormItemOptions(this.props),u=s||{};if("Captcha"===c){var p=Object(G["default"])(u,["onGetCaptcha","countDown"]);return y.a.createElement(Z,null,y.a.createElement(j["a"],{gutter:8},y.a.createElement(P["a"],{span:16},t(r,l)(y.a.createElement(k["a"],I()({},n,p)))),y.a.createElement(P["a"],{span:8},y.a.createElement(D["a"],{disabled:e,className:B.a.getCaptcha,size:"large",onClick:this.onGetCaptcha},e?"".concat(e," ").concat(i):o))))}return y.a.createElement(Z,null,t(r,l)(y.a.createElement(k["a"],I()({},n,u))))}}]),a}(b["Component"]);Q.defaultProps={getCaptchaButtonText:"captcha",getCaptchaSecondText:"second"};var W={};Object.keys(K).forEach(function(e){var t=K[e];W[e]=function(a){return y.a.createElement(J.Consumer,null,function(n){return y.a.createElement(Q,I()({customprops:t.props,rules:t.rules},a,{type:e,updateActive:n.updateActive,form:n.form}))})}});var X=W;function $(e){return function(){var t,a=v()(e);if(H()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return g()(this,t)}}function H(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var _=M["a"].TabPane,ee=function(){var e=0;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return e+=1,"".concat(t).concat(e)}}(),te=function(e){f()(a,e);var t=$(a);function a(e){var n;return l()(this,a),n=t.call(this,e),n.uniqueId=ee("login-tab-"),n}return p()(a,[{key:"componentDidMount",value:function(){var e=this.props.tabUtil;e.addTab(this.uniqueId)}},{key:"render",value:function(){var e=this.props.children;return y.a.createElement(_,this.props,e)}}]),a}(b["Component"]),ae=function(e){return y.a.createElement(J.Consumer,null,function(t){return y.a.createElement(te,I()({tabUtil:t.tabUtil},e))})};ae.typeName="LoginTab";var ne=ae,re=S["a"].Item,oe=function(e){var t=e.className,a=A()(e,["className"]),n=O()(B.a.submit,t);return y.a.createElement(re,null,y.a.createElement(D["a"],I()({size:"large",className:n,type:"primary",htmlType:"submit"},a)))},ie=oe;function ce(e){return function(){var t,a=v()(e);if(se()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return g()(this,t)}}function se(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var le=function(e){f()(a,e);var t=ce(a);function a(e){var n;return l()(this,a),n=t.call(this,e),n.onSwitch=function(e){n.setState({type:e});var t=n.props.onTabChange;t(e)},n.getContext=function(){var e=n.state.tabs,t=n.props.form;return{tabUtil:{addTab:function(t){n.setState({tabs:[].concat(N()(e),[t])})},removeTab:function(t){n.setState({tabs:e.filter(function(e){return e!==t})})}},form:i()({},t),updateActive:function(e){var t=n.state,a=t.type,r=t.active;r[a]?r[a].push(e):r[a]=[e],n.setState({active:r})}}},n.handleSubmit=function(e){e.preventDefault();var t=n.state,a=t.active,r=t.type,o=n.props,i=o.form,c=o.onSubmit,s=a[r];i.validateFields(s,{force:!0},function(e,t){c(e,t)})},n.state={type:e.defaultActiveKey,tabs:[],active:{}},n}return p()(a,[{key:"render",value:function(){var e=this.props,t=e.className,a=e.children,n=this.state,r=n.type,o=n.tabs,i=[],c=[];return y.a.Children.forEach(a,function(e){e&&("LoginTab"===e.type.typeName?i.push(e):c.push(e))}),y.a.createElement(J.Provider,{value:this.getContext()},y.a.createElement("div",{className:O()(t,B.a.login)},y.a.createElement(S["a"],{onSubmit:this.handleSubmit},o.length?y.a.createElement(y.a.Fragment,null,y.a.createElement(M["a"],{animated:!1,className:B.a.tabs,activeKey:r,onChange:this.onSwitch},i),c):a)))}}]),a}(b["Component"]);le.defaultProps={className:"",defaultActiveKey:"",onTabChange:function(){},onSubmit:function(){}},le.Tab=ne,le.Submit=ie,Object.keys(X).forEach(function(e){le[e]=X[e]});var ue,pe,me,fe=S["a"].create()(le),de=a("w2qy"),ge=a.n(de);function he(e){return function(){var t,a=v()(e);if(ve()){var n=v()(this).constructor;t=Reflect.construct(a,arguments,n)}else t=a.apply(this,arguments);return g()(this,t)}}function ve(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}var be=fe.Tab,ye=fe.UserName,Ce=fe.Password,Ee=fe.Mobile,xe=fe.Captcha,we=fe.Submit,Se=(ue=Object(C["connect"])(function(e){var t=e.login,a=e.loading;return{login:t,submitting:a.effects["login/login"]}}),ue((me=function(e){f()(a,e);var t=he(a);function a(){var e;l()(this,a);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return e=t.call.apply(t,[this].concat(o)),e.state={type:"account",autoLogin:!0},e.onTabChange=function(t){e.setState({type:t})},e.onGetCaptcha=function(){return new Promise(function(t,a){e.loginForm.validateFields(["mobile"],{},function(n,r){if(n)a(n);else{var o=e.props.dispatch;o({type:"login/getCaptcha",payload:r.mobile}).then(t).catch(a),c["a"].info({title:Object(E["formatMessage"])({id:"app.login.verification-code-warning"})})}})})},e.handleSubmit=function(t,a){var n=e.state.type;if(!t){var r=e.props.dispatch;r({type:"login/login",payload:i()({},a,{type:n})})}},e.changeAutoLogin=function(t){e.setState({autoLogin:t.target.checked})},e.renderMessage=function(e){return y.a.createElement(r["a"],{style:{marginBottom:24},message:e,type:"error",showIcon:!0})},e}return p()(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.login,r=t.submitting,o=this.state,i=o.type,c=o.autoLogin;return y.a.createElement("div",{className:ge.a.main},y.a.createElement(fe,{defaultActiveKey:i,onTabChange:this.onTabChange,onSubmit:this.handleSubmit,ref:function(t){e.loginForm=t}},y.a.createElement(be,{key:"account",tab:Object(E["formatMessage"])({id:"app.login.tab-login-credentials"})},"error"===a.status&&"account"===a.type&&!r&&this.renderMessage(Object(E["formatMessage"])({id:"app.login.message-invalid-credentials"})),y.a.createElement(ye,{name:"userName",placeholder:"\u8bf7\u8f93\u5165\u7528\u6237\u540d",rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.userName.required"})}]}),y.a.createElement(Ce,{name:"password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801",rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.password.required"})}],onPressEnter:function(t){t.preventDefault(),e.loginForm.validateFields(e.handleSubmit)}})),y.a.createElement(be,{key:"mobile",tab:Object(E["formatMessage"])({id:"app.login.tab-login-mobile"})},"error"===a.status&&"mobile"===a.type&&!r&&this.renderMessage(Object(E["formatMessage"])({id:"app.login.message-invalid-verification-code"})),y.a.createElement(Ee,{name:"mobile",placeholder:Object(E["formatMessage"])({id:"form.phone-number.placeholder"}),rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.phone-number.required"})},{pattern:/^1\d{10}$/,message:Object(E["formatMessage"])({id:"validation.phone-number.wrong-format"})}]}),y.a.createElement(xe,{name:"captcha",placeholder:Object(E["formatMessage"])({id:"form.verification-code.placeholder"}),countDown:120,onGetCaptcha:this.onGetCaptcha,getCaptchaButtonText:Object(E["formatMessage"])({id:"form.get-captcha"}),getCaptchaSecondText:Object(E["formatMessage"])({id:"form.captcha.second"}),rules:[{required:!0,message:Object(E["formatMessage"])({id:"validation.verification-code.required"})}]})),y.a.createElement("div",null,y.a.createElement(n["a"],{checked:c,onChange:this.changeAutoLogin},y.a.createElement(E["FormattedMessage"],{id:"app.login.remember-me"})),y.a.createElement("a",{style:{float:"right"},href:""},y.a.createElement(E["FormattedMessage"],{id:"app.login.forgot-password"}))),y.a.createElement(we,{loading:r},y.a.createElement(E["FormattedMessage"],{id:"app.login.login"})),y.a.createElement("div",{className:ge.a.other},y.a.createElement(E["FormattedMessage"],{id:"app.login.sign-in-with"}),y.a.createElement(w.a,{className:ge.a.register,to:"/user/register"},y.a.createElement(E["FormattedMessage"],{id:"app.login.signup"})))))}}]),a}(b["Component"]),pe=me))||pe);t["default"]=Se},w2qy:function(e,t,a){e.exports={main:"antd-pro-pages-user-login-main",icon:"antd-pro-pages-user-login-icon",other:"antd-pro-pages-user-login-other",register:"antd-pro-pages-user-login-register"}}}]);