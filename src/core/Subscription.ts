export class Subscription {
  private _teardowns: (() => void)[];
  constructor() {
    this._teardowns = [];
  }
  add(teardown: () => void): void {
    this._teardowns.push(teardown);
  }
  unsubscribe(): void {
    this._teardowns.forEach((teardown) => teardown());
    this._teardowns = [];
  }
}
