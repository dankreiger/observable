export interface IObserver {
  next: (value: any) => void;
  error: (error: any) => void;
  complete: () => void;
}
