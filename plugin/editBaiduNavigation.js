//{{{
  // cURL
  // curl 'https://www.baidu.com/home/subscribe/submit/manoperation' -H 'Accept: text/plain, |)}>#*; q=0.01' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.5' -H 'Cache-Control: no-cache' -H 'Connection: keep-alive' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Cookie: BAIDUID=7798B98003826E54C8F256D08E8A8A4E:FG=1; BIDUPSID=7924C8D361168F8D0C31E082AFF13046; PSTM=1442406428; BD_UPN=133252; BDUSS=UU4MXctcXVta280OEVURG1hWWozRXpJLWs2ajRxRFRHbndhRU5CclBaak9ja3hXQVFBQUFBJCQAAAAAAAAAAAEAAAA8BPoocWlueGlqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM7lJFbO5SRWe; BD_CK_SAM=1; BD_HOME=1; H_PS_PSSID=17386_1429_17637_17620_17641_17290_17782_14429_17000_17072_15026_12336_16094_17159_17050' -H 'Host: www.baidu.com' -H 'Pragma: no-cache' -H 'Referer: https://www.baidu.com/' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:41.0) Gecko/20100101 Firefox/41.0' -H 'X-Requested-With: XMLHttpRequest' --data 'cmd=modify&dirId=&id=3923938&tabid=1&name=HHAA%20Apple&url=&indextype=manht&bsToken=5a310e73754f79960ed420621d9f210d&_req_seqid=0xf81b83ea0000389e&sid=17386_1429_17637_17620_17641_17290_17782_14429_17000_17072_15026_12336_16094_17159_17050'

  // Location with Parameters
  // https://www.baidu.com/home/subscribe/submit/manoperation?_req_seqid=0xf81b83ea0000389e&bsToken=5a310e73754f79960ed420621d9f210d&cmd=modify&dirId=&id=3923938&indextype=manht&name=HHAA%20Apple&sid=17386_1429_17637_17620_17641_17290_17782_14429_17000_17072_15026_12336_16094_17159_17050&tabid=1&url=

// POST Parameters
// _req_seqid=0xf81b83ea0000389e
// bsToken=5a310e73754f79960ed420621d9f210d
// cmd=modify
// dirId=
// id=3923938
// indextype=manht
// name=HHAA Apple
// sid=17386_1429_17637_17620_17641_17290_17782_14429_17000_17072_15026_12336_16094_17159_17050
// tabid=1
// url=


// Requst Headers
// POST /home/subscribe/submit/manoperation HTTP/1.1
// Host: www.baidu.com
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:41.0) Gecko/20100101 Firefox/41.0
// Accept: text/plain, |)}>#*; q=0.01
// Accept-Language: en-US,en;q=0.5
// Accept-Encoding: gzip, deflate
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// X-Requested-With: XMLHttpRequest
// Referer: https://www.baidu.com/
// Content-Length: 239
// Cookie: BAIDUID=7798B98003826E54C8F256D08E8A8A4E:FG=1; BIDUPSID=7924C8D361168F8D0C31E082AFF13046; PSTM=1442406428; BD_UPN=133252; BDUSS=UU4MXctcXVta280OEVURG1hWWozRXpJLWs2ajRxRFRHbndhRU5CclBaak9ja3hXQVFBQUFBJCQAAAAAAAAAAAEAAAA8BPoocWlueGlqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM7lJFbO5SRWe; BD_CK_SAM=1; BD_HOME=1; H_PS_PSSID=17386_1429_17637_17620_17641_17290_17782_14429_17000_17072_15026_12336_16094_17159_17050
// Connection: keep-alive
// Pragma: no-cache
// Cache-Control: no-cache
// }}}



function editBaiduNavigation () {
  var d = config.browser.contentWindow.document;
  var navItems = d.getElementsByClassName('d-nav-item s-opacity-blank3');
  var items = [];


  for (let item of navItems) {
    items.push({
        item : item,
        url : item.getAttribute('data-url'),
        navID : item.getAttribute('data-nav'),
        title : item.firstChild.getAttribute('title'),
        navTextElement : item.lastChild.lastChild.lastChild
      });
  }


  function updateTitle(item) {
    var post = {
      "_req_seqid" : "0x8ce3afba00008c95",
      "bsToken": "5a310e73754f79960ed420621d9f210d",
      "cmd": "modify",
      "dirId": "",
      "id": item["navID"],
      "indextype": "manht",
      "name": item.navTextElement.innerHTML,
      "sid": "17386_1429_17637_17620_17641_17290_17782_14429_17000_17072_15026_12336_16094_17159_17050",
      "tabid": "1",
      "url": ""
    };
    $.post('https://www.baidu.com/home/subscribe/submit/manoperation',
          post,
          function (data) {
            // p(data);
            p('Name changed successfuly!');
          });
  }

  function matchedItems(str) {
    var matched = [];
    for (item of items) {
      if (item.title.toLocaleLowerCase().startsWith(str.toLocaleLowerCase())) {
        matched.push(item);
      }
    }
    return matched;
  }


  // 1. expand the navigations pannel
  $_(".s-more-bar.s-more-up").click();

  // 2. start input...
  var input_string = '';
  var lastMatched = [];
  commandline.input('Navigation title to edit',
                    // done callback
                    function () {
                      var selectedItem = lastMatched[0];
                      selectedItem.navTextElement.style.backgroundColor = 'yellow';

                      commandline.input('Rename To',
                                       function () {
                                         updateTitle(selectedItem);
                                         // selectedItem.navTextElement.parent.parent.parent.setAttribute('title', input_string);
                                         selectedItem.item.setAttribute('title', input_string);
                                         // selectedItem.item.getElementsByClassName('border-for-item').setAttribute('title', input_string);
                                         // selectedItem.item.getElementsByTagName('img').setAttribute('alt', input_string);
                                         selectedItem.item.firstChild.setAttribute('title', input_string);
                                         // selectedItem.item.firstChild.lastChild.setAttribute('alt', input_string);
                                         selectedItem.navTextElement.style.backgroundColor = 'white';
                                       },
                                       {
                                         onChange: function () {
                                           input_string = commandline.command;
                                           selectedItem.navTextElement.innerHTML = commandline.command;
                                         }
                                       });
                    },

                    {
                      // onChange callback
                    onChange: function () {
                        input_string = commandline.command;
                        var matched = input_string == '' ? [] : matchedItems(input_string);
                        if (lastMatched.length) {
                          for (item of lastMatched) {
                            item.navTextElement.style.backgroundColor = 'white';
                          }
                        }
                        for (item of matched) {
                          item.navTextElement.style.backgroundColor = 'red';
                        }
                        lastMatched = matched;
                    }
                  });
}

commands.addUserCommand(
  ['EditBaiduNavigation'],
  'Edit baidu navigation',
  editBaiduNavigation,
  {},
  true
);
