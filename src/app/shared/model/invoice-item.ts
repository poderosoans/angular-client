import { Product } from './product';

export class InvoiceItem {
    id: number;
    product: Product
    quantity: number = 1;
    amount: number;

    public calculateAmount(): number {
        return this.quantity*  this.product.price;
    }
}
