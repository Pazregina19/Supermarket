    import { Injectable } from '@angular/core';

    @Injectable({ providedIn: 'root' })
    export class CartService {

    items: any[] = [];

    add(product: any) {
        const existing = this.items.find(i => i._id === product._id);
        if (existing) {
        existing.quantity++;
        } else {
        this.items.push({ ...product, quantity: 1 });
        }
    }

    remove(id: string) {
        this.items = this.items.filter(i => i._id !== id);
    }

    getTotal() {
        return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    }
    }