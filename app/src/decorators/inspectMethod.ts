export function inspectMethod(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`--- MÉTODO #${propertyKey}`);
        console.log(`----- PARÂMETROS: ${JSON.stringify(args)}`);

        const methodReturn = originalMethod.apply(this, args);

        console.log(`----- RETORNO: ${JSON.stringify(methodReturn)}`);

        return methodReturn;
    }

    return descriptor;
}