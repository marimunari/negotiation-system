export function domInjector(selector: string) {
    return function(
        target: any,
        propertyKey: string
    ) {
        let element: HTMLElement;
        const getElement = function() {
            if (!element) {
                element = <HTMLElement>document.querySelector(selector);
            }

            return element;
        }

        Object.defineProperty(target, propertyKey, {
            get: getElement
        });
    }
}