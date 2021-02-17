import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

import "./task.html";

// Define helper to check ownership
Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  "click .toggle-checked"() {
    // Replace update and remove with methods
    // Set the checked property to the opposite of its current value
    Meteor.call("tasks.setChecked", this._id, !this.checked);
  },
  "click .delete"() {
    Meteor.call("tasks.remove", this._id);
  },
  // Add event handler to call the setPrivate method
  "click .toggle-private"() {
    Meteor.call("tasks.setPrivate", this._id, !this.private);
  },
});
