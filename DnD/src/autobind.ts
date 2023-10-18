function autobind(
    _target: unknown,
    _methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        },
    }
    return adjustedDescriptor
}

export { autobind }
