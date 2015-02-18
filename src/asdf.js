var FBDispatcher = require('flux').Dispatcher;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var asdf = {
    store: function(defaults, callback){
                return assign({ self: this }, defaults, EventEmitter.prototype,{
                    changed: function() { this.emit('change'); },
                    addChangeListener: function(callback) { this.on('change', callback); },
                    removeChangeListener: function(callback) { this.removeListener('change', callback); },
                    dispatchToken: asdf.dispatcher.register(callback)
                });
           },
    action: function(action, payload) {
        this.dispatcher.dispatch({action: action, payload: payload});
    },
    dispatcher: new FBDispatcher()
}

module.exports = asdf
