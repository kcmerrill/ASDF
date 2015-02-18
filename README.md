#ASDF

Stands for: A(ction)S(tore)D(ispatch)F(by Facebook!)

If you're curious about flux, I'd encourage you to read up on it here: https://facebook.github.io/flux/

It's basically a way of updating your reactjs application with data stores. A pretty neat concept that integrates with ReactJS pretty effortlessly. While the flux website has some great examples on how to get it working, it's more of this is how we'd do it, instead of a library you can just download and start using. 

ASDF is my interpretation on Flux that I'll be using in my webapps(So, your mileage may vary). I'm not 100% if this follows the flux thinking, but I do find it works really well. I have omitted the Actions portion. I never could figure out why one needed a specific place to store dispatches(if you know the answer to this, please share!). 

###Usage
See example.html within the root level of ASDF, however, it's pretty simple. We'll walk through some of them now. 

#####asdf.action(type, payload)
```
asdf.action('add_new_user', {user: 'kcmerrill', email: 'kcmerrill@gmail.com' });

Shorthand for this:
asdf.dispatcher.dispatch({action: 'add_new_user', payload: {user: 'kcmerrill', email: 'kcmerrill@gmail.com' } });

```
The first method, asdf.action(type,payload) is simply shorthand for calling the dispatch functionality. I didn't quite understand why you'd need a whole action class(besides maybe being very explicit about what actions are available?). Regardless, if you'd like to add an Actions class as recommended by facebook, feel free and just wrap the dispatcher to suite your needs. Again, if you know the answer to this, or at least the reasoning behind it, I'd really be interested in knowing!

#####asdf.store(defaults, callback)
```
var UserStore = asdf.store({
                _users: [],
                getUsers: function(){
                    return this._users;
                }
            }, function(request){
                if(request.action == 'add_user'){
                    UserStore._users.push(request.payload);
                    UserStore.changed();
                }
            });
```

Here, in the defaults is where you would set all of your getters. You'd also setup your placeholder for information. In this case, _users:[] will contain all of the user information required. Of course, getUsers() would simply return all the users. By default, the action is under request.action and the payload is under request.payload respectively. 

The stores have a few properties on them, and they are as follows:

```
changed()
```

Anytime you update your store, simply call .changed() to emit the 'change' event

```
addChangeListener(callback)
```

Anytime a change is made to the store, this callback will be run

```
removeChangeListener(callback)
```

Remove the specified callback from the change listener

```
dispatchToken
```

A simple id that is primarily used in the waitFor() functionality. Again, see the flux documentation for more information regarding waitFor()


###Site note
This project can be run via browserify, or if you're interested in just using it right out of the box, simply take the src/asdf-standalone.js file and use it by itself(see example.html). If you feel comfortable going the browserify rotue, simply require it via the src directory. 

```browserify src/asdf.js --standalone asdf > dist/asdf-standalone.js```

###A few problems
The objects in the stores are not immutable. Which I think defeats the purpose of flux(if you can change the store externally). If you have ideas on how to fix this, I'd love feedback. Or at least a quick explination of how it should be working. For now though, given this is just for side projects, I'll just slap my wrist if I touch the data stores directly without going through the callback.(read: I won't be touching the stores manually for _any_ reason. )
