import { View } from "./View";

export class MessageView extends View<string> {
    protected template(model: string): string {
        return `
            <p class='alert alert-info'>${model}</p>
        `;
    }
}