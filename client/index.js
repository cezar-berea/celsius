var event = require("events"),
    _ = require("lodash"),
    util = require("util"),
    fluxxor = require("fluxxor"),
    React = require("react"),
    Application = require("./components/application"),
    stores = require("./stores"),
    actions = require("./actions");

var el = document.getElementById("client");
if (el) {
  init(el);
}

function init(element) {
  var app, appStores, flux;

  appStores = {
    "session": new stores.Session(),
    "currentZone": new stores.Zone(),
    "zones": new stores.Zones()
  };

  flux = new fluxxor.Flux(appStores, actions);
  app = Application({ flux: flux });

  React.renderComponent(app, element);
};
