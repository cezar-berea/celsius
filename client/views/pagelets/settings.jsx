/** @jsx React.DOM */

var
    React = require("react");

module.exports = React.createClass({
  displayName: "zone/Settings",

  render: function() {
    var zone = this.props.zone;
    if (!zone) {
      return null;
    }

    return (
      <form className="zone-settings">
        <div className="row">
          <div className="medium-4 columns">
            <label>
              Zone name
              <input type="text" defaultValue={zone.name} ref="name" />
            </label>
          </div>

          <div className="medium-4 columns">
            <label>
              Sensor <code>Key</code>
              <input type="text" defaultValue={zone.sensorKey} ref="sensor" />
            </label>

            <label>
              Heater <code>Key</code>
              <input type="text" defaultValue={zone.heaterKey} ref="heater" />
            </label>
          </div>

          <div className="medium-4 columns">
            <p>
              <button onClick={this.save} className="small expand radius">Save</button>
            </p>
            <p>
              <button onClick={this.cancel} className="small expand radius">Cancel</button>
            </p>
          </div>
        </div>
        <div className="row">
          <ul>
            {this.props.units.map(this.renderUnit)}
          </ul>
        </div>
      </form>
    );
  },

  renderUnit: function(unit) {
    return (
      <li>{unit.info.key} -- {unit.status.value}</li>
    );
  },

  save: function(ev) {
    if (this.props.onSave) {
      var data = this.getZoneData();
      this.props.onSave(data);
    }
    ev.preventDefault();
  },

  cancel:function(ev) {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    ev.preventDefault();
  },

  getZoneData: function() {
    return {
      name: this.refs.name.getDOMNode().value,
      sensorKey: this.refs.sensor.getDOMNode().value,
      heaterKey: this.refs.heater.getDOMNode().value
    };
  }
});
