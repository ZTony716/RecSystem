const CART_KEY = "demo_cart_v1";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read cart:", error);
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();

  const existing = cart.find(
    (item) => String(item.product_id) === String(product.product_id)
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      product_id: product.product_id,
      product_name: product.product_name,
      price: product.price,
      category_name: product.category_name,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart().filter(
    (item) => String(item.product_id) !== String(productId)
  );
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function updateCartQuantity(productId, quantity) {
  const safeQuantity = Math.max(1, Number(quantity) || 1);

  const cart = getCart().map((item) => {
    if (String(item.product_id) === String(productId)) {
      return { ...item, quantity: safeQuantity };
    }
    return item;
  });

  saveCart(cart);
  return cart;
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => {
    return sum + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + Number(item.quantity || 1), 0);
}