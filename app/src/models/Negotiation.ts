import { Model } from "../interfaces/Model";

export class Negotiation implements Model<Negotiation> {
    constructor(
        private _date: Date,
        public readonly amount: number,
        public readonly value: number
    ) {}

    public static createNegotiation(date: string, amount: string, value: string): Negotiation {
        const exp = /-/g;

        const dateNegotiation   = new Date(date.replace(exp, '/'));
        const amountNegotiation = parseInt(amount);
        const valueNegotiation  = parseInt(value);

        return new Negotiation(dateNegotiation, amountNegotiation, valueNegotiation);
    }

    get data(): Date {
        const date = new Date(this._date.getTime());
        return date;
    }

    get volume(): number {
        return this.amount * this.value;
    }

    public toText(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.amount},
            Valor: ${this.value},
        `;
    }

    public itEquals(negotiation: Negotiation): boolean {
        return this.data.getDate() === negotiation.data.getDate()
            && this.data.getMonth() === negotiation.data.getMonth()
            && this.data.getFullYear() === negotiation.data.getFullYear();
    }
}