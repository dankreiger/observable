import { Subscriber } from '.';
import { IObserver } from '../interfaces/IObserver';
import { Subscription } from './Subscription';

const pipe =
  (...fns: any[]) =>
  (init: any) =>
    fns.reduce((v, f) => f(v), init);

export class Observable {
  constructor(public initFunc: (subscriber: Subscriber) => () => void) {}

  subscribe(observer: IObserver) {
    const subscription = new Subscription();
    const subscriber = new Subscriber(observer, subscription); // <- passed by reference
    const teardown = this.initFunc(subscriber);
    // 3. add the teardown logic to the Subscription instance
    subscription.add(teardown); // <- second function inside the subscription

    return subscription;
  }
  pipe(...fns: any[]) {
    // provide source Obx to each function returned from pipeable operators,
    // to start the chaining operation provide the current source Obx (this)
    return pipe(...fns)(this);
  }
}
