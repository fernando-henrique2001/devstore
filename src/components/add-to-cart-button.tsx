"use client";

import { useCart } from "@/context/cart-context";
import React from "react";

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  function handleAddProductToCart() {
    addToCart(productId);
  }

  return (
    <button
      onClick={handleAddProductToCart}
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
    >
      Adicionar ao carrinho
    </button>
  );
}
