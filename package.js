Package.describe({
  name: 'fongandrew:instance-vars',
  summary: 'Helpers for reactive variables assigned to a Blaze ' + 
           'Template instance',
  version: '0.2.0',
  git: 'https://github.com/fongandrew/meteor-instance-vars.git'
});

Package.onUse(function(api) {
  'use strict';

  api.versionsFrom('METEOR@1.1.0.2');
  api.use('reactive-var', 'client');
  api.use('blaze', 'client');
  api.use('templating', 'client');
  api.addFiles(['instance_vars.js'], ['client']);
});

Package.onTest(function(api) {
  'use strict';
  
  api.use('tinytest');
  api.use('blaze', ['client']);
  api.use('fongandrew:instance-vars', ['client']);
  api.addFiles('instance_vars_tests.js', ['client']);
});
