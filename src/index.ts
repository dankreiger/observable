import { interval, map } from './operators';

const addTwo = (x: number) => x + 2;
const observer = {
  next: console.log,
  error: console.error,
  complete: () => console.log('completed: '),
};
const obs$ = interval(1000).pipe(map(addTwo)).subscribe(observer);

setTimeout(() => {
  obs$.unsubscribe();
}, 5000);
