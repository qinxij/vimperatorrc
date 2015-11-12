// commands.addUserCommand(
//   ['CloseCurrentTabAndActiveLeftOne'],
//   'Close current tab and then active the left one',
//   function () {
//     let activeGroup = tabGroup.tabView.GroupItems.getActiveGroupItem();
//     let index = tabs.index();
//     let maxIndex = activeGroup._children.length - 1;
//     liberator.execute('tabclose');
//     if (index != maxIndex && index != 0) {
//       liberator.execute('tabprevious');
//     }
//   },
//   {},
//   true
// );


// Add current link to favorite
var addLinkToFavorite = function (key, tag, url) {
  //bookmarks.add(startOnly, title, url, keyword, tags, folder, force);
}



// var buffersL = function (name, filter, maxItems, tags, keyword, contextFilter) {
//     let context = CompletionContext(filter || "");
//     context.maxItems = maxItems;
//     if (contextFilter)
//         context.filters = [contextFilter];
//     context.fork.apply(context, ["list", 0, completion, name].concat(Array.slice(arguments, 3)));
//     context.wait();
//
//     for (let [key, context] in Iterator(context.contexts)) {
//         if (key.startsWith("/list")) {
//         //     let list = template.genericOutput("",
//         //         xml`<div highlight="Completions">
//         //             ${ template.completionRow(context.title, "CompTitle") }
//         //             ${ template.map2(xml, context.items, function (item) context.createRow(item), null, 100) }
//         //         </div>`);
//         //     commandline.echo(list, commandline.HL_NORMAL, commandline.FORCE_MULTILINE);
//
//           liberator.echo(context.items.length);
//           return context;
//         }
//     }
//
// };

let buffersXX = function () {
  return buffersL("buffer", null, null, completion.buffer[false ? "ALL" : "VISIBLE"]);
}


