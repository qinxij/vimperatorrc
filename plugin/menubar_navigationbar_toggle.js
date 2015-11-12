// Toggle menu bar & navigation

function toggleMenubarOrNavigationbar(menuOrNavigation) {
  var visable = false;
  return function () {
    visable = !visable;
    if (visable) {
      liberator.execute('set gui+=' + menuOrNavigation);
    } else {
      liberator.execute('set gui+=no' + menuOrNavigation);
    }
  }
}

mappings.addUserMap(
  [modes.NORMAL],
  [",m"],
  "Toggle menu bar",
  toggleMenubarOrNavigationbar("menu") ,
  {}
);

mappings.addUserMap(
  [modes.NORMAL],
  [",n"],
  "Toggle navigation bar",
  toggleMenubarOrNavigationbar("navigation"),
  {}
);

