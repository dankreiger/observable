import { Subscription } from '.';
import { IObserver } from '../interfaces/IObserver';

export class Subscriber {
  private _closed: boolean;
  constructor(public observer: IObserver, public subscription: Subscription) {
    this.observer = observer;
    this._closed = false;
    this.subscription = subscription;
    // 1. add an Observer completion logic to the Subscription container
    this.subscription.add(() => (this._closed = true)); // <- first function inside the subscription
  }
  next<T>(value: T) {
    if (!this._closed) {
      this.observer.next(value);
    }
  }
  error<T>(err: T) {
    if (!this._closed) {
      this._closed = true;
      this.observer.error(err);
      // 2. enable the Subscriber to call `unsubscribe` on completion
      this.subscription.unsubscribe(); // <- unsubscribe on error
    }
  }
  complete() {
    if (!this._closed) {
      this._closed = true;
      this.observer.complete();
      this.subscription.unsubscribe(); // <- unsubscribe on completion
    }
  }
}
