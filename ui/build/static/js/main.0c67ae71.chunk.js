(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{215:function(e,t,a){e.exports=a.p+"static/media/ColoredDarkZippoLogo.7e4e7e9f.svg"},217:function(e,t,a){e.exports=a(524)},222:function(e,t,a){},223:function(e,t,a){},224:function(e,t,a){},225:function(e,t,a){},226:function(e,t,a){},227:function(e,t,a){},251:function(e,t,a){},252:function(e,t,a){},253:function(e,t,a){},254:function(e,t,a){},265:function(e,t){},267:function(e,t){},370:function(e,t){},430:function(e,t){},524:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(211),s=a.n(o),r=(a(222),a(46)),l=a(14),i=a(8),d=a(7),u=a(9),m=a(6),p=a(40),h=a(212),f=a.n(h),v=a(34),g=a.n(v),b=a(213),E=a.n(b),O=(a(223),a(26)),j=a.n(O),C=(a(224),a(225),function(e){var t=e.icon;return c.a.createElement("i",{className:j()("ZippoIcon","icon-".concat(t))})}),N=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).getLogEntryClass=function(e){return"error"===e.level?"Error":"compile_success"===e.type?"Success":""},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.log;return c.a.createElement("div",{className:j()("LogEntry",this.getLogEntryClass(e))},c.a.createElement("div",{className:"BasicInfo"},c.a.createElement("div",{className:"LogLevel"},e.level),c.a.createElement("div",{className:"LogTimestamp"},e.timestamp.format("YYYY-MM-DD hh:mm:ss"))),c.a.createElement("div",{className:"LogDetails"},c.a.createElement("div",{className:"MainMessage"},c.a.createElement("div",null,c.a.createElement("span",{className:"LogType"},"[",e.type,"]"),c.a.createElement("span",null,e.data.message)),c.a.createElement(C,{icon:"chevron-down"}))))}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={logsLoaded:!1,connected:!1,logs:[{level:"info",type:"initial_message",timestamp:new g.a("2019-03-09T16:30:25"),data:{message:"Deployed contract Calculator.sol to 0x6B6220677b93E8fc9dC3ffE582E481B7A56c79a9",details:""}},{level:"info",type:"transaction",timestamp:new g.a("2019-03-09T16:31:17"),data:{message:"",details:""}},{level:"info",type:"new_version",timestamp:new g.a("2019-03-09T16:31:49"),data:{message:"Deployed contract Calculator.sol to 0x4cb5442e13a7b269328f490a75d65aa4ca2883cb",details:""}},{level:"info",type:"transaction",timestamp:new g.a("2019-03-09T16:32:03"),data:{message:"",details:""}},{level:"error",type:"compile_failed",timestamp:new g.a("2019-03-09T16:33:41"),data:{message:"Error trying to compile contract Calculator.sol",details:""}}]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.logs,a=e.connection;return c.a.createElement("div",{className:"ActionLogs"},c.a.createElement("div",{className:"LogsHeader"},!a&&c.a.createElement("div",{className:"ConnectionLoader"},c.a.createElement(C,{icon:"spinner"}),c.a.createElement("span",null,"Connecting...")),!!a&&c.a.createElement("div",{className:"ConnectionInformation"},"Connected to RPC: ",c.a.createElement("span",{className:"Network"},a.name," (http://",a.url,")"))),c.a.createElement("div",{className:"LogsContent"},c.a.createElement("div",{className:"LogsWrapper"},t.map(function(e){return c.a.createElement(n.Fragment,{key:e.timestamp},c.a.createElement(N,{log:e}),c.a.createElement("div",{className:"LogDivider"}))}))))}}]),t}(n.Component),y=a(59),I=(a(226),a(227),function(){return c.a.createElement("div",{className:"Loader"},c.a.createElement("div",null),c.a.createElement("div",null))}),k=a(214),M=a.n(k),S=(a(251),function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).toggleDropdown=function(){var e=a.props.disabled,t=a.state.open;e||a.setState({open:!t})},a.closeDropdown=function(){a.setState({open:!1})},a.handleSelect=function(e){var t=a.props,n=t.field,c=t.disabled,o=t.onChange;c||(o(e.name,n),a.closeDropdown())},a.state={open:!1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.options,n=t.disabled,o=t.value,s=t.label,r=t.placeholder,l=this.state.open;return c.a.createElement(M.a,{onOutsideClick:this.closeDropdown},c.a.createElement("div",{className:j()("Select",{Disabled:n,Open:l})},c.a.createElement("div",{className:"Label",onClick:this.toggleDropdown},s),c.a.createElement("div",{className:"CurrentSelection",onClick:this.toggleDropdown},!!o&&c.a.createElement("span",{className:"Value"},o),!o&&c.a.createElement("span",{className:"Placeholder"},r||"Select an option")),c.a.createElement("div",{className:"SelectDropdown"},!!a.length&&a.map(function(t){return c.a.createElement("div",{className:"DropdownOption",key:t.name,onClick:function(){return e.handleSelect(t)}},t.name)}),!a.length&&c.a.createElement("div",{className:"DropdownEmpty"},c.a.createElement("span",null,"No options")))))}}]),t}(n.Component)),L=(a(252),function(e){var t=e.onClick,a=e.disabled,n=e.children,o=e.color,s=e.size;return c.a.createElement("button",{disabled:a,onClick:t,className:j()("Button",s,o)},n)});L.defaultProps={color:"invisible",size:""};var T,D=L,A=(a(253),function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(c)))).handleInputChange=function(e){var t=a.props,n=t.disabled,c=t.onChange,o=t.field,s=e.target.value;c&&!n&&c(s,o,e)},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.placeholder,a=e.field,n=e.value,o=e.label,s=e.disabled,r=e.className;return c.a.createElement("div",{className:j()("InputWrapper",r,{disabled:s})},!!o&&c.a.createElement("label",{htmlFor:"input-".concat(a),className:"InputLabel"},o),c.a.createElement("input",{placeholder:t,id:"input-".concat(a),disabled:s,onChange:this.handleInputChange,type:"text",className:"Input",value:n||""}))}}]),t}(n.Component)),_=(a(254),a(215)),R=a.n(_),W=function(e){function t(){return Object(m.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"Header"},c.a.createElement("div",{className:"MainWrapper"},c.a.createElement("div",{className:"LogoWrapper"},c.a.createElement("img",{src:R.a,height:44,alt:""}))),c.a.createElement("div",{className:"ActionsWrapper"}))}}]),t}(n.Component),x=a(216),B=a.n(x),F="0x25f5dc546ef27666c6e4ce75f470ab2b8c092a8f",H=function(){function e(){Object(m.a)(this,e)}return Object(l.a)(e,null,[{key:"initialize",value:function(){T=new B.a("http://127.0.0.1:8545/")}},{key:"getAccounts",value:function(){T&&console.log(T.eth.accounts)}},{key:"sendTransaction",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(T){var n=e.apply(void 0,Object(r.a)(t));n.hasOwnProperty("send")?n.send({from:F}).on("transactionHash",function(e){}).on("confirmation",function(e,t){}).on("receipt",function(e){a(!1,e)}).on("error",function(e){a(e)}):n.hasOwnProperty("call")&&n.call({from:F},a).then(function(e){})}}},{key:"getContract",value:function(e,t){return T?T.eth.Contract(e,t):null}}]),e}(),P=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).handleInputChange=function(e,t){a.setState(Object(y.a)({},t,e))},a.handleMethodInputChange=function(e,t){var n=a.state.methodInputs;a.setState({methodInputs:Object(p.a)({},n,Object(y.a)({},t,e))})},a.isFormValid=function(){var e=a.state,t=e.selectedContract,n=e.selectedMethod,c=e.methodInputs,o=e.selectedMethodInputs,s=e.sendingTransaction;if(!t||!n||s)return!1;var r=!0;return o.forEach(function(e){c[e.name]||(r=!1)}),r},a.handleSelectContract=function(e,t){var n=a.state.contracts.find(function(t){return t.name===e});a.setState({selectedContractMethods:n.methods,selectedMethod:null,selectedMethodInputs:[],methodInputs:{},sendingTransaction:!1,transactionResult:null}),a.handleInputChange(e,t)},a.handleSelectContractMethod=function(e,t){var n=a.state.selectedContractMethods.find(function(t){return t.name===e});a.setState({selectedMethodInputs:n.inputs,methodInputs:{},sendingTransaction:!1,transactionResult:null}),a.handleInputChange(e,t)},a.sendTransaction=function(){var e=a.state,t=e.contracts,n=e.selectedContract,c=e.methodInputs,o=e.selectedMethod,s=a.props,r=s.abi,l=s.onTransaction;a.setState({sendingTransaction:!0,transactionResult:null});var i=t.find(function(e){return e.name===n}),d=H.getContract(r[i.address],i.address).methods[o.replace("()","").replace("[constant] ","")];H.sendTransaction(d,Object.values(c),function(e,t){console.log(e,t),l&&l(e?{level:"error",method:o,contract:n,inputs:c,result:e.message}:{level:"info",method:o,contract:n,inputs:c,result:t}),setTimeout(function(){a.setState({sendingTransaction:!1,transactionResult:e?e.message:t})},1e3)})},a.state={initiallyLoaded:!1,contracts:[],methods:{},selectedContract:null,selectedContractMethods:[],selectedMethod:null,selectedMethodInputs:[],methodInputs:{},sendingTransaction:!1,transactionResult:null},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.initiallyLoaded,n=t.contracts,o=t.selectedContract,s=t.selectedContractMethods,r=t.selectedMethod,l=t.selectedMethodInputs,i=t.methodInputs,d=t.sendingTransaction,u=t.transactionResult;return c.a.createElement("div",{className:"Debugger"},c.a.createElement(W,null),!a&&c.a.createElement("div",{className:"DebuggerLoader"},c.a.createElement(I,null)),a&&c.a.createElement("div",{className:"DebuggerForm"},c.a.createElement(S,{value:o,options:n,field:"selectedContract",onChange:this.handleSelectContract,label:"Contract",disabled:d,placeholder:"Select contract"}),c.a.createElement(S,{value:r,options:s,field:"selectedMethod",onChange:this.handleSelectContractMethod,label:"Method",placeholder:"Select contract method",disabled:!o||d}),!!r&&!!l.length&&c.a.createElement("div",{className:"MethodInputsWrapper"},c.a.createElement("div",{className:"InputsHeading"},"Method Inputs"),l.map(function(t){return c.a.createElement("div",{key:t.name,className:"MethodInputItem"},c.a.createElement("div",{className:"InputName"},t.name),c.a.createElement("div",{className:"InputInput"},c.a.createElement(A,{value:i[t.name],field:t.name,onChange:e.handleMethodInputChange,placeholder:t.type})))})),c.a.createElement(D,{size:"large",disabled:!this.isFormValid(),color:"orange",onClick:this.sendTransaction},c.a.createElement("span",null,"Send Transaction")),(d||!!u)&&c.a.createElement("div",{className:"TransactionResultWrapper"},d&&c.a.createElement("div",{className:"ResultLoader"},c.a.createElement(I,null)),!d&&c.a.createElement("div",{className:"ResultContent"},c.a.createElement("span",null,"Transaction Result:"),c.a.createElement("pre",{className:"Result"},JSON.stringify(u,null,4))))))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return!t.initiallyLoaded&&e.contracts&&e.contracts.length?Object(p.a)({},t,{initiallyLoaded:!0,contracts:e.contracts}):e.contracts&&e.contracts.length?Object(p.a)({},t,{contracts:e.contracts}):null}}]),t}(n.Component);function z(e){return e.filter(function(e){return"function"===e.type}).map(function(e){return Object(p.a)({},e,{constant:e.constant,name:e.constant?"[constant] ".concat(e.name):"".concat(e.name,"()")})})}var J=function e(t){Object(m.a)(this,e),this.level=t.level||"info",this.type=t.type||"unknown",this.data={},this.timestamp=t.timestamp||new g.a},Y=function(e){function t(e){var a;Object(m.a)(this,t),a=Object(i.a)(this,Object(d.a)(t).call(this,e));var n=Object.values(e.data).map(function(e){var t=Object.keys(e.networks)[0],a=Object.values(e.networks)[0];return{contractName:e.contractName,fileName:"".concat(e.contractName,".sol"),name:"".concat(e.contractName,".sol"),networkId:t,address:a.address.toLowerCase(),creatorTx:a.transactionHash,methods:z(e.abi)}}),c="[".concat(n.map(function(e){return e.name}).join(", "),"]");return a.data={message:"Initial deployment of ".concat(c),description:"",contracts:n},a.meta={contracts:n},a}return Object(u.a)(t,e),t}(J),V=function(e){function t(e){var a,n;return Object(m.a)(this,t),a=Object(i.a)(this,Object(d.a)(t).call(this,{level:e.level,type:"contract_transaction"})),n="info"===e.level?"Called ".concat(e.method," in ").concat(e.contract):"Transaction revert calling ".concat(e.method," in ").concat(e.contract),a.data={message:n,description:""},a.meta={result:e.result,inputs:e.methodInputs},a}return Object(u.a)(t,e),t}(J),Z=function(e){function t(e){var a;Object(m.a)(this,t),a=Object(i.a)(this,Object(d.a)(t).call(this,{level:"info",type:"compiling_contracts"}));var n="[".concat(e.contracts.map(function(e){return"".concat(e.name,".sol")}).join(", "),"]");return a.data={message:"Changes detected in the following contracts: ".concat(n),description:""},a.meta={contracts:e.contracts},a}return Object(u.a)(t,e),t}(J),$=function(e){function t(e){var a;return Object(m.a)(this,t),a=Object(i.a)(this,Object(d.a)(t).call(this,{level:"error",type:"compiler_failure"})),console.log(e),a.data={message:"Compiling contracts failed with message: ".concat(e.err),description:""},a.meta={error:e.err},a}return Object(u.a)(t,e),t}(J),q=function(e){function t(e){var a;Object(m.a)(this,t),a=Object(i.a)(this,Object(d.a)(t).call(this,{level:"info",type:"compile_success"}));var n=Object.values(e.data).map(function(e){var t=Object.keys(e.networks)[0],a=Object.values(e.networks)[0];return{contractName:e.contractName,fileName:"".concat(e.contractName,".sol"),name:"".concat(e.contractName,".sol"),networkId:t,address:a.address.toLowerCase(),creatorTx:a.transactionHash,methods:z(e.abi)}}),c="[".concat(n.map(function(e){return e.name}).join(", "),"]");return a.data={message:"Successfully compiled and rewired contracts: ".concat(c),description:""},a.meta={contracts:n},a}return Object(u.a)(t,e),t}(J),G=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).addMessage=function(e){var t=a.state.logs;a.setState({logs:[].concat(Object(r.a)(t),[e])})},a.addMessageContracts=function(e){var t=a.state.contracts.filter(function(t){return!e.find(function(e){return t.name===e.name})});a.setState({contracts:[].concat(Object(r.a)(t),Object(r.a)(e))})},a.setContractAbi=function(e){var t=a.state.contractsAbi,n={};E.a.forEach(e,function(e,t){n[t.toLowerCase()]=e.abi}),a.setState({contractsAbi:Object(p.a)({},t,n)})},a.setConnectionInfo=function(e){a.setState({connectionInfo:{id:e.network_id,name:e.network_name,url:e.network_url}})},a.pushTransactionMessage=function(e){var t=new V(e);a.addMessage(t)},a.handleWebSocketMessage=function(e){var t=JSON.parse(e);switch(t.type){case"initial_message":var n=new Y(t);return a.addMessage(n),a.addMessageContracts(n.meta.contracts),a.setContractAbi(t.data),void a.setConnectionInfo(t);case"compiling":return void a.addMessage(new Z(t));case"compile_failed":return void a.addMessage(new $(t));case"new_version":var c=new q(t);return a.addMessage(c),a.addMessageContracts(c.meta.contracts),void a.setContractAbi(t.data);default:return void console.log("unparsed message",t)}},a.state={logs:[],contracts:[],contractsAbi:{},connectionInfo:null},H.initialize(),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state,t=e.contracts,a=e.logs,n=e.contractsAbi,o=e.connectionInfo;return c.a.createElement("div",{className:"App"},c.a.createElement(P,{contracts:t,abi:n,onTransaction:this.pushTransactionMessage}),c.a.createElement(w,{logs:a,connection:o}),c.a.createElement(f.a,{url:"ws://127.0.0.1:8080/ws",onMessage:this.handleWebSocketMessage}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(G,null),document.getElementById("AppRoot")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[217,1,2]]]);
//# sourceMappingURL=main.0c67ae71.chunk.js.map