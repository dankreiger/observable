import { Observable, Subscriber } from '../../../core';

export const interval = (period: number) =>
  new Observable((observer: Subscriber) => {
    let counter = 0;
    const id = setInterval(() => observer.next(++counter), period);
    return () => {
      clearInterval(id);
    };
  });
