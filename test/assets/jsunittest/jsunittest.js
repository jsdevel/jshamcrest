var a,JsUnitTest={Unit:{},inspect:function(b,c){try{if(typeof b=="undefined")return"undefined";if(b===null)return"null";if(typeof b=="string"){c=c;var d=this.gsub(b,/[\x00-\x1f\\]/,function(f){var g=String.specialChar[f[0]];return g?g:"\\u00"+f[0].charCodeAt().toPaddedString(2,16)});if(c)return'"'+d.replace(/"/g,'\\"')+'"';return"'"+d.replace(/'/g,"\\'")+"'"}return String(b)}catch(e){if(e instanceof RangeError)return"...";throw e;}},$:function(b){if(arguments.length>1){for(var c=0,d=[],e=arguments.length;c<
e;c++)d.push(this.$(arguments[c]));return d}if(typeof b=="string")b=document.getElementById(b);return b},gsub:function(b,c,d){var e="",f;for(d=arguments.callee.prepareReplacement(d);b.length>0;)if(f=b.match(c)){e+=b.slice(0,f.index);e+=JsUnitTest.String.interpret(d(f));b=b.slice(f.index+f[0].length)}else{e+=b;b=""}return e},scan:function(b,c,d){this.gsub(b,c,d);return String(b)},escapeHTML:function(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},arrayfromargs:function(b){var c=
[],d;for(d=0;d<b.length;d++)c[d]=b[d];return c},hashToSortedArray:function(b){var c=[];for(key in b)c.push([key,b[key]]);return c.sort()},flattenArray:function(b,c){c=c||[];for(var d=0;d<b.length;d++){var e=b[d];e!=null&&typeof e=="object"&&"splice"in e&&"join"in e?this.flattenArray(e,c):c.push(e)}return c},selectorMatch:function(b,c){b=[];var d={laterSibling:/^\s*~\s*/,child:/^\s*>\s*/,adjacent:/^\s*\+\s*/,descendant:/^\s/,tagName:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/,
pseudo:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,attrPresence:/^\[((?:[\w]+:)?[\w]+)\]/,attr:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/},e={tagName:function(k,j){return j[1].toUpperCase()==k.tagName.toUpperCase()},className:function(k,j){return Element.hasClassName(k,j[1])},id:function(k,j){return k.id===j[1]},attrPresence:function(k,j){return Element.hasAttribute(k,j[1])},attr:function(k,
j){return(k=Element.readAttribute(k,j[1]))&&operators[j[2]](k,j[5]||j[6])}},f=this.expression;d=d;for(var g=e,h,l;f&&h!==f&&/\S/.test(f);){h=f;for(var i in d){l=d[i];if(l=f.match(l))if(g[i]){b.push([i,Object.clone(l)]);f=f.replace(l[0],"")}}}h=true;for(i=0;d=b[i];i++){f=d[0];d=d[1];if(!e[f](c,d)){h=false;break}}return h},toQueryParams:function(b,c){b=b||window.location.search;var d=b.replace(/^\s+/,"").replace(/\s+$/,"").match(/([^?#]*)(#.*)?$/);if(!d)return{};b={};c=d[1].split(c||"&");for(d=0;d<
c.length;d++){var e=c[d].split("=");if(e[0]){var f=decodeURIComponent(e.shift());e=e.length>1?e.join("="):e[0];if(e!=undefined)e=decodeURIComponent(e);if(f in b){var g=b[f];(g=g!=null&&typeof g=="object"&&"splice"in g&&"join"in g)||(b[f]=[b[f]]);b[f].push(e)}else b[f]=e}}return b},String:{interpret:function(b){return b==null?"":String(b)}}};JsUnitTest.gsub.prepareReplacement=function(b){if(typeof b=="function")return b;var c=new Template(b);return function(d){return c.evaluate(d)}};
JsUnitTest.Version="0.7.3";JsUnitTest.Template=function(b,c){this.template=b;this.pattern=c||JsUnitTest.Template.Pattern};
JsUnitTest.Template.prototype.evaluate=function(b){if(typeof b.toTemplateReplacements=="function")b=b.toTemplateReplacements();return JsUnitTest.gsub(this.template,this.pattern,function(c){if(b==null)return"";var d=c[1]||"";if(d=="\\")return c[2];var e=b,f=c[3],g=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;c=g.exec(f);if(c==null)return d;for(;c!=null;){var h=c[1].indexOf("[]")===0?c[2].gsub("\\\\]","]"):c[1];e=e[h];if(null==e||""==c[3])break;f=f.substring("["==c[3]?c[1].length:c[0].length);c=g.exec(f)}return d+
JsUnitTest.String.interpret(e)})};JsUnitTest.Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;JsUnitTest.Event={};JsUnitTest.Event.addEvent=function(b,c,d){if(b.addEventListener)b.addEventListener(c,d,false);else{if(!d.$$guid)d.$$guid=JsUnitTest.Event.addEvent.guid++;if(!b.events)b.events={};var e=b.events[c];if(!e){e=b.events[c]={};if(b["on"+c])e[0]=b["on"+c]}e[d.$$guid]=d;b["on"+c]=this.handleEvent}};JsUnitTest.Event.addEvent.guid=1;
JsUnitTest.Event.removeEvent=function(b,c,d){if(b.removeEventListener)b.removeEventListener(c,d,false);else b.events&&b.events[c]&&delete b.events[c][d.$$guid]};JsUnitTest.Event.handleEvent=function(b){var c=true;b=b||JsUnitTest.Event.fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);var d=this.events[b.type];for(var e in d){this.$$handleEvent=d[e];if(this.$$handleEvent(b)===false)c=false}return c};
JsUnitTest.Event.fixEvent=function(b){b.preventDefault=this.fixEvent.preventDefault;b.stopPropagation=this.fixEvent.stopPropagation;return b};JsUnitTest.Event.fixEvent.preventDefault=function(){this.returnValue=false};JsUnitTest.Event.fixEvent.stopPropagation=function(){this.cancelBubble=true};JsUnitTest.Unit.Logger=function(b){(this.element=JsUnitTest.$(b))&&this._createLogTable()};a=JsUnitTest.Unit.Logger.prototype;
a.start=function(b){if(this.element){var c=this.element.getElementsByTagName("tbody")[0],d=document.createElement("tr"),e;e=document.createElement("td");e.appendChild(document.createTextNode(b));d.appendChild(e);d.appendChild(document.createElement("td"));d.appendChild(document.createElement("td"));c.appendChild(d)}};a.setStatus=function(b){var c=this.getLastLogLine();c.className=b;c=c.getElementsByTagName("td")[1];c.appendChild(document.createTextNode(b))};
a.finish=function(b,c){if(this.element){this.setStatus(b);this.message(c)}};a.message=function(b){if(this.element){var c=this.getMessageCell();c.innerHTML=this._toHTML(b)}};a.summary=function(b){if(this.element){var c=this.element.getElementsByTagName("div")[0];c.innerHTML=this._toHTML(b)}};a.getLastLogLine=function(){var b=this.element.getElementsByTagName("tbody")[0];b=b.getElementsByTagName("tr");return b[b.length-1]};a.getMessageCell=function(){var b=this.getLastLogLine();return b.getElementsByTagName("td")[2]};
a._createLogTable=function(){var b='<div class="logsummary">running...</div><table class="logtable"><thead><tr><th>Status</th><th>Test</th><th>Message</th></tr></thead><tbody class="loglines"></tbody></table>';this.element.innerHTML=b};a.appendActionButtons=function(){};a._toHTML=function(b){return JsUnitTest.escapeHTML(b).replace(/\n/g,"<br/>")};JsUnitTest.Unit.MessageTemplate=function(b){var c=[];JsUnitTest.scan(b||"",/(?=[^\\])\?|(?:\\\?|[^\?])+/,function(d){c.push(d[0])});this.parts=c};
JsUnitTest.Unit.MessageTemplate.prototype.evaluate=function(b){for(var c=[],d=0;d<this.parts.length;d++){var e=this.parts[d];e=e=="?"?JsUnitTest.inspect(b.shift()):e.replace(/\\\?/,"?");c.push(e)}return c.join("")};
JsUnitTest.ajax=function(b){function c(h){try{return!h.status&&location.protocol=="file:"||h.status>=200&&h.status<300||h.status==304||navigator.userAgent.indexOf("Safari")>=0&&typeof h.status=="undefined"}catch(l){}return false}function d(h,l){var i=h.getResponseHeader("content-type");i=!l&&i&&i.indexOf("xml")>=0;i=l=="xml"||i?h.responseXML:h.responseText;l=="script"&&eval.call(window,i);return i}b={type:b.type||"POST",url:b.url||"",timeout:b.timeout||5E3,onComplete:b.onComplete||function(){},onError:b.onError||
function(){},onSuccess:b.onSuccess||function(){},data:b.data||""};var e=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;e.open(b.type,b.url,true);var f=5E3,g=false;setTimeout(function(){g=true},f);e.onreadystatechange=function(){if(e.readyState==4&&!g){c(e)?b.onSuccess(d(e,b.type)):b.onError();b.onComplete();e=null}};e.send(null)};
JsUnitTest.Unit.Assertions={buildMessage:function(b,c){var d=JsUnitTest.arrayfromargs(arguments).slice(2);return(b?b+"\n":"")+(new JsUnitTest.Unit.MessageTemplate(c)).evaluate(d)},flunk:function(b){this.assertBlock(b||"Flunked",function(){return false})},assertBlock:function(b,c){try{c.call(this)?this.pass():this.fail(b)}catch(d){this.error(d)}},assert:function(b,c){c=this.buildMessage(c||"assert","got <?>",b);this.assertBlock(c,function(){return b})},assertEqual:function(b,c,d){d=this.buildMessage(d||
"assertEqual","expected <?>, actual: <?>",b,c);this.assertBlock(d,function(){return b==c})},assertNotEqual:function(b,c,d){d=this.buildMessage(d||"assertNotEqual","expected <?>, actual: <?>",b,c);this.assertBlock(d,function(){return b!=c})},assertEnumEqual:function(b,c,d){d=this.buildMessage(d||"assertEnumEqual","expected <?>, actual: <?>",b,c);var e=JsUnitTest.flattenArray(b),f=JsUnitTest.flattenArray(c);this.assertBlock(d,function(){if(e.length==f.length){for(var g=0;g<e.length;g++)if(e[g]!=f[g])return false;
return true}return false})},assertEnumNotEqual:function(b,c,d){d=this.buildMessage(d||"assertEnumNotEqual","<?> was the same as <?>",b,c);var e=JsUnitTest.flattenArray(b),f=JsUnitTest.flattenArray(c);this.assertBlock(d,function(){if(e.length==f.length){for(var g=0;g<e.length;g++)if(e[g]!=f[g])return true;return false}return true})},assertHashEqual:function(b,c,d){d=this.buildMessage(d||"assertHashEqual","expected <?>, actual: <?>",b,c);var e=JsUnitTest.flattenArray(JsUnitTest.hashToSortedArray(b)),
f=JsUnitTest.flattenArray(JsUnitTest.hashToSortedArray(c));b=function(){if(e.length==f.length){for(var g=0;g<e.length;g++)if(e[g]!=f[g])return false;return true}return false};this.assertBlock(d,b)},assertHashNotEqual:function(b,c,d){d=this.buildMessage(d||"assertHashNotEqual","<?> was the same as <?>",b,c);var e=JsUnitTest.flattenArray(JsUnitTest.hashToSortedArray(b)),f=JsUnitTest.flattenArray(JsUnitTest.hashToSortedArray(c));b=function(){if(e.length==f.length){for(var g=0;g<e.length;g++)if(e[g]!=
f[g])return true;return false}return true};this.assertBlock(d,b)},assertIdentical:function(b,c,d){d=this.buildMessage(d||"assertIdentical","expected <?>, actual: <?>",b,c);this.assertBlock(d,function(){return b===c})},assertNotIdentical:function(b,c,d){d=this.buildMessage(d||"assertNotIdentical","expected <?>, actual: <?>",b,c);this.assertBlock(d,function(){return b!==c})},assertNull:function(b,c){c=this.buildMessage(c||"assertNull","got <?>",b);this.assertBlock(c,function(){return b===null})},assertNotNull:function(b,
c){c=this.buildMessage(c||"assertNotNull","got <?>",b);this.assertBlock(c,function(){return b!==null})},assertUndefined:function(b,c){c=this.buildMessage(c||"assertUndefined","got <?>",b);this.assertBlock(c,function(){return typeof b=="undefined"})},assertNotUndefined:function(b,c){c=this.buildMessage(c||"assertNotUndefined","got <?>",b);this.assertBlock(c,function(){return typeof b!="undefined"})},assertNullOrUndefined:function(b,c){c=this.buildMessage(c||"assertNullOrUndefined","got <?>",b);this.assertBlock(c,
function(){return b==null})},assertNotNullOrUndefined:function(b,c){c=this.buildMessage(c||"assertNotNullOrUndefined","got <?>",b);this.assertBlock(c,function(){return b!=null})},assertMatch:function(b,c,d){d=this.buildMessage(d||"assertMatch","regex <?> did not match <?>",b,c);this.assertBlock(d,function(){return(new RegExp(b)).exec(c)})},assertNoMatch:function(b,c,d){d=this.buildMessage(d||"assertNoMatch","regex <?> matched <?>",b,c);this.assertBlock(d,function(){return!(new RegExp(b)).exec(c)})},
assertHasClass:function(b,c,d){b=JsUnitTest.$(b);d=this.buildMessage(d||"assertHasClass","? doesn't have class <?>.",b,c);this.assertBlock(d,function(){var e=b.className;return e.length>0&&(e==c||(new RegExp("(^|\\s)"+c+"(\\s|$)")).test(e))})},assertNotHasClass:function(b,c,d){b=JsUnitTest.$(b);d=this.buildMessage(d||"assertNotHasClass","? does have class <?>.",b,c);this.assertBlock(d,function(){var e=b.className;return!(e.length>0&&(e==c||(new RegExp("(^|\\s)"+c+"(\\s|$)")).test(e)))})},assertHidden:function(b,
c){b=JsUnitTest.$(b);c=this.buildMessage(c||"assertHidden","? isn't hidden.",b);this.assertBlock(c,function(){return!b.style.display||b.style.display=="none"})},assertInstanceOf:function(b,c,d){d=this.buildMessage(d||"assertInstanceOf","<?> was not an instance of the expected type",c);this.assertBlock(d,function(){return c instanceof b})},assertNotInstanceOf:function(b,c,d){d=this.buildMessage(d||"assertNotInstanceOf","<?> was an instance of the expected type",c);this.assertBlock(d,function(){return!(c instanceof
b)})},assertRespondsTo:function(b,c,d){d=this.buildMessage(d||"assertRespondsTo","object doesn't respond to <?>",b);this.assertBlock(d,function(){return b in c&&typeof c[b]=="function"})},assertRaise:function(b,c,d){d=this.buildMessage(d||"assertRaise","<?> exception expected but none was raised",b);var e=function(){try{c();return false}catch(f){if(f.name==b)return true;else throw f;}};this.assertBlock(d,e)},assertNothingRaised:function(b,c){try{b();this.assert(true,"Expected nothing to be thrown")}catch(d){c=
this.buildMessage(c||"assertNothingRaised","<?> was thrown when nothing was expected.",d);this.flunk(c)}},_isVisible:function(b){b=JsUnitTest.$(b);if(!b.parentNode)return true;this.assertNotNull(b);if(b.style&&b.style.display=="none")return false;return arguments.callee.call(this,b.parentNode)},assertVisible:function(b,c){c=this.buildMessage(c,"? was not visible.",b);this.assertBlock(c,function(){return this._isVisible(b)})},assertNotVisible:function(b,c){c=this.buildMessage(c,"? was not hidden and didn't have a hidden parent either.",
b);this.assertBlock(c,function(){return!this._isVisible(b)})},assertElementsMatch:function(){var b=true,c=JsUnitTest.arrayfromargs(arguments),d=c.shift();if(d.length!=c.length){message=this.buildMessage("assertElementsMatch","size mismatch: ? elements, ? expressions (?).",d.length,c.length,c);this.flunk(message);b=false}for(var e=0;e<c.length;e++){b=c[e];var f=JsUnitTest.$(d[e]);if(JsUnitTest.selectorMatch(b,f)){b=true;break}message=this.buildMessage("assertElementsMatch","In index <?>: expected <?> but got ?",
index,b,f);this.flunk(message);b=false}this.assert(b,"Expected all elements to match.")},assertElementMatches:function(b,c){this.assertElementsMatch([b],c)}};
JsUnitTest.Unit.Runner=function(b,c){c=c||{};var d=this.options={};d.testLog="testLog"in c?c.testLog:"testlog";d.resultsURL=this.queryParams.resultsURL;d.testLog=JsUnitTest.$(d.testLog);this.tests=this.getTests(b);this.currentTest=0;this.logger=new JsUnitTest.Unit.Logger(d.testLog);var e=this;JsUnitTest.Event.addEvent(window,"load",function(){setTimeout(function(){e.runTests()},0.1)})};a=JsUnitTest.Unit.Runner.prototype;a.queryParams=JsUnitTest.toQueryParams();
a.portNumber=function(){if(window.location.search.length>0){var b=window.location.search.match(/\:(\d{3,5})\//);if(b)return parseInt(b[1])}return null};a.getTests=function(b){var c=[],d=this.options;if(this.queryParams.tests)c=this.queryParams.tests.split(",");else if(d.tests)c=d.tests;else if(d.test)c=[option.test];else for(testname in b)testname.match(/^test/)&&c.push(testname);d=[];for(var e=0;e<c.length;e++){var f=c[e];b[f]&&d.push(new JsUnitTest.Unit.Testcase(f,b[f],b.setup,b.teardown))}return d};
a.getResult=function(){for(var b={tests:this.tests.length,assertions:0,failures:0,errors:0,warnings:0},c=0;c<this.tests.length;c++){var d=this.tests[c];b.assertions+=d.assertions;b.failures+=d.failures;b.errors+=d.errors;b.warnings+=d.warnings}return b};
a.postResults=function(){if(this.options.resultsURL){var b=this.getResult(),c=this.options.resultsURL+"?";c+="tests="+this.tests.length+"&";c+="assertions="+b.assertions+"&";c+="warnings="+b.warnings+"&";c+="failures="+b.failures+"&";c+="errors="+b.errors;JsUnitTest.ajax({url:c,type:"GET"})}};
a.runTests=function(){var b=this.tests[this.currentTest];if(!b)return this.finish();b.isWaiting||this.logger.start(b.name);b.run();var c=this;if(b.isWaiting){this.logger.message("Waiting for "+b.timeToWait+"ms");setTimeout(function(){c.runTests()},b.timeToWait||1E3)}else{this.logger.finish(b.status(),b.summary());if(b=b.actions)this.logger.appendActionButtons(b);this.currentTest++;this.runTests()}};a.finish=function(){this.postResults();this.logger.summary(this.summary())};a.summary=function(){return(new JsUnitTest.Template("#{tests} tests, #{assertions} assertions, #{failures} failures, #{errors} errors, #{warnings} warnings")).evaluate(this.getResult())};
JsUnitTest.Unit.Testcase=function(b,c,d,e){this.name=b;this.test=c||function(){};this.setup=d||function(){};this.teardown=e||function(){};this.messages=[];this.actions={}};for(method in JsUnitTest.Unit.Assertions)JsUnitTest.Unit.Testcase.prototype[method]=JsUnitTest.Unit.Assertions[method];a=JsUnitTest.Unit.Testcase.prototype;a.isWaiting=false;a.timeToWait=1E3;a.assertions=0;a.failures=0;a.errors=0;a.warnings=0;a.isRunningFromRake=window.location.port;
a.wait=function(b,c){this.isWaiting=true;this.test=c;this.timeToWait=b};a.run=function(b){try{try{this.isWaiting||this.setup();this.isWaiting=false;this.test()}finally{this.isWaiting||this.teardown()}}catch(c){if(b)throw c;this.error(c,this)}};a.summary=function(){var b="#{assertions} assertions, #{failures} failures, #{errors} errors, #{warnings} warnings\n";return(new JsUnitTest.Template(b)).evaluate(this)+this.messages.join("\n")};a.pass=function(){this.assertions++};
a.fail=function(b){this.failures++;var c="";try{throw new Error("stack");}catch(d){c=(/\.html:(\d+)/.exec(d.stack||"")||["",""])[1]}this.messages.push("Failure: "+b+(c?" Line #"+c:""))};a.warning=function(b){this.warnings++;var c="";try{throw new Error("stack");}catch(d){c=(/\.html:(\d+)/.exec(d.stack||"")||["",""])[1]}this.messages.push("Warning: "+b+(c?" Line #"+c:""))};a.warn=JsUnitTest.Unit.Testcase.prototype.warning;a.info=function(b){this.messages.push("Info: "+b)};
a.error=function(b,c){this.errors++;this.actions["retry with throw"]=function(){c.run(true)};this.messages.push(b.name+": "+b.message+"("+JsUnitTest.inspect(b)+")")};a.status=function(){if(this.failures>0)return"failed";if(this.errors>0)return"error";if(this.warnings>0)return"warning";return"passed"};a.benchmark=function(b,c,d){var e=new Date;(c||1).times(b);b=new Date-e;this.info((d||"Operation")+" finished "+c+" iterations in "+b/1E3+"s");return b};Test=JsUnitTest;

