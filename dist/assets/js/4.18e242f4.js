(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{154:function(t,n,e){"use strict";e.r(n);var s=e(0),a=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content"},[e("h3",{attrs:{id:"日常跨域解决方案之-iframe-postmessage"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#日常跨域解决方案之-iframe-postmessage","aria-hidden":"true"}},[t._v("#")]),t._v(" 日常跨域解决方案之(iframe + postMessage)")]),e("p",[t._v("原理：postMessage可以与任意域名之间通信(只要能通信了，其他的就都是浮云了),"),e("br"),t._v("\n类似一个代理，A域名不能直接访问B域名的接口，于是B给A派了一个小弟(pageC.html页面)，然后跟A说，你可以通过快递小哥(postMessage)把你的请求告诉我小弟，然后我小弟会把你想要的结果快递给你~")]),e("p",[t._v("代码："),e("code",[t._v("http://dev.test.com/post-message.html")])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>iframe-posMessage示例</title>\n</head>\n<body>\n\t<button id="but">执行请求</button>\n\n\t<iframe src="http://dev.example.com/iframe-postMessage" id="iframe" frameborder="0"></iframe>\n\t\n\t<script type="text/javascript">\n\t\twindow.onload = () =>{\n\t\t\tlet but = document.querySelector("#but");\n\n\t\t\tbut.onclick = function(){\n\t\t\t\tlet requestOptions = {\n\t\t\t\t\tmethods: \'get\',\n\t\t\t\t\turl: \'http://dev.example.com/get-name\',\n\t\t\t\t}\n\n\t\t\t\tcreateRequest(requestOptions, function(res){\n\t\t\t\t\tconsole.log(\'响应...\');\n\t\t\t\t\tconsole.log(res);\n\t\t\t\t})\n\t\t\t}\n\t\t}\n\n\t\t// 初始化请求个数\n\t\twindow.requestIndex = 0;\n\n\t\tlet iframe = window.frames[0];\n\n\t\t// 创建一个请求\n\t\tfunction createRequest(opt, next){\n\t\t\t// 请求次数自增，避免下次请求时回调执行絮乱\n\t\t\trequestIndex++;\n\n\t\t\t// 回调函数名称\n\t\t\tlet funName = \'postMessageBack_\' + requestIndex;\n\n\t\t\t// 把请求标识带过去\n\t\t\topt.callback = funName;\n\n\t\t\t// 定义回调名称\n\t\t\twindow[funName] = function(res){\n\t\t\t\t// 执行回调\n\t\t\t\tnext(res);\n\t\t\t}\n\n\t\t\tlet str = JSON.stringify(opt)\n\n\t\t\tiframe.postMessage(str, \'*\');\n\t\t}\n\n\t\twindow.addEventListener("message", function(event){\n\t\t\tlet data = {};\n\n\t\t\tif(event.data){\n\t\t\t\tdata = JSON.parse(event.data);\n\t\t\t}\n\n\t\t\tlet callbackName = data.callback;\n\n\t\t\tif(callbackName){\n\t\t\t\tdelete data.callback;\n\t\t\t}\n\n\t\t\t// 执行回调\n\t\t\ttypeof window[callbackName] === \'function\' && window[callbackName](data);\n\n\t\t}, false);\n\t<\/script>\n</body>\n</html>\n')])])]),e("p",[t._v("代码："),e("code",[t._v("http://dev.example.com/iframe-postMessage")])]),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>快递小哥</title>\n</head>\n<body>\n\t<script type="text/javascript">\n\t\twindow.onload = () =>{\n\n\t\t\twindow.addEventListener("message", function(event){\n\t\t\t\tlet origin = event.origin;\n\t\t\t\t// 允许访问的白名单\n\t\t\t\tlet whitelist = [\n\t\t\t\t\t\'http://dev.test.com\',\n\t\t\t\t\t\'http://dev.test2.com\',\n\t\t\t\t\t\'http://dev.test3.com\',\n\t\t\t\t];\n\n\t\t\t\tif(whitelist.indexOf(origin) == -1){\n\t\t\t\t\tconsole.log("不在白名单内~");\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tlet requestOpstions = JSON.parse(event.data);\n\n\t\t\t\t// 发出请求\n\t\t\t\trequest(requestOpstions, function(res){\n\n\t\t\t\t\tres.callback = requestOpstions.callback;\n\n\t\t\t\t\tlet resJson = JSON.stringify(res);\n\n\t\t\t\t\t// 把数据广播出去\n\t\t\t\t\twindow.parent.postMessage(resJson, origin);\n\t\t\t\t})\n\n\t\t\t}, false);\n\n\t\t\t// 常规请求\n\t\t\tfunction request(options, next){\n\t\t\t\tvar xhr = new XMLHttpRequest(); \n\t\t\t\tvar methods = options.methods.toLocaleUpperCase();\n\n\t\t\t\t// 异步传输\n\t\t\t\txhr.open(methods, options.url, true);\n\n\t\t\t\t//发送请求\n\t\t\t\txhr.send(null);\n\n\t\t\t\txhr.onreadystatechange = function() {//Call a function when the state changes.\n\t\t\t\t\tif(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {\n\t\t\t\t\t\tlet response = xhr.responseText;\n\n\t\t\t\t\t\tresponse = JSON.parse(response);\n\n\t\t\t\t\t\t// 请求结束后,在此处写处理代码\n\t\t\t\t\t\tnext(response)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t}\n\n\t<\/script>\n\n</body>\n</html>\n')])])]),e("h4",{attrs:{id:"小结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#小结","aria-hidden":"true"}},[t._v("#")]),t._v(" 小结")]),e("ul",[e("li",[t._v("本质\n"),e("ul",[e("li",[t._v("postMessage跨域通信")]),e("li",[t._v("把请求委托给目标域名的页面")])])]),e("li",[t._v("缺点\n"),e("ul",[e("li",[t._v("ie8+才支持，而且ie8+<ie10只支持iframe的方式")])])]),e("li",[t._v("优点\n"),e("ul",[e("li",[t._v("支持各个类型的请求")])])])])])}],!1,null,null,null);n.default=a.exports}}]);