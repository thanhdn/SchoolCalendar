'use strict';

describe('schoolCalendarApp.version module', function() {
  beforeEach(module('schoolCalendarApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
