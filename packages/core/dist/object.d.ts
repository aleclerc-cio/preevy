export declare const overrideGetterSetter: <T extends {}, Prop extends keyof T>(o: T, prop: Prop, { getter, setter }: {
    getter?: ((originalGetter: () => T[Prop]) => T[Prop]) | undefined;
    setter?: ((v: T[Prop], originalSetter: (v: T[Prop]) => void) => void) | undefined;
}, p?: unknown) => T;
