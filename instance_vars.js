(function() {
  'use strict';

  // Call in template onCreated hook to set up reactive vars with an object
  // mapping keys to default values
  Blaze.TemplateInstance.prototype.createVars = function(vars) {
    this._instanceVars = this._instanceVars || {};
    this._origValues = this._origValues || {};
    for (var name in vars) {
      if (vars.hasOwnProperty(name)) {
        var defaultValue = vars[name];
        this._instanceVars[name] = new ReactiveVar(defaultValue);
        this._origValues[name] = defaultValue;
      }
    }
    return this._instanceVars;
  };

  // Reset just one var to default
  Blaze.TemplateInstance.prototype.resetVar = function(name) {
    if (this._origValues.hasOwnProperty(name)) {
      var origValue = this._origValues[name];
      this.setVar(name, origValue);
      return origValue;
    } 

    else {
      throw new Meteor.Error('invalid-name');
    }
  };

  // Reset all vars to ddefault
  Blaze.TemplateInstance.prototype.resetVars = function() {
    for (var name in this._origValues || {}) {
      if (this._origValues.hasOwnProperty(name)) {
        this.resetVar(name);
      }
    }
  };

  // Call to set a single reactive var -- Should be preset in createVars
  Blaze.TemplateInstance.prototype.setVar = function(name, value) {
    if (this._instanceVars) {
      var rv = this._instanceVars[name];
      if (rv instanceof ReactiveVar) {
        return rv.set(value);
      }
      throw new Meteor.Error('invalid-name');
    }
    throw new Meteor.Error('var-does-not-exist');
  };

  // Call to get a single reactive var by name
  Blaze.TemplateInstance.prototype.getVar = function(name) {
    return this.getRawVar(name).get();
  };

  // Call to get a single reactive var by name
  Blaze.TemplateInstance.prototype.getRawVar = function(name) {
    if (this._instanceVars) {
      var rv = this._instanceVars[name];
      if (rv instanceof ReactiveVar) {
        return rv;
      }
      throw new Meteor.Error('invalid-name');
    }
    throw new Meteor.Error('var-does-not-exist');
  };

  // Returns an object full of all reactive var data based on assigned keys
  Blaze.TemplateInstance.prototype.getVars = function() {
    var data = {};
    if (this._instanceVars) {
      for (var name in this._instanceVars) {
        if (this._instanceVars.hasOwnProperty(name)) {
          data[name] = this._instanceVars[name].get();
        }
      }
    }
    return data;
  };

})();