/**
 * Created by alykoshin on 10.12.15.
 */

'use strict';

var Const = function(obj) {
  if (Object.freeze) {
    Object.freeze(obj);
  }
  return obj;
};

var Enum = function( obj ) {

  obj.getByValue = function(value) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && obj[prop] === value) {
        return prop;
      }
    }
    return null;
  };

  obj._propExists = function(propName) {
    return !! obj[propName];
  };

  obj.valueExists = function(valueName) {
    return !! obj.getByValue(valueName);
  };

  obj.exist = function(valueName) {
    debug.warn('Enum.exist() - deprecated.');

    return obj.valueExists(valueName);
  };

  obj.check = function(valueName) {
    assert(obj.valueExists(valueName), 'ERROR: Enum '+JSON.stringify(obj)+' does not have property value \''+valueName+'\'');
  };

  obj = Const(obj);

  return obj;
};

////////////////////////////////////////////////////////////////////////////////

if (typeof module !== 'undefined') {
  var exports = Enum;
  exports.Enum = Enum;
  exports.Const = Const;

  module.exports = exports;
}

if (typeof window !== 'undefined') {
  window.Enum = Enum;
  window.Const  = Const;
}
