import Eventhub from './index';

test('Single event without arguments', () => {
    const eventhub = new Eventhub();
	let hasFired = false;

    eventhub.on('eventname', () => {
        hasFired = true;
    });

    eventhub.emit('eventname');

	expect(hasFired).toBeTruthy();
});

test('Single event with arguments', () => {
    const eventhub = new Eventhub();
    const args = [1, 2, 3, 'hello'];

    eventhub.on('singleW', (a, b, c, d) => {
        expect(a, b, c, d).toEqual(...args);
    });

    eventhub.emit('singleW', ...args);
});

test('Multiple events without arguments', () => {
    const eventhub = new Eventhub();
    let timesCalled = 0;

    eventhub.on('eventname', () => {
        timesCalled++;
    });

    eventhub
		.emit('eventname')
		.emit('eventname')
		.emit('eventname')
		.emit('eventname');

    expect(timesCalled).toEqual(4);
});

test('Multiple events with arguments', () => {
    const eventhub = new Eventhub();
    const arg1 = 0;
    const arg2 = 'hey';
    let timesCalled = 0;

    eventhub.on('eventname', (a1, a2) => {
        if (arg1 === a1 && arg2 === a2) {
            timesCalled++;
        }
    });

    eventhub
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2);

    expect(timesCalled).toEqual(4);
});

test('Fire event once without arguments', () => {
    const eventhub = new Eventhub();
    let timesCalled = 0;

    eventhub.once('eventname', () => {
        timesCalled++;
    });

    eventhub
		.emit('eventname')
		.emit('eventname')
		.emit('eventname')
		.emit('eventname');
    

    expect(timesCalled).toEqual(1);
});

test('Fire event once with arguments', () => {
    const eventhub = new Eventhub();
    const arg1 = 0;
    const arg2 = 'hey';
    let timesCalled = 0;

    eventhub.once('eventname', () => {
        timesCalled++;
    });

    eventhub
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2);

    expect(timesCalled).toEqual(1);
});

test('Event on any', () => {
    const eventhub = new Eventhub();
    let timesCalled = 0;

    eventhub.onAll(() => {
        timesCalled++;
    });

    eventhub
		.emit('eventname')
		.emit('')
		.emit(123)
		.emit('fire');
    

    expect(timesCalled).toEqual(4);
});

test('Remove listener without arguments', () => {
    const eventhub = new Eventhub();
    const arg1 = 0;
    const arg2 = 'hey';
    let timesCalled = 0;

    eventhub.on('eventname', () => {
        timesCalled++;
    });

    eventhub
		.emit('eventname')
		.emit('eventname');

    eventhub.remove('eventname');

    eventhub
		.emit('eventname')
    	.emit('eventname');

    expect(timesCalled).toEqual(2);
});

test('Remove listener with arguments', () => {
    const eventhub = new Eventhub();
    const arg1 = 0;
    const arg2 = 'hey';
    let timesCalled = 0;

    eventhub.on('eventname', (a1, a2) => {
        if (a1 === arg1 && a2 === arg2) {
            timesCalled++;
        }
    });

    eventhub
		.emit('eventname', arg1, arg2)
    	.emit('eventname', arg1, arg2);

    eventhub.remove('eventname');

    eventhub
		.emit('eventname', arg1, arg2)
   		.emit('eventname', arg1, arg2);

    expect(timesCalled).toEqual(2);
});

test('Remove listener with handler', () => {
    const eventhub = new Eventhub();
    const arg1 = 0;
    const arg2 = 'hey';
    let timesCalled = 0;

	function handler(a1, a2) {
        if (a1 === arg1 && a2 === arg2) {
            timesCalled++;
        }
    }

    eventhub.on('eventname', handler);

    eventhub
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2);

    eventhub.remove('eventname', handler);

    eventhub
		.emit('eventname', arg1, arg2)
    	.emit('eventname', arg1, arg2);

    expect(timesCalled).toEqual(2);
});

test('Remove listener with wrong handler', () => {
    const eventhub = new Eventhub();
    const arg1 = 0;
    const arg2 = 'hey';
    let timesCalled = 0;

	function handler(a1, a2) {
        if (a1 === arg1 && a2 === arg2) {
            timesCalled++;
        }
    }

    eventhub.on('eventname', handler);

    eventhub
		.emit('eventname', arg1, arg2)
		.emit('eventname', arg1, arg2);

    eventhub.remove('eventname', () => {
		alert('test');
	});

    eventhub
		.emit('eventname', arg1, arg2)
    	.emit('eventname', arg1, arg2);

    expect(timesCalled).toEqual(4);
});

test('Event listener outside context', () => {
    const eventhub = new Eventhub();
	let hasFired = false;

    (function() {
		const data = 123;
        eventhub.on('eventname', (argument) => {
            if (argument === data) {
				hasFired = true;
			}
        });
    })();

    (function() {
		const data = 123;
		eventhub.emit('eventname', 123);
	})();

	expect(hasFired).toBeTruthy();
});

test('Multiple event listeners', () => {
    const eventhub = new Eventhub();
	let timesCalled = 0;

	eventhub
		.on('eventname', () => {
			timesCalled++;
		})
		.on('eventname', () => {
			timesCalled++;
		})
		.on('eventname', () => {
			timesCalled++;
		});

    eventhub.emit('eventname');

	expect(timesCalled).toEqual(3);
});

test('Remove multiple event listeners and add the listeners again', () => {
    const eventhub = new Eventhub();
	let timesCalled = 0;

	eventhub
		.on('eventname', () => {
			timesCalled++;
		})
		.on('eventname', () => {
			timesCalled++;
		})
		.on('eventname', () => {
			timesCalled++;
		});

	eventhub.remove('eventname');    

	eventhub
		.on('eventname', () => {
			timesCalled++;
		})
		.on('eventname', () => {
			timesCalled++;
		});

	eventhub.emit('eventname');	

	expect(timesCalled).toEqual(2);
});

test('Event listener on without handler', () => {
    const eventhub = new Eventhub();

    expect(() => {
        eventhub.once('eventname');
    }).toThrow();
});

test('Event listener once without handler', () => {
    const eventhub = new Eventhub();

    expect(() => {
        eventhub.once('eventname', 'string');
    }).toThrow();
});

test('Is eventhub listening', () => {
    const eventhub = new Eventhub();
    eventhub.on('eventname', () => {
        alert('event');
    });

    expect(eventhub.isListening).toEqual(true);
});

test('Is eventhub not listening', () => {
    const eventhub = new Eventhub();

    expect(eventhub.isListening).toEqual(false);
});

test('Is eventhub not listening with remove', () => {
    const eventhub = new Eventhub();

    eventhub.on('eventname', () => {
        alert('test');
    });

    eventhub.remove('eventname');

    expect(eventhub.isListening).toEqual(false);
});