import { v4 as uuid } from 'uuid';
import { measurementUnit } from '../utils/consts';

export class Item {
    id: string;
    name: string;
    measurementUnit: measurementUnit;
    quantity: number;
    amount: number;
    perishable: boolean;
    validity: Date;
    manufacturing: Date;

    constructor() {
        this.id = uuid();
        this.name = null;
        this.measurementUnit = null;
        this.quantity = null;
        this.amount = null;
        this.perishable = false;
        this.validity = null;
        this.manufacturing = null;
    }

    prepareObj(obj: any): void {
        this.name = obj.name.value;
        this.measurementUnit = obj.measurementUnit.value;
        this.quantity = obj.quantity.value;
        this.amount = obj.amount.value;
        this.perishable = obj.perishable.value;
        this.validity = obj.validity.value;
        this.manufacturing = obj.manufacturing.value;
    }

    parseItem(obj: any): void {

    }
}
