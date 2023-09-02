export function logRuntime(inSeconds: boolean = false) {
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args: any[]) {
            let divisor = 1;
            let unitOfTime = 'milissegundos';

            if (inSeconds) {
                divisor = 1000;
                unitOfTime = 'seconds';
            }

            const time1 = performance.now();
            const methodReturn = originalMethod.apply(this, args);

            const time2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(time1 - time2) / divisor} ${unitOfTime}.`);
            
            methodReturn;
        }
        
        return descriptor;
    }
}