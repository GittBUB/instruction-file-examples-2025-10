import useCart from '../hooks/useCart';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice, clear } = useCart();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Your Cart</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <ul className="list-group mb-3">
              {items.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {item.image && <img src={item.image} alt={item.name} className="me-3" style={{ width: 64, height: 64, objectFit: 'cover' }} />}
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">${item.price.toFixed(2)}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="form-control form-control-sm me-3"
                      style={{ width: 80 }}
                    />
                    <span className="me-3">${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Summary</h5>
                <p className="card-text">Items: {totalItems}</p>
                <p className="card-text">Total: <strong>${totalPrice.toFixed(2)}</strong></p>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Checkout</button>
                  <button className="btn btn-outline-secondary" onClick={() => clear()}>Clear Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
