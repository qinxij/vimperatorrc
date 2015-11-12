window.p = liberator.echo;
window.$d = function () $(config.browser.contentWindow.document)
window.$_ = function (selector) {
  return $(selector, config.browser.contentWindow.document);
}

window.l = function (message, timeout, append) {

  if ($_("#___log___").length == 0) {
    let messageBoard = document.createElement("p");
    $_("body").append(messageBoard);
    messageBoard.setAttribute("id", "___log___");
    $mb = $_("#___log___");

    $mb.css({
        "background-color": "#CCCCCC"
      , "position": "fixed"
      , "left": "0"
      , "bottom": "20px"
      , "border-radius": "5px"
      , "padding": "0.4em 0.5em 0.2em 0.5em"
      , "font-family": "Arial,Helvetica,sans-serif"
      , "font-size": "14px"
      // , "overflow": "hidden"
      // , "max-height": "550px"
      , "z-index": 1000
    });
  }

  $mb = $_("#___log___");

  if (typeof message == "object") {
    message = JSON.stringify(message);
  }

  if (append && $mb.html()) {
    let messageOrigin = $mb.html();
    message = messageOrigin + "<br/>" + message;
  }

  $mb.html(message);

  if (message) {
    $mb.show();
  } else {
    $mb.hide();
  }

  if (timeout) {
    setTimeout(function() {
      $mb.html("");
    },
    timeout);
  }
};

window.la = function(message, timeout) { l(message, timeout, true); };

window.toggleMessageboard = function () {
  $_("#___log___").css("display") == "none" ? $_("#___log___").show() : $_("#___log___").hide();
};
