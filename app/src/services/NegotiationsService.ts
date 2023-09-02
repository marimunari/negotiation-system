import { TodaysNegotiation } from "../interfaces/TodaysNegotiation";
import { Negotiation } from "../models/Negotiation";

export class NegotiaionsService {
    public getTodaysNegotiations(): Promise<Negotiation[]> {
        return fetch('http://localhost:8080/dados')
                .then(response => response.json())
                .then((data: TodaysNegotiation[]) => {
                    return data.map(todaysData => {
                        return new Negotiation(
                            new Date(),
                            todaysData.vezes,
                            todaysData.montante
                        );
                    });
                });
    }
}