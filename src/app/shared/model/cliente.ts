import { Region } from './region';
import { Invoice } from './invoice';

export class Cliente {
    id: number;
    name: string;
    lastname: string;
    createdAt: string;
    email: string;
    image: string;
    region: Region;
    invoices: Invoice[] = []; // Array <Invoice> = []
}
