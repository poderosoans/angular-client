import { InvoiceItem } from './invoice-item';
import { Cliente } from './cliente';

export class Invoice {
    id: number;
    description: string;
    observation: string;
    items: InvoiceItem[] = [];
    client: Cliente;
    total: number;
    createdAt: Date;

    calculateGrandTotal(): number {
        this.total = 0;
        this.items.forEach((item:InvoiceItem) => {
            this.total += item.calculateAmount();
        })
        return this.total;
    }
}
