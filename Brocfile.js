/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon();

function treeGenerator (dir) {
  return {
    read: function () { return dir; },
    cleanup: function () { }
  }
};

var polyfillTree = new Funnel(treeGenerator('node_modules/intl/dist'), {
  files:   ['Intl.complete.js'],
  srcDir:  '/',
  destDir: '/assets/polyfill/'
});

module.exports = mergeTrees([polyfillTree, app.toTree()]);
