import { escape } from "../decorators/escape";
import { Negotiations } from "../models/Negotiations";
import { View } from "./View";

export class NegotiationsView extends View<Negotiations> {
    @escape
    protected template(model: Negotiations): string {
        return `
            <table class='table table-hover table-bordered'>
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.showNegotiation().map(negotiation => {
                        return `
                            <tr>
                                <td>${this.formatDate(negotiation.data)}</td>
                                <td>${negotiation.amount}</td>
                                <td>${negotiation.value}</td>
                            </tr>
                        `;
                    })}
                </tbody>
            </table>
        `;
    }

    private formatDate(date: Date) {
        return new Intl.DateTimeFormat().format(date);
    }
}