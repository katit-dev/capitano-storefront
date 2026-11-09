import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { CartItem } from "@/types/Product";

export const cartItemsAtom = atomWithStorage<CartItem[]>("paxmoly_cart", []);
export const cartDrawerOpenAtom = atom(false);

export const cartCountAtom = atom((get) =>
  get(cartItemsAtom).reduce((total, item) => total + item.quantity, 0),
);

export const addToCartAtom = atom(null, (get, set, productId: string, quantity: number = 1) => {
  const current = get(cartItemsAtom);
  const existing = current.find((item) => item.productId === productId);
  set(
    cartItemsAtom,
    existing
      ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
      : [...current, { productId, quantity }],
  );
  set(cartDrawerOpenAtom, true);
});

export const updateCartQuantityAtom = atom(
  null,
  (get, set, payload: { productId: string; quantity: number }) => {
    const next = get(cartItemsAtom)
      .map((item) => item.productId === payload.productId ? { ...item, quantity: payload.quantity } : item)
      .filter((item) => item.quantity > 0);
    set(cartItemsAtom, next);
  },
);

export const removeFromCartAtom = atom(null, (get, set, productId: string) => {
  set(cartItemsAtom, get(cartItemsAtom).filter((item) => item.productId !== productId));
});
