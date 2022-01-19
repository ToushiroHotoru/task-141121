const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainWatcher = new Schema({
  watchers: [{ name: String }],
});

const watcher = mongoose.model("watcher", mainWatcher);
module.exports = watcher;
