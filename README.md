# ES6 Events
A simple event emitter and listener built in ES6.

## Methods
### `eventhub.on`
#### Init listener on string.
``` js
eventhub.on('string', handler);
```

### `eventhub.onAll`
#### Init listener on all strings.
``` js
eventhub.on('string', handler);
```

### `eventhub.once`
#### Fire event only once, then remove the event.
``` js
eventhub.once('string', handler);
```

### `eventhub.emit`
#### Fire event on string with arguments.
``` js
eventhub.emit('string', ...args);
```
#### Fire event on string without arguments.
``` js
eventhub.emit('string');
```
### `eventhub.remove`
#### Remove event from the eventhub list with the same string and handler.
``` js
eventhub.remove('event', handler);
```
#### Remove event from the eventhub list with the same string.
``` js
eventhub.remove('string');
```
	

## Usage
``` js
import Eventhub from 'eventhub';
const eventhub = new Eventhub();

eventhub.on('text-change', (text) => {
	console.log('Text changed to', text);
});

eventhub.emit('text-change', 'New Text');
```

or

``` js
import Eventhub from 'eventhub';
const eventhub = new Eventhub()
	.on('text-change', (text) => {
		console.log('Text changed to', text);
	})
	.emit('text-change', 'New Text');
```

## License
MIT