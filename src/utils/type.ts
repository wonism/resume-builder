export type Pair<V, S> = [V, S];
export type Optional<T> = { [P in keyof T]? : T[P] };
