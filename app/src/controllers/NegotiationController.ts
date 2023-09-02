import { domInjector } from "../decorators/domInjector";
import { inspectMethod } from "../decorators/inspectMethod";
import { logRuntime } from "../decorators/logRuntime";
import { Weekday } from "../enums/weekday";
import { Negotiation } from "../models/Negotiation";
import { Negotiations } from "../models/Negotiations";
import { NegotiaionsService } from "../services/NegotiationsService";
import { printMessage } from "../utils/printMessage";
import { MessageView } from "../views/MessageView";
import { NegotiationsView } from "../views/NegotiationsView";

export class NegotiationController {
    @domInjector('#data')
    private inputDate: HTMLInputElement;
    @domInjector('#quantidade')
    private inputAmount: HTMLInputElement;
    @domInjector('#valor')
    private inputValue: HTMLInputElement;
    
    private negotiations     = new Negotiations();
    private negotiationsView = new NegotiationsView('#negotiationsView');
    private messageView      = new MessageView('#messageView');
    private negotiationsService = new NegotiaionsService();

    constructor() {
        this.negotiationsView.update(this.negotiations);
    }

    @inspectMethod
    @logRuntime()
    public addNegotiation(): void {
        const negotiation = Negotiation.createNegotiation(
            this.inputDate.value,
            this.inputAmount.value,
            this.inputAmount.value
        );

        if (!this.checkIfWorkingDay(negotiation.data)) {
            this.messageView.update('Apenas negociações em dias úteis são aceitas.');
            return;
        }

        this.negotiations.addNegotiation(negotiation);
        printMessage(negotiation, this.negotiations);
        this.clearForm();
        this.updateView();
    }

    public importData(): void {
        this.negotiationsService
            .getTodaysNegotiations()
            .then(todaysNegotiation => {
                return todaysNegotiation.filter(todaysNegotiation => {
                    return !this.negotiations
                        .showNegotiation()
                        .some(negotiation => negotiation.itEquals(todaysNegotiation));
                });
            })
            .then(todaysNegotiation => {
                for (let negotiation of todaysNegotiation) {
                    this.negotiations.addNegotiation(negotiation);
                }
                this.negotiationsView.update(this.negotiations);
            });
    }

    private checkIfWorkingDay(date: Date): boolean {
        return date.getDay() > Weekday.SUNDAY 
            && date.getDay() < Weekday.SATURDAY;
    }

    private clearForm(): void {
        this.inputDate.value   = '';
        this.inputAmount.value = '';
        this.inputValue.value  = '';
        this.inputDate.focus();
    }

    private updateView(): void {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Negociação adicionada com sucesso');
    }
}