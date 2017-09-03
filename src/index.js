export default class Eventhub {
  constructor() {
    this.listeners = [];
  }

  on(string, handler) {
    this.testHandler(handler);
    this.listeners = this.listeners.concat({
      string,
      handler
    });
    return this;
  }

  onAll(handler) {
    this.testHandler(handler);
    this.listeners = this.listeners.concat({
      string: -1,
      handler
    });
    return this;
  }

  once(string, handler) {
    this.testHandler(handler);
    this.on(string, () => {
      this.exec(handler);
      this.remove(string);
    });
    return this;
  }

  remove(string, handler) {
    const noHandler = handler === undefined;
    this.listeners = this.listeners.filter(listener => {
      const sameString = listener.string === string || listener.string === -1;
      const sameHandler = handler === listener.handler;
      return !(sameString && noHandler || sameHandler);
    });
    return this;
  }

  emit(string, ...args) {
    this.listeners
      .filter(listener => listener.string === string || listener.string === -1)
      .forEach(listener => this.exec(listener.handler, args));
    return this;
  }

  exec(handler, args) {
    handler.apply(null, args);
  }

  testHandler(handler) {
    if (typeof handler !== 'function') {
      throw new Error(`Event handler can't be of type '${typeof handler}'`);
    }
  }

  get isListening() {
    return this.listeners.length > 0;
  }
}