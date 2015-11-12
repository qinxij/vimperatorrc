openTabOnNextOrPrevious = function (url, next) {
  let activeGroup = tabGroup.tabView.GroupItems.getActiveGroupItem();
  /* var sortedGroup = activeGroup._children.sort(function (a, b) { */
  /*   return a.tab._tPos - b.tab._tPos; */
  /* }); */

  /* var indexOfCurrentTab = sortedGroup.indexOf(activeGroup._activeTab); */
  /* var indexOfCurrentTab = activeGroup._activeTab.tab.index(); */
  var indexOfCurrentTab = tabs.index();
  var lengthOfTabs = activeGroup._children.length;
  liberator.execute('tabopen ' + url);
  if ( indexOfCurrentTab + 1 != lengthOfTabs && next) {
    liberator.execute('tabmove ' + (indexOfCurrentTab - lengthOfTabs + 1));
  } else if (!next) {
    liberator.execute('tabmove ' + (indexOfCurrentTab - lengthOfTabs));
  }
}

// commands.addUserCommand(
//   ['openNext','opn'],
//   'Uniq tabs',
//   function (arg) {
//     openTabOnNextOrPrevious(arg[0], true);
//   },
//   {},
//   true
// );

commands.add(["openNext"],
  "Open one or more URLs in a new[next] tab",
  function (args) {
    let special = args.bang;
    args = args.string;

    if (options.get("activate").has("all", "tabopen"))
        special = !special;
    let where = special ? liberator.NEW_TAB : liberator.NEW_BACKGROUND_TAB;
    if (args)
        // liberator.open(args, { where: where });
        openTabOnNextOrPrevious(args, true);
    else
        liberator.open("", { where: where });
  },
  {
    bang: true,
    completer: function (context) completion.url(context),
    literal: 0,
    privateData: true
  }
);


commands.add(["openPrevious"],
  "Open one or more URLs in a new[previous] tab",
  function (args) {
    let special = args.bang;
    args = args.string;

    if (options.get("activate").has("all", "tabopen"))
        special = !special;
    let where = special ? liberator.NEW_TAB : liberator.NEW_BACKGROUND_TAB;
    if (args)
        // liberator.open(args, { where: where });
        openTabOnNextOrPrevious(args, false);
    else
        liberator.open("", { where: where });
  },
  {
    bang: true,
    completer: function (context) completion.url(context),
    literal: 0,
    privateData: true
  }
);

commands.addUserCommand(
  ['openSearch','ops'],
  'Uniq tabs',
  function (arg) {
    openTabOnNextOrPrevious(arg.join(' '), true);
  },
  {},
  true
);

var addQuickOpenTab = function (key, url) {
  liberator.execute('silent qmark ' + key + ' ' + url);
  liberator.execute('noremap gp' + key + ' :openPrevious ' + url + '<CR>');
  liberator.execute('noremap gn' + key + ' :openNext ' + url + '<CR>');
};

var quickOpenTabMap = {
  'a': 'about:addons',
  'b': 'http://www.baidu.com/',
  'c': 'http://www.cnblogs.com/',
  'd': 'chrome://browser/content/downloads/contentAreaDownloadsView.xul',
  'g': 'http://www.google.com.hk/',
  'G': 'https://github.com/',
  'i': 'http://www.iteye.com/',
  'p': 'http://bt8.nl/ebook.php',
  't': 'http://www.taobao.com/',
  'w': 'http://weibo.com/'
  , 'n': 'file:///G:/qinxij/ws/horsey/home.html'
  , 'l': 'http://172.16.0.45:81/'
  , 'f': 'https://172.16.0.10/theme1/index?login=1'
};	

for (key in quickOpenTabMap) {
  addQuickOpenTab(key, quickOpenTabMap[key]);
}

var quickSearchMap = {
'A': 'appleDev',
'a': 'addons',
'b': 'baidu',
'y': 'youdao',
'g': 'github',
'h': 'github',
'e': 'ebook'
};

for (key in quickSearchMap) {
liberator.execute('nnoremap gs' + key + ' :openSearch ' + quickSearchMap[key] + ' ');
}


mappings.addUserMap(
  [modes.NORMAL],
  ["P"],
  "Open (put) a URL based on the current clipboard contents in a new[next] buffer",
  function () {
    let url = util.readFromClipboard();
    liberator.assert(url);
    openTabOnNextOrPrevious(url, true);
  },
  {}
);
