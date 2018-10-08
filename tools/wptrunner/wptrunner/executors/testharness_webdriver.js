var callback = arguments[arguments.length - 1];
var loaded = false;

window.timeout_multiplier = %(timeout_multiplier)d;
window.url = "%(url)s";
window.win = window.open("%(abs_url)s", "%(window_id)s");
window.win.addEventListener('pageshow', (e) => {
  if (loaded || e.target.location.href == "about:blank") {
    return;
  }
  complete = true;
  callback();
});


window.message_queue = [];
window.testdriver_callback = null;

if (%(timeout)s != null) {
  window.timer = setTimeout(function() {
    window.win.timeout();
    window.win.close();
  }, %(timeout)s);
}

if (window.win.location.href != 'about:blank') {
  loaded = true;
  callback();
}