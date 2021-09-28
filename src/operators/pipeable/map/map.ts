import { Observable } from '../../../core';

export const map = (mapFunc: any) => (sourceObservable: Observable) => {
  // return a new Observable
  return new Observable((observer) => {
    const sourceSubscription = sourceObservable.subscribe({
      next<T>(val: T): void {
        let next;
        try {
          next = mapFunc(val);
        } catch (e) {
          this.error(e);
          this.complete();
        }
        observer.next(next);
      },
      error(err: any): void {
        observer.error(err);
      },
      complete(): void {
        observer.complete();
      },
    });
    return () => {
      // --- operator specific TEARDOWN LOGIC
      // when the new Obx is unsubscribed
      // simply unsubscribe from the source Obx
      sourceSubscription.unsubscribe();
    };
  });
};
