/**
 * Event emitter
 */
export default class Eventhub {
  /**
   * Create a new instance of an Eventhub
   */
  constructor() {
    this.listeners = [];
  }

  /**
   * Add listener to string for method
   * @param {string} string - String to listen on
   * @param {function} handler - Method to execute when event is emitted
   * @returns {Eventhub} - This Eventhub instance
   */
  on(string, handler) {
    this.testHandler(handler);

    this.listeners = this.listeners.concat({
      string,
      handler
    });

    return this;
  }

  /**
   * Add listener to any emit
   * @param {function} handler - Method to execute when event is emitted
   * @returns {Eventhub} - This eventhub instance
   */
  onAll(handler) {
    this.testHandler(handler);

    this.listeners = this.listeners.concat({
      string: -1,
      handler
    });

    return this;
  }

  /**
   * Add listener to string for method that only executes once
   * @param {string} string - String to listen on
   * @param {function} handler - Method to execute when event is emitted
   * @returns {Eventhub} - This eventhub instance
   */
  once(string, handler) {
    this.testHandler(handler);

    this.on(string, () => {
      this.exec(handler);
      this.remove(string);
    });

    return this;
  }

  /**
   * Remove a listener
   * @param {string} string - String to remove from listeners
   * @param {function} [handler] - Specific method to remove when string matches
   * @returns {Eventhub} - This eventhub instance
   */
  remove(string, handler) {
    const noHandler = handler === undefined;

    this.listeners = this.listeners.filter(listener => {
      const sameString = listener.string === string || listener.string === -1;
      const sameHandler = handler === listener.handler;
      return !((sameString && noHandler) || sameHandler);
    });

    return this;
  }

  /**
   * Emit an event
   * @param {string} string - String to emit on
   * @param {any[]} [args] - Arguments to pass to the listener method
   * @returns {Eventhub} - This eventhub instance
   */
  emit(string, ...args) {
    this.listeners
      .filter(listener => listener.string === string || listener.string === -1)
      .forEach(listener => this.exec(listener.handler, args));

    return this;
  }

  /**
   * Execute a method with arguments
   * @param {function} handler - Method to execute
   * @param {any} [args] - Arguments to pass to the method
   * @returns {Eventhub} - This eventhub instance
   */
  exec(handler, args) {
    handler.apply(null, args);

    return this;
  }

  /**
   * Test if handler is a valid method
   * @param {function} handler - Function to test
   * @throws Invalid type error
   * @returns {Eventhub} - This eventhub instance
   */
  testHandler(handler) {
    if (typeof handler !== 'function') {
      throw new Error(`Event handler can't be of type '${typeof handler}'`);
    }

    return this;
  }

  /**
   * Check if there are any active listeners
   */
  get isListening() {
    return this.listeners.length > 0;
  }
}
