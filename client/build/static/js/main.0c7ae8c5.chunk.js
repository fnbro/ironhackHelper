(this["webpackJsonpm3-react-typescript"]=this["webpackJsonpm3-react-typescript"]||[]).push([[0],{124:function(e,t,a){e.exports=a(226)},129:function(e,t,a){},224:function(e,t,a){},226:function(e,t,a){"use strict";a.r(t);var n,l=a(0),r=a.n(l),i=a(76),s=a.n(i),o=(a(129),a(9)),u=a(10),c=a(13),d=a(12),m=a(14),p=a(17),h=function(e){return l.createElement("nav",null,l.createElement("div",{id:"ironhack-helper"},l.createElement(p.a,{to:"/"},"Ironhack Helper")),l.createElement("div",{id:"nav-links"},l.createElement(p.a,{to:"/"},"Home"),l.createElement(p.a,{to:"/news"},"News"),l.createElement(p.a,{to:"/feedback"},"Feedback"),l.createElement(p.a,{to:"/forum"},"Forum"),l.createElement("div",{id:"dropdown"},l.createElement("button",{id:"dropbtn"},"Extras",l.createElement("i",{id:"fa fa-caret-down"})),l.createElement("div",{id:"dropdown-content"},l.createElement(p.a,{to:"/random"},"Pair Programming"),l.createElement(p.a,{to:"/links"},"Helpful Links"),l.createElement(p.a,{to:"/settings"},"Settings"))),l.createElement("div",null,l.createElement(p.a,{to:"/login"},"Login"),l.createElement(p.a,{to:"/register"},"Register"))))};!function(e){e.INIT="@@INIT",e.login_error="login_error",e.user_logged_in="user_logged_in",e.user_logged_out="user_logged_out",e.update_user="update_user",e.user_created="user_created",e.user_exists="user_exists",e.create_asset="create_asset",e.update_asset="update_asset",e.delete_asset="delete_asset",e.render_test="render_test",e.server_called="server_called",e.asset_updated="asset_updated",e.add_assets_from_server="add_assets_from_server"}(n||(n={}));var v=a(21),E=a.n(v),w={UI:{counter:0,loggedIn:!1,waitingForResponse:!1,Login:{errorMessage:""}},BM:{user:{firstname:"",lastname:"",username:"",password:""},assets:[]}},g={},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;window.CS.log("2. ACTION:"+t.type);var a=JSON.parse(JSON.stringify(e));a.UI.counter=e.UI.counter+1;var l=g[t.type];if(void 0!==l)return l(a,t),a;switch(t.type){case n.INIT:return a;default:return window.CS.log("1. Error!!!!! no reducer defined"),a}},y=a(15),f=Object(y.a)();g[n.login_error]=function(e,t){return e.UI.waitingForResponse=!1,e.UI.Login.errorMessage=t.errorMessage,e},g[n.user_logged_in]=function(e,t){return e.UI.waitingForResponse=!1,e.UI.Login.errorMessage="",e.UI.loggedIn=!0,e.BM.user=t.user,e},g[n.user_logged_out]=function(e,t){return e.UI.waitingForResponse=!1,e.UI.Login.errorMessage="",e.UI.loggedIn=!1,e.BM.user={lastname:"",firstname:"",username:"",password:""},e};var S=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return window.CS.getUIState().loggedIn?r.a.createElement("div",null,r.a.createElement("p",null,"You are logged in as ",window.CS.getBMState().user.username),r.a.createElement("button",{onClick:this.handleLogout},"Logout")):r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",{htmlFor:"username"},"Username:"),r.a.createElement("input",{type:"username",placeholder:"Your username",onChange:this.handleUsernameChange,value:window.CS.getBMState().user.username}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"password"},"Password:"),r.a.createElement("input",{type:"password",placeholder:"********",onChange:this.handlePasswordChange,value:window.CS.getBMState().user.password}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Login"})),r.a.createElement("p",null,window.CS.getUIState().Login.errorMessage))}},{key:"handleUsernameChange",value:function(e){var t=window.CS.getBMState().user;t.username=e.target.value;var a={type:n.update_user,user:t};window.CS.clientAction(a)}},{key:"handlePasswordChange",value:function(e){var t=window.CS.getBMState().user;t.password=e.target.value;var a={type:n.update_user,user:t};window.CS.clientAction(a)}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={type:n.server_called};window.CS.clientAction(t),E.a.post("/auth/login",window.CS.getBMState().user).then((function(e){var t=e.data;if(console.log(t),t.errorMessage){var a={type:n.login_error,errorMessage:t.errorMessage};window.CS.clientAction(a)}else{var l={type:n.user_logged_in,user:t};window.CS.clientAction(l),f.push("/feedback")}}))}},{key:"handleLogout",value:function(){var e={type:n.server_called};window.CS.clientAction(e),E.a.get("/auth/logout").then((function(e){var t={type:n.user_logged_out};window.CS.clientAction(t)}))}}]),t}(l.Component);g[n.update_user]=function(e,t){return console.log(t.user),e.BM.user=t.user,e},g[n.user_created]=function(e,t){return console.log(t.user),e.UI.waitingForResponse=!1,e.UI.loggedIn=!0,e};var k=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",{htmlFor:"firstname"},"First name:"),r.a.createElement("input",{type:"text",placeholder:"firstname",onChange:this.handleFirstnameChange,value:window.CS.getBMState().user.firstname}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"lastname"},"Last name:"),r.a.createElement("input",{type:"text",placeholder:"lastname",onChange:this.handleLastnameChange,value:window.CS.getBMState().user.lastname}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"username"},"Username:"),r.a.createElement("input",{type:"username",placeholder:"Your username",onChange:this.handleUsernameChange,value:window.CS.getBMState().user.username}),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"password"},"Password:"),r.a.createElement("input",{type:"password",placeholder:"********",onChange:this.handlePasswordChange,value:window.CS.getBMState().user.password}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit",value:"Register as new User"})))}},{key:"handleFirstnameChange",value:function(e){var t=window.CS.getBMState().user;t.firstname=e.target.value;var a={type:n.update_user,user:t};window.CS.clientAction(a)}},{key:"handleLastnameChange",value:function(e){var t=window.CS.getBMState().user;t.lastname=e.target.value;var a={type:n.update_user,user:t};window.CS.clientAction(a)}},{key:"handleUsernameChange",value:function(e){var t=window.CS.getBMState().user;t.username=e.target.value;var a={type:n.update_user,user:t};window.CS.clientAction(a)}},{key:"handlePasswordChange",value:function(e){var t=window.CS.getBMState().user;t.password=e.target.value;var a={type:n.update_user,user:t};window.CS.clientAction(a)}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={type:n.server_called};window.CS.clientAction(t),E.a.post("/auth/signup",window.CS.getBMState().user).then((function(e){var t={type:n.user_created};f.push("/"),window.CS.clientAction(t),console.log(e.data)}))}}]),t}(l.Component),_=a(22);g[n.asset_updated]=function(e,t){e.UI.waitingForResponse=!1},g[n.update_asset]=function(e,t){var a=e.BM.assets.filter((function(e){return e._id===t.asset._id}));return console.log(a),a[0].asset_name=t.asset.asset_name,a[0].asset_value=t.asset.asset_value,e},g[n.delete_asset]=function(e,t){var a=e.BM.assets.filter((function(e){return e._id!==t.asset._id}));return e.BM.assets=a,e};var C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleSwitchToEditMode=a.handleSwitchToEditMode.bind(Object(_.a)(a)),a.handleNameChange=a.handleNameChange.bind(Object(_.a)(a)),a.handleValueChange=a.handleValueChange.bind(Object(_.a)(a)),a.handleSave=a.handleSave.bind(Object(_.a)(a)),a.handleRerenderTest=a.handleRerenderTest.bind(Object(_.a)(a)),a.handleDelete=a.handleDelete.bind(Object(_.a)(a)),a.state={edit_mode:e.edit},a}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.state.edit_mode?r.a.createElement("tr",null,r.a.createElement("td",null,r.a.createElement("input",{type:"text",name:"name",value:this.props.asset.asset_name,onChange:this.handleNameChange})),r.a.createElement("td",null,r.a.createElement("input",{type:"number",name:"value",value:this.props.asset.asset_value,onChange:this.handleValueChange})," \u20ac"),r.a.createElement("td",null,r.a.createElement("button",{onClick:this.handleSave,id:this.props.asset._id},"save"),r.a.createElement("button",{onClick:this.handleRerenderTest},"increase State Counter"))):r.a.createElement("tr",null,r.a.createElement("td",null,this.props.asset.asset_name),r.a.createElement("td",null,this.props.asset.asset_value," \u20ac"),r.a.createElement("td",null,r.a.createElement("button",{onClick:this.handleSwitchToEditMode},"edit"),r.a.createElement("button",{onClick:this.handleDelete,id:this.props.asset._id},"sell or dispose"),r.a.createElement("button",{onClick:this.handleRerenderTest},"increase State Counter ",window.CS.getUIState().counter)))}},{key:"handleSwitchToEditMode",value:function(){this.setState({edit_mode:!0})}},{key:"handleNameChange",value:function(e){var t=this.props.asset;t.asset_name=e.target.value;var a={type:n.update_asset,asset:t};window.CS.clientAction(a)}},{key:"handleValueChange",value:function(e){var t=this.props.asset;t.asset_value=e.target.value;var a={type:n.update_asset,asset:t};window.CS.clientAction(a)}},{key:"handleSave",value:function(e){this.setState({edit_mode:!1});var t={type:n.server_called};window.CS.clientAction(t),E.a.put("/assets/update/"+this.props.asset._id,this.props.asset).then((function(e){var t={type:n.asset_updated};window.CS.clientAction(t)}))}},{key:"handleDelete",value:function(){var e=this,t={type:n.server_called};window.CS.clientAction(t),E.a.post("/assets/delete/"+this.props.asset._id).then((function(t){var a={type:n.delete_asset,asset:e.props.asset};window.CS.clientAction(a)}))}},{key:"handleRerenderTest",value:function(e){var t={type:n.render_test};window.CS.clientAction(t)}}]),t}(r.a.PureComponent),O=a(122),j=a.n(O);g[n.create_asset]=function(e,t){return e.BM.assets.push(t.asset),e.UI.waitingForResponse=!1,e};var I=function(e){function t(e){var a;return Object(o.a)(this,t),console.log("new App component will be initialized"),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleCreateAsset=a.handleCreateAsset.bind(Object(_.a)(a)),a}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("p",null," ",window.CS.getUIState().waitingForResponse.toString(),window.CS.getUIState().counter),r.a.createElement("h1",null,"simple asset management application"),r.a.createElement("p",null,"to create a new asset click this button:\xa0",r.a.createElement("button",{onClick:this.handleCreateAsset},"create asset")),r.a.createElement("table",null,r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",null,"description"),r.a.createElement("th",null,"value"),r.a.createElement("th",null,"action")),window.CS.getBMState().assets.map((function(e){return r.a.createElement(C,{key:e._id,asset:e,edit:!1})})))))}},{key:"handleCreateAsset",value:function(){console.log("handleCreateAsset invoked");var e={type:n.server_called};window.CS.clientAction(e);var t={_id:j.a.Types.ObjectId().toString(),asset_name:"",asset_value:0},a={type:n.create_asset,asset:t};E.a.post("/assets/add",t).then((function(e){window.CS.clientAction(a),console.log(e.data)}))}}]),t}(l.Component),M=a(25),U=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Startpage"))}}]),t}(l.Component),A=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Ironhack Weekly Survey"),r.a.createElement("h5",null,"Hey there, We hope you enjoyed your week to the fullest ! As you may know, we take feedback very seriously. Part of getting your feedback will be through this weekly survey. We will send you a survey like this one every week so you can give us your feedback about different topics that help us to improve. Remember that the feedback should be constructive & action-oriented. Other than that, enjoy the ride and get ready for a great & intense time!"),r.a.createElement("h3",null,"Please enter your name:"),r.a.createElement("input",{type:"text"}),r.a.createElement("h3",null,"Choose the current week"),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week1",name:"CurrentWeek",value:"Week1"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 1")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week2",name:"CurrentWeek",value:"Week2"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 2")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week3",name:"CurrentWeek",value:"Week3"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 3")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week4",name:"CurrentWeek",value:"Week4"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 4")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week5",name:"CurrentWeek",value:"Week5"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 5")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week6",name:"CurrentWeek",value:"Week6"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 6")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week7",name:"CurrentWeek",value:"Week7"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 7")),r.a.createElement("div",null,r.a.createElement("input",{type:"radio",id:"week8",name:"CurrentWeek",value:"Week8"}),r.a.createElement("label",{htmlFor:"week1"}," => Week 8")),r.a.createElement("div",null,r.a.createElement("h3",null,"On a scale from 0 to 10, how satisfied are you with this week at Ironhack?"),r.a.createElement("input",{type:"radio",id:"satisfied0",name:"Satisfied",value:"Satisfied0"}),r.a.createElement("input",{type:"radio",id:"satisfied1",name:"Satisfied",value:"Satisfied1"}),r.a.createElement("input",{type:"radio",id:"satisfied2",name:"Satisfied",value:"Satisfied2"}),r.a.createElement("input",{type:"radio",id:"satisfied3",name:"Satisfied",value:"Satisfied3"}),r.a.createElement("input",{type:"radio",id:"satisfied4",name:"Satisfied",value:"Satisfied4"}),r.a.createElement("input",{type:"radio",id:"satisfied5",name:"Satisfied",value:"Satisfied5"}),r.a.createElement("input",{type:"radio",id:"satisfied6",name:"Satisfied",value:"Satisfied6"}),r.a.createElement("input",{type:"radio",id:"satisfied7",name:"Satisfied",value:"Satisfied7"}),r.a.createElement("input",{type:"radio",id:"satisfied8",name:"Satisfied",value:"Satisfied8"}),r.a.createElement("input",{type:"radio",id:"satisfied9",name:"Satisfied",value:"Satisfied9"}),r.a.createElement("input",{type:"radio",id:"satisfied10",name:"Satisfied",value:"Satisfied10"})),r.a.createElement("div",null,r.a.createElement("h3",null,"Please pick 3 areas of your learning experience that you think we are doing well (check 3 that apply):"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"salami"}),"Curriculum topics and structure")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"schinken"}),"Curriculum difficulty level")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Quality of lessons")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Quality of labs (WebDev & Data) and projects (UX/UI)")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher technical skills")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher teaching ability")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher accessibility")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher\xb4s Assistant abilities")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Helping you achieve your personal learning goals")))),r.a.createElement("div",null,r.a.createElement("h3",null,"Please pick 3 areas of your learning experience that you think we need to improve most (check 3 that apply):"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"salami"}),"Curriculum topics and structure")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"schinken"}),"Curriculum difficulty level")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Quality of lessons")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Quality of labs (WebDev & Data) and projects (UX/UI)")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher technical skills")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher teaching ability")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher accessibility")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Teacher\xb4s Assistant abilities")),r.a.createElement("li",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"zutat",value:"sardellen"}),"Helping you achieve your personal learning goals")))),r.a.createElement("div",null,r.a.createElement("h3",null,"Any other comments about this week?"),r.a.createElement("input",{type:"text"})),r.a.createElement("input",{type:"submit",value:"Submit"}))}}]),t}(l.Component);g[n.server_called]=function(e,t){return e.UI.waitingForResponse=!0,e},g[n.add_assets_from_server]=function(e,t){return e.UI.waitingForResponse=!1,e.BM.assets=t.assets,e};var x=function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e={type:n.server_called};window.CS.clientAction(e),E.a.get("/assets/read").then((function(e){console.log("this data was loaded as a result of componentDidMount:"),console.log(e.data);var t={type:n.add_assets_from_server,assets:e.data};window.CS.clientAction(t)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return window.CS.log("App --\x3e render()"),r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null),r.a.createElement(M.c,null,r.a.createElement(M.a,{path:"/showassets",component:I}),r.a.createElement(M.a,{path:"/register",component:k}),r.a.createElement(M.a,{path:"/login",component:S}),r.a.createElement(M.a,{exact:!0,path:"/",component:U}),r.a.createElement(M.a,{path:"/feedback",component:A})))}}]),t}(r.a.PureComponent);a(224),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B,W=a(41),F=a(79);B=window.__REDUX_DEVTOOLS_EXTENSION__?Object(W.b)(Object(W.a)(F.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()):Object(W.a)(F.a);var T=function(){function e(){Object(o.a)(this,e),this.store=void 0}return Object(u.a)(e,[{key:"log",value:function(e){console.log(e)}},{key:"getStore",value:function(){return this.store}},{key:"getState",value:function(){return this.store.getState()}},{key:"getUIState",value:function(){return this.getState().UI}},{key:"getBMState",value:function(){return this.getState().BM}},{key:"initializeStore",value:function(){this.store=Object(W.c)(b,B)}},{key:"clientAction",value:function(e){this.store.dispatch(e)}},{key:"getDBServerURL_test",value:function(){return"http://localhost:8080"}}]),e}();window.CS=new T,window.CS.initializeStore(),s.a.render(r.a.createElement(M.b,{history:f},r.a.createElement(x,{stateCounter:window.CS.getUIState().counter})),document.getElementById("root")),window.CS.getStore().subscribe((function(){window.CS.log("3. before render ---------------------------------------------"),s.a.render(r.a.createElement(M.b,{history:f},r.a.createElement(x,{stateCounter:window.CS.getUIState().counter})),document.getElementById("root")),window.CS.log("3. after render ---------------------------------------------")})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[124,1,2]]]);
//# sourceMappingURL=main.0c7ae8c5.chunk.js.map