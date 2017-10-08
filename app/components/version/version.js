'use strict';

angular.module('schoolCalendarApp.version', [
  'schoolCalendarApp.version.interpolate-filter',
  'schoolCalendarApp.version.version-directive'
])

.value('version', '0.1');
