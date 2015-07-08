# meteor-instance-vars
This package provides helpers for reactive vars attached to a Blaze template 
instance. It's useful for patterns where you need to attach a large number of
reactivar variables to a template instance and want to make those variables
available in the template's data context.

Installation
------------
`meteor add fongandrew:instance-vars`

Usage
-----
This package adds several helper functions to a Blaze template instance. Use
as in the example below.

```javascript
Template.myTemplate.onCreated(function() {
  // This will initialize reactive vars attached to the template with 
  // corresponding default values. You can call `createVars` multiple times 
  // without overriding any of the defaults.
  this.createVars({
    keyA: 'value A',
    keyB: 'value B'
  });

});

Template.myTemplate.helpers({
  // instance.getVars returns a dict with all of the variables set with
  // instnace.createVars. The helper below would presumably be used as a 
  // {{#with data}} block. 
  data: function() {
    return Template.instance().getVars();
  }
});

Template.myTemplate.events({
  'click #change-var': function(e, template) {
    template.setVar('keyA', 'new-value');

    // You can also get the raw reactive var and change it manually.
    template.getRawVar('keyB').set('new-value');
  },

  'click #reset-button': function(e, instance) {
    // Resets a single var to its default
    template.resetVars('keyB');

    // Resets all vars to defaults
    template.resetVars();
  }
});
```
