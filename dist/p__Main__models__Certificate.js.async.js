(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{uc7O:function(e,t,a){"use strict";a.r(t);var n,r=a("eHn4"),l=a.n(r),c=a("p0pE"),u=a.n(c),s=a("d6i3"),o=a.n(s),p=a("r1PW"),i=a("1l/V"),d=a.n(i),f=a("t3Un");a("Qyje");function y(e){return w.apply(this,arguments)}function w(){return w=d()(o.a.mark(function e(t){return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(f["a"])("/api/report/get_report?reportNo=".concat(t)));case 1:case"end":return e.stop()}},e)})),w.apply(this,arguments)}t["default"]={namespace:"certificate",state:{data:[],recordData:[],signData:{},ossPdfResult:{},report:[],sampleDataResult:{},checkResultData:{},sampleDetailForLinkResult:{},checkResultForLinkResult:{},recordinfoResult:{},pdfResult:{},pdfByOssPathResult:{},getMainInfoResult:{},convertWortToPdfResult:{},getModelSelectNameResult:{},getAllUserListByCertCodeResult:{},undoCertResult:{},makeCertFileResult:{},downloadQualityTempResult:{},publishCertResult:{},getAllReadRecordsResult:{},applyAbandonResult:{},abandonCertResult:{}},effects:{getReport:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(y,n);case 4:return u=e.sent,e.next=7,c({type:"get",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),abandonCert:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["a"],n);case 4:return u=e.sent,e.next=7,c({type:"abandonCertResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),applyAbandon:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["b"],n);case 4:return u=e.sent,e.next=7,c({type:"applyAbandonResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),makeCertFile:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["r"],n);case 4:return u=e.sent,e.next=7,c({type:"makeCertFileResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),undoCert:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["v"],n);case 4:return u=e.sent,e.next=7,c({type:"undoCertResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getAllUserListByCertCode:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["f"],n);case 4:return u=e.sent,e.next=7,c({type:"getAllUserListByCertCodeResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),convertWordToPdf:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["c"],n);case 4:return u=e.sent,e.next=7,c({type:"convertWortToPdfResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getCertReports:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["h"],n);case 4:return u=e.sent,e.next=7,c({type:"getCertReport",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getCertFiles:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["g"],n);case 4:return u=e.sent,e.next=7,c({type:"getCertFile",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),uploadCertFile:o.a.mark(function e(t,a){var n,r,l,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,a.put,e.next=4,l(p["w"],n);case 4:c=e.sent,r&&r(c);case 6:case"end":return e.stop()}},e)}),uploadCertFilePdf:o.a.mark(function e(t,a){var n,r,l,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,a.put,e.next=4,l(p["x"],n);case 4:c=e.sent,r&&r(c);case 6:case"end":return e.stop()}},e)}),publishCert:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["s"],n);case 4:return u=e.sent,e.next=7,c({type:"publishCertResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),deleteCertFile:o.a.mark(function e(t,a){var n,r,l,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,a.put,e.next=4,l(p["d"],n);case 4:c=e.sent,r&&r(c);case 6:case"end":return e.stop()}},e)}),signCertFile:o.a.mark(function e(t,a){var n,r,l,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,a.put,e.next=4,l(p["u"],n);case 4:c=e.sent,r&&r(c);case 6:case"end":return e.stop()}},e)}),sealCertFile:o.a.mark(function e(t,a){var n,r,l,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,a.put,e.next=4,l(p["t"],n);case 4:c=e.sent,r&&r(c);case 6:case"end":return e.stop()}},e)}),getSignature:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["q"],n);case 4:return u=e.sent,e.next=7,c({type:"getSignatureInfo",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),getMainInfo:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["k"],n);case 4:return u=e.sent,e.next=7,c({type:"getMainInfoResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getSampleDetailFetch:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["o"],n);case 4:return u=e.sent,e.next=7,c({type:"getSampleDetailResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),downloadQualityTemp:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["e"],n);case 4:return u=e.sent,e.next=7,c({type:"downloadQualityTempResult",payload:u});case 7:r&&r(u.data);case 8:case"end":return e.stop()}},e)}),getCheckResultFetch:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["i"],n);case 4:return u=e.sent,e.next=7,c({type:"getCheckResultData",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),getSampleDetailForLink:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["p"],n);case 4:return u=e.sent,e.next=7,c({type:"getSampleDetailForLinkResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),getCheckResultForLink:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["j"],n);case 4:return u=e.sent,e.next=7,c({type:"getCheckResultForLinkResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),getRecordInfo:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["n"],n);case 4:return u=e.sent,e.next=7,c({type:"getRecordInfoResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),getPdfUrlFetch:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["m"],n);case 4:return u=e.sent,e.next=7,c({type:"getPdfUrlResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)}),getPdfByOssPath:o.a.mark(function e(t,a){var n,r,l,c,u;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=t.callback,l=a.call,c=a.put,e.next=4,l(p["l"],n);case 4:return u=e.sent,e.next=7,c({type:"getPdfByOssPathResult",payload:u});case 7:r&&r(u);case 8:case"end":return e.stop()}},e)})},reducers:(n={getCertReport:function(e,t){var a=t.payload;return u()({},e,{data:a.data})},get:function(e,t){var a=t.payload;return u()({},e,{report:a.data})},getCertFile:function(e,t){var a=t.payload;return u()({},e,{recordData:a.data})}},l()(n,"get",function(e,t){var a=t.payload;return u()({},e,{report:a.data})}),l()(n,"getSignatureInfo",function(e,t){var a=t.payload;return u()({},e,{signData:a.data})}),l()(n,"getMainInfoResult",function(e,t){var a=t.payload;return u()({},e,{getMainInfoResult:a.data})}),l()(n,"getSampleDetailResult",function(e,t){var a=t.payload;return u()({},e,{sampleDataResult:a})}),l()(n,"getCheckResultData",function(e,t){var a=t.payload;return u()({},e,{checkResultData:a})}),l()(n,"getSampleDetailForLinkResult",function(e,t){var a=t.payload;return u()({},e,{sampleDetailForLinkResult:a})}),l()(n,"getCheckResultForLinkResult",function(e,t){var a=t.payload;return u()({},e,{checkResultForLinkResult:a})}),l()(n,"getRecordInfoResult",function(e,t){var a=t.payload;return u()({},e,{recordinfoResult:a})}),l()(n,"getPdfUrlResult",function(e,t){var a=t.payload;return u()({},e,{pdfResult:a})}),l()(n,"getPdfByOssPathResult",function(e,t){var a=t.payload;return u()({},e,{pdfByOssPathResult:a})}),l()(n,"convertWortToPdfResult",function(e,t){var a=t.payload;return u()({},e,{convertWortToPdfResult:a.data})}),l()(n,"getModelSelectNameResult",function(e,t){var a=t.payload;return u()({},e,{getModelSelectNameResult:a.data})}),l()(n,"getAllUserListByCertCodeResult",function(e,t){var a=t.payload;return u()({},e,{getAllUserListByCertCodeResult:a.data})}),l()(n,"undoCertResult",function(e,t){var a=t.payload;return u()({},e,{undoCertResult:a.data})}),l()(n,"makeCertFileResult",function(e,t){var a=t.payload;return u()({},e,{makeCertFileResult:a})}),l()(n,"downloadQualityTempResult",function(e,t){var a=t.payload;return u()({},e,{downloadQualityTempResult:a.data})}),l()(n,"publishCertResult",function(e,t){var a=t.payload;return u()({},e,{publishCertResult:a.data})}),l()(n,"getAllReadRecordsResult",function(e,t){var a=t.payload;return u()({},e,{getAllReadRecordsResult:a.data})}),l()(n,"applyAbandonResult",function(e,t){var a=t.payload;return u()({},e,{applyAbandonResult:a.data})}),l()(n,"abandonCertResult",function(e,t){var a=t.payload;return u()({},e,{abandonCertResult:a.data})}),n)}}}]);