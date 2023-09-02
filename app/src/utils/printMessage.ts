import { Printable } from "./printable";

export function printMessage(...objects: Printable[]) {
    for (let object of objects) {
        console.log(object.toText());
    }
}