export type HasRequired<T, P extends keyof T> = Omit<T, P> & {
    [P2 in P]-?: NonNullable<T[P2]>;
};
export declare function ensureDefined<T extends {}, Prop extends keyof T>(o: Promise<T>, ...props: Prop[]): Promise<HasRequired<T, Prop>>;
export declare function ensureDefined<T extends {}, Prop extends keyof T>(o: T, ...props: Prop[]): HasRequired<T, Prop>;
export declare function extractDefined<T extends {}, Prop extends keyof T>(o: Promise<T>, prop: Prop): Promise<NonNullable<T[Prop]>>;
export declare function extractDefined<T extends {}, Prop extends keyof T>(o: T, prop: Prop): NonNullable<T[Prop]>;
export declare const hasProp: <K extends string | number | symbol>(prop: K) => <T extends { [k in K]?: unknown; }>(obj: T) => obj is T & { [k_1 in K]-?: NonNullable<T[K]>; };
