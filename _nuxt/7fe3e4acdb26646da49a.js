(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{403:function(e,t,n){var content=n(626);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(15).default)("7aa67cee",content,!0,{sourceMap:!1})},625:function(e,t,n){"use strict";var r=n(403);n.n(r).a},626:function(e,t,n){(t=n(14)(!1)).push([e.i,".MainPage .Header[data-v-3e2ee164]{display:flex;flex-wrap:wrap;align-items:flex-end}@media screen and (max-width: 600px){.MainPage .Header[data-v-3e2ee164]{flex-direction:column;align-items:baseline}}.MainPage .UpdatedAt[data-v-3e2ee164]{font-size:14px;font-size:0.875rem;color:#707070;margin-bottom:.2rem}.MainPage .Annotation[data-v-3e2ee164]{font-size:12px;font-size:0.75rem;color:#707070}@media screen and (min-width: 601px){.MainPage .Annotation[data-v-3e2ee164]{margin:0 0 0 auto}}.MainPage .DataBlock[data-v-3e2ee164]{margin:20px -8px}@media screen and (min-width: 769px){.MainPage .DataBlock .DataCard[data-v-3e2ee164]{padding:10px}}@media screen and (max-width: 600px){.MainPage .DataBlock .DataCard[data-v-3e2ee164]{padding:4px 8px}}",""]),e.exports=t},639:function(e,t,n){"use strict";n.r(t);n(34);var r=n(4),d=n(1),c=n(308),o=n(330),l=n(329),m=n(107),v=n(324),f=n(408),h=n(409),x=n(410),w=n(406),_=n(405),C=n(108),D="https://data.bodik.jp/api/action/datastore_search?resource_id=",P=d.a.extend({components:{PageHeader:c.a,WhatsNew:o.a,StaticInfo:l.a,ConfirmedCasesDetailsCard:f.a,ConfirmedCasesNumberCard:h.a,ConfirmedCasesAttributesCard:x.a,TestedNumberCard:w.a,HealthCenterCard:_.a},fetch:function(e){var t=e.store,n=e.app.$axios;return Object(r.a)(regeneratorRuntime.mark((function e(){var r,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n.get(D+"71e83845-2648-4cb3-a69d-9f5f5412feb2");case 3:return r=e.sent,console.log(r.data,"url"),t.commit("setBodicData1",r.data.result.records),e.next=8,n.get(D+"de7ce61e-1849-47a1-b758-bca3f809cdf8");case 8:d=e.sent,t.commit("setBodicData2",d.data.result.records),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,12]])})))()},data:function(){var data={Data:m,headerItem:{icon:"mdi-chart-timeline-variant",title:this.$t("県内の最新感染動向")},newsItems:v.newsItems};return data},computed:{updatedAt:function(){return Object(C.c)(this.$data.Data.lastUpdate)}},head:function(){return{title:this.$t("県内の最新感染動向")}}}),$=(n(625),n(5)),M=n(39),k=n.n(M),j=n(429),A=n(575),component=Object($.a)(P,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"MainPage"},[n("div",{staticClass:"Header mb-3"},[n("page-header",{attrs:{icon:e.headerItem.icon}},[e._v("\n      "+e._s(e.headerItem.title)+"\n    ")]),e._v(" "),n("div",{staticClass:"UpdatedAt"},[n("span",[e._v(e._s(e.$t("最終更新"))+" ")]),e._v(" "),n("time",{attrs:{datetime:e.updatedAt}},[e._v(e._s(e.Data.lastUpdate))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!["ja","ja-basic"].includes(e.$i18n.locale),expression:"!['ja', 'ja-basic'].includes($i18n.locale)"}],staticClass:"Annotation"},[n("span",[e._v(e._s(e.$t("注釈"))+" ")])])],1),e._v(" "),n("whats-new",{staticClass:"mb-4",attrs:{items:e.newsItems}}),e._v(" "),n("static-info",{staticClass:"mb-4",attrs:{url:e.localePath("/flow"),text:e.$t("自分や家族の症状に不安や心配があればまずは電話相談をどうぞ"),"btn-text":e.$t("相談の手順を見る")}}),e._v(" "),n("v-row",{staticClass:"DataBlock"},[n("confirmed-cases-details-card"),e._v(" "),n("confirmed-cases-number-card"),e._v(" "),n("confirmed-cases-attributes-card"),e._v(" "),n("tested-number-card")],1),e._v(" "),n("v-row",[n("health-center-card")],1),e._v(" "),n("v-divider")],1)}),[],!1,null,"3e2ee164",null);t.default=component.exports;k()(component,{VDivider:j.a,VRow:A.a})}}]);