import { interval } from './operators';

const observer = {
  next: console.log,
  error: console.error,
  complete: () => console.log('completed: '),
};
const obs$ = interval(1000).subscribe(observer);

setTimeout(() => {
  obs$.unsubscribe();
}, 5000);
