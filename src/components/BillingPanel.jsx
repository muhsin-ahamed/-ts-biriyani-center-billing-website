import React from 'react';
import { Minus, Plus, Trash2, Receipt, Printer, RefreshCcw } from 'lucide-react';

const BillingPanel = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05; // 5% GST
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0; // 10% discount over 1000
  const total = subtotal + gst - discount;

  return (
    <div className="w-full lg:w-[400px] h-screen bg-white border-l border-gray-100 flex flex-col shadow-soft z-10 sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Current Order</h2>
          <div className="bg-brand-light text-brand-orange px-3 py-1 rounded-full text-sm font-semibold">
            Table 4
          </div>
        </div>
        <div className="flex gap-2">
          {['Dine In', 'Takeaway', 'Delivery'].map((type, idx) => (
            <button 
              key={idx}
              className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors border ${idx === 0 ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Receipt className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-1">Bill is empty</h3>
            <p className="text-sm text-gray-400">Add some delicious items from the menu!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 group">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-800 text-sm leading-tight pr-2">{item.name}</h4>
                    <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-gray-600 shadow-sm hover:text-brand-orange transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-semibold w-3 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-gray-600 shadow-sm hover:text-brand-orange transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bill Summary */}
      {cart.length > 0 && (
        <div className="p-6 bg-gray-50/50 border-t border-gray-100">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">GST (5%)</span>
              <span className="font-medium text-gray-800">₹{gst.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount (10%)</span>
                <span className="font-medium">-₹{discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between items-end">
              <span className="text-gray-800 font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-brand-orange">₹{Math.round(total)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <button 
                onClick={clearCart}
                className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
              >
                <RefreshCcw size={16} />
                Clear
              </button>
              <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <Printer size={16} />
                Print
              </button>
            </div>
            <button className="w-full py-4 bg-brand-orange text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/30 hover:bg-brand-hover transition-all hover:-translate-y-0.5">
              Generate Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPanel;
