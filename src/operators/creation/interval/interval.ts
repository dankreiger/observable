import { Observable, Subscriber } from '../../../core';

export const interval = (period: number) => {
  return new Observable((observer: Subscriber) => {
    let counter = 0;
    console.log(observer);
    const id = setInterval(() => observer.next(++counter), period);
    return () => {
      clearInterval(id);
    };
  });
};
