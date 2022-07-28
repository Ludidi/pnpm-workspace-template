declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type TransRouteParamsRaw<T> = { [K in keyof T]: T[K] extends boolean ? number : T[K] };

declare type Nullable<T> = T | null;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type IntervalHandle = ReturnType<typeof setInterval>;

declare type Recordable<T = any> = Record<string, T>;

declare type GetType<T> = T extends (arg: infer P) => void ? P : string;

declare type ValueOf<T> = T[keyof T];
