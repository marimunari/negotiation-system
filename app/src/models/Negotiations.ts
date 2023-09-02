import { Model } from "../interfaces/Model";
import { Negotiation } from "./Negotiation";

export class Negotiations implements Model<Negotiations> {
    private negotiations: Negotiation[] = [];

    public addNegotiation(negotiation: Negotiation) {
        this.negotiations.push(negotiation);
    }

    public showNegotiation(): readonly Negotiation[] {
        return this.negotiations;
    }

    public toText(): string {
        return JSON.stringify(this.negotiations, null, 2);
    }

    public itEquals(negotiations: Negotiations): boolean {
        return JSON.stringify(this.negotiations) === JSON.stringify(negotiations.showNegotiation());
    }
}