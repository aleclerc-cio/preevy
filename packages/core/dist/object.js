export const overrideGetterSetter = (o, prop, { getter, setter }, p = o) => {
    const desc = Object.getOwnPropertyDescriptor(p, prop);
    if (!desc) {
        throw new Error(`${p} has no property ${String(prop)}`);
    }
    const { get: origGetter, set: origSetter } = desc;
    if (getter && !origGetter) {
        throw new Error(`Cannot override getter: ${p} has no getter ${String(prop)}`);
    }
    if (setter && !origSetter) {
        throw new Error(`Cannot override setter: ${p} has no setter ${String(prop)}`);
    }
    Object.defineProperty(o, prop, {
        ...desc,
        get: getter ? () => getter.call(o, origGetter.bind(o)) : origGetter,
        set: setter ? (v) => setter.call(o, v, origSetter.bind(o)) : origSetter,
    });
    return o;
};
//# sourceMappingURL=object.js.map