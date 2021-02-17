import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
// Load tasks from Tasks collection
import { Tasks } from "../api/tasks.js";
// Import Task component from the body
import "./task.js";
import "./body.html";

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  // Subscribe to tasks
  Meteor.subscribe("tasks");
});

Template.body.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get("hideCompleted")) {
      // if hide completed is checked, filter tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    // otherwise return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  // Add incompleteCount helper to body
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  "submit .new-task"(event) {
    event.preventDefault();

    // Get value from element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    // Replace insert with tasks.insert method

    Meteor.call("tasks.insert", text);

    // Clear form
    target.text.value = "";
  },
  // Add event handler for checkbox (update ReactiveDict variable)
  "change .hide-completed input"(event, instance) {
    instance.state.set("hideCompleted", event.target.checked);
  },
});
