commands.addUserCommand(
  ['RemoveCurrentTabGroup'],
  'Remove currnet Tab group.',
  function removeCurrentTabGroup() {
    let name = tabGroup.tabView.GroupItems.getActiveGroupItem().getTitle();
    liberator.execute('tabrewind');
    liberator.execute('100bd');
    liberator.execute('emenu File.Close Tab');
    tabGroup.remove(name);
  },
  {},
  true
);

commands.addUserCommand(
  ['TabGroupRename', 'tgr'],
  'Rename current tab group',
  function (name) {
    if (tabGroup.getGroup('' + name)) {
      liberator.echo('TabGroup named `' + name + '` exists. Renaming failure!');
      return;
    }
    tabGroup.tabView.GroupItems._activeGroupItem.setTitle(name);
    updateTabGroupNameLabel();
    /* liberator.echo('Current tab group renamed to ' + '`' + name + '`.'); */
  },
  {},
  true
);

commands.addUserCommand(
  ['GoBackLastTabGroup'], 
  'Go bakc to last active tagGroup',
  function () {
    var group = tabGroup.tabView.GroupItems._lastActiveList._list[1];
    if (group) {
      var target = group.getActiveTab();
      gBrowser.mTabContainer.selectedItem = target.tab;
    } else {
      l("No last active tabgroup!!", 2000);
    }
  },
  {}, 
  true
);


// map "<C-S-N>" implement following command.
// commands.addUserCommand(
//   ['GoToNextTabGroup'],
//   'Go to next tabgroup',
//   function () {
//     var list = tabGroup.tabView.GroupItems.groupItems;
//     var activeGroup = tabGroup.tabView.GroupItems.getActiveGroupItem();
//     var index = list.indexOf(activeGroup);
//     var nextGroup = list[(index + 1) % list.length];
//     gBrowser.mTabContainer.selectedItem = nextGroup.getActiveTab().tab;
//   },
//   {},
//   true
// );

let updateTabGroupNameLabel = function () {
  var tabGroupNameLabel = document.createElement('label');
  tabGroupNameLabel.id = 'liberator-status-tabgroupname'
  document.getElementById("liberator-status").appendChild(tabGroupNameLabel);

  return function (node, delayed) {
      if (liberator.has("tabs")) {
          if (delayed) {
              window.setTimeout(function() updateTabGroupNameLabel(node, false), 0);
              return;
          }

        // var title = tabGroup.tabView.GroupItems._activeGroupItem.getTitle();
        var last0 = tabGroup.tabView.GroupItems._lastActiveList._list[0];
        var last1 = tabGroup.tabView.GroupItems._lastActiveList._list[1];
        var list = tabGroup.tabView.GroupItems.groupItems;
        var titles = list
          .map(function (i) {
            if (i == last0) {
              return i.getTitle() + "\""
            } else if (i == last1) {
              return i.getTitle() + "'"
            } else {
              return i.getTitle() + " "
            }
          })
          .reduce(function (p, c) { return p +"|"+ c});

        tabGroupNameLabel.setAttribute("value", " TG:|" + titles +"|");
        tabGroupNameLabel.setAttribute("hidden", false);
      }
  }
}();


function updateTabGroupNameLabelDelayed(node) {
  updateTabGroupNameLabel(node, true);
}

statusline.addField("tabGroup", "Tab Group Name", 'liberator-status-tabgroupname', updateTabGroupNameLabel, {});
let tabContainer = config.tabbrowser.mTabContainer;
events.addSessionListener(tabContainer, "TabSelect", updateTabGroupNameLabelDelayed, false);
events.addSessionListener(tabContainer, "TabMove", updateTabGroupNameLabelDelayed, false);
events.addSessionListener(tabContainer, "TabOpen", updateTabGroupNameLabelDelayed, false);
events.addSessionListener(tabContainer, "TabClose", updateTabGroupNameLabelDelayed, false);
