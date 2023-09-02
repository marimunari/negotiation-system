export class View<T> {
    protected element: HTMLElement;

    constructor(selector: string) {
        const element = document.querySelector(selector);
        if (element) {
            this.element = <HTMLElement>element;
        } else {
            throw Error(`Seletor ${selector} não existe no DOM. Verifique!`)
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        this.element.innerHTML = template;
    }

    protected abstract template(model: T): string;
}