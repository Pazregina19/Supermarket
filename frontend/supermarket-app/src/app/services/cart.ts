import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  getCart(): any[] {

    return JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

  }

  addToCart(product: any): boolean {

  const cart = this.getCart();

  // Carrinho vazio
  if (cart.length === 0) {

    cart.push({
      ...product,
      quantity: 1
    });

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    return true;
  }

  // Verificar supermercado

  const supermarketId =
    cart[0].supermarket._id;

  const newSupermarketId =
    product.supermarket._id;

  if (
    supermarketId !==
    newSupermarketId
  ) {

    return false;

  }

  const existing =
    cart.find(

      p => p._id === product._id

    );

  if (existing) {

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

  return true;

}

  removeFromCart(
    id: string
  ): void {

    const cart =
      this.getCart()
        .filter(
          item =>
            item._id !== id
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

  getTotal(): number {

    return this.getCart()
      .reduce(

        (sum, item) =>

          sum +
          item.price *
          item.quantity,

        0

      );

  }

}