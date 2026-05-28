import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  getCart(): any[] {

    return JSON.parse(

      localStorage.getItem(
        'cart'
      ) || '[]'

    );

  }

  addToCart(
    product: any
  ): void {

    const cart =
    this.getCart();

    const existing =
    cart.find(

      p => p._id === product._id

    );

    if(existing) {

      existing.quantity++;

    }

    else {

      cart.push({

        ...product,

        quantity: 1

      });

    }

    localStorage.setItem(

      'cart',

      JSON.stringify(cart)

    );

  }

  removeFromCart(
    id: string
  ): void {

    const cart =
    this.getCart()
    .filter(

      p => p._id !== id

    );

    localStorage.setItem(

      'cart',

      JSON.stringify(cart)

    );

  }

  clearCart(): void {

    localStorage.removeItem(
      'cart'
    );

  }

}