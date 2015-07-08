(function() {
  'use strict';

  Tinytest.add('Instance Vars - getVars', function(test) {
    var instance = Blaze.TemplateInstance(new Blaze.View());
    instance.createVars({
      keyA: 'value A',
      keyB: 'value B'
    });

    var data = instance.getVars();
    test.equal(data, {
      keyA: 'value A',
      keyB: 'value B'
    });
  });

  Tinytest.add('Instance Vars - getVar - Gets value', function(test) {
    var instance = Blaze.TemplateInstance(new Blaze.View());
    instance.createVars({
      keyA: 'value A',
      keyB: 'value B'
    });
    test.equal(instance.getVar('keyB'), 'value B');
  });

  Tinytest.add('Instance Vars - getRawVar - Gets raw reactive variable', 
    function(test) {
      var instance = Blaze.TemplateInstance(new Blaze.View());
      instance.createVars({
        keyA: 'value A',
        keyB: 'value B'
      });
      
      // We don't really care if it's an actual ReactiveVar, just that it
      // behaves like one
      var testVar = instance.getRawVar('keyB');
      test.equal(testVar.get(), 'value B');
      testVar.set('value C');
      test.equal(testVar.get(), 'value C');
  });

  Tinytest.add('Instance Vars - getVar - Exception for invalid key',
    function(test) {
      var instance = Blaze.TemplateInstance(new Blaze.View());
      instance.createVars({
        keyA: 'value A',
        keyB: 'value B'
      });

      var thrownErr;
      try {
        instance.getVar('keyC');
      } catch(err) {
        thrownErr = err;
      }
      test.equal(thrownErr.error, "invalid-name");
  });

  Tinytest.add('Instance Vars - getVar - Exception if not initialized',
    function(test) {
      var instance = Blaze.TemplateInstance(new Blaze.View());
      var thrownErr;
      try {
        instance.getVar('keyA');
      } catch(err) {
        thrownErr = err;
      }
      test.equal(thrownErr.error, "var-does-not-exist");
  });


  Tinytest.add('Instance Vars - setVar - Sets value', function(test) {
    var instance = Blaze.TemplateInstance(new Blaze.View());
    instance.createVars({
      keyA: 'value A',
      keyB: 'value B'
    });
    instance.setVar('keyA', 'value C');

    var data = instance.getVars();
    test.equal(data, {
      keyA: 'value C',
      keyB: 'value B'
    });
  });

  Tinytest.add('Instance Vars - setVar - Exception for invalid key',
    function(test) {
      var instance = Blaze.TemplateInstance(new Blaze.View());
      instance.createVars({
        keyA: 'value A',
        keyB: 'value B'
      });

      var thrownErr;
      try {
        instance.setVar('keyC', 'value C');
      } catch(err) {
        thrownErr = err;
      }
      test.equal(thrownErr.error, "invalid-name")
  });

  Tinytest.add('Instance Vars - setVar - Exception if not initialized',
    function(test) {
      var instance = Blaze.TemplateInstance(new Blaze.View());
      var thrownErr;
      try {
        instance.setVar('keyA', 'Value A');
      } catch(err) {
        thrownErr = err;
      }
      test.equal(thrownErr.error, "var-does-not-exist");
  });

  Tinytest.add('Instance Vars - resetVar', function(test) {
    var instance = Blaze.TemplateInstance(new Blaze.View());
    instance.createVars({
      keyA: 'value A',
      keyB: 'value B'
    });
    instance.setVar('keyA', 'value C');
    instance.setVar('keyB', 'value D');

    // Reset one var to default
    instance.resetVar('keyA');

    var data = instance.getVars();
    test.equal(data, {
      keyA: 'value A',
      keyB: 'value D'
    });
  });

  Tinytest.add('Instance Vars - resetVars', function(test) {
    var instance = Blaze.TemplateInstance(new Blaze.View());
    instance.createVars({
      keyA: 'value A',
      keyB: 'value B'
    });
    instance.setVar('keyA', 'value C');
    instance.setVar('keyB', 'value D');

    // Reset all vars to default
    instance.resetVars();

    var data = instance.getVars();
    test.equal(data, {
      keyA: 'value A',
      keyB: 'value B'
    });
  });


})();