import React, { useState } from 'react';
import { Printer, Plus, Trash2 } from 'lucide-react';

function App() {
  const [customerName, setCustomerName] = useState('');
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([
    { id: 1, name: '', price: '', quantity: '1' }
  ]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', price: '', quantity: '1' }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateTotal = (price, quantity) => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(quantity) || 0;
    return p * q;
  };

  const grandTotal = items.reduce((sum, item) => sum + calculateTotal(item.price, item.quantity), 0);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen print:min-h-0 bg-gray-100 py-8 px-4 font-sans flex flex-col items-center print:bg-white print:py-0 print:block print:p-0 m-0">
      {/* POS Receipt Container */}
      <div id="receipt-content" className="w-full sm:max-w-md bg-white shadow-xl p-6 sm:p-8 text-gray-800 print:shadow-none print:border-2 print:border-black print:w-full print:max-w-none print:mx-auto">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold tracking-wide">Ts Biriyan Center</h1>
          <p className="text-sm mt-1">Kurumbadi, Perinthalmanna Road, Malappuram Dt</p>
          <p className="text-sm">Ph: 9847444232</p>
        </div>

        <div className="flex items-center justify-center my-4 -mx-6 sm:-mx-8 print:-mx-[0.5cm]">
          <div className="flex-1 border-b border-black"></div>
          <span className="px-4 text-sm font-semibold tracking-widest">Bill</span>
          <div className="flex-1 border-b border-black"></div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
          <div className="flex items-center">
            <span className="font-semibold mr-2 min-w-[45px]">Name:</span>
            <input
              type="text"
              className="flex-1 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 outline-none print:border-none w-full"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end">
            <span className="font-semibold mr-2">Date:</span>
            <input
              type="date"
              className="w-28 text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 outline-none print:border-none"
              value={billDate}
              onChange={(e) => setBillDate(e.target.value)}
            />
          </div>
        </div>

        <div className="border-b border-black mb-2 -mx-6 sm:-mx-8 print:-mx-[0.5cm]"></div>

        {/* Order Details Header */}
        <div className="flex text-sm font-bold pb-2 mb-2 border-b border-black -mx-6 sm:-mx-8 print:-mx-[0.5cm] px-6 sm:px-8 print:px-[0.5cm]">
          <div className="flex-[2] min-w-0">Item</div>
          <div className="flex-1 text-right min-w-0">Price</div>
          <div className="flex-1 text-center min-w-0">Qty</div>
          <div className="flex-1 text-right min-w-0">Total</div>
        </div>

        {/* Items List */}
        <div className="space-y-1 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex text-sm items-center group py-1 relative">
              <div className="flex-[2] min-w-0 pr-2">
                <input
                  type="text"
                  placeholder="Item name"
                  className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 outline-none print:border-none"
                  value={item.name}
                  onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-end">
                  <span className="mr-1">₹</span>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full max-w-[50px] text-right bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 outline-none print:border-none appearance-none"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  placeholder="1"
                  className="w-full text-center bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 outline-none print:border-none"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                />
              </div>
              <div className="flex-1 text-right min-w-0">
                ₹ {calculateTotal(item.price, item.quantity).toFixed(0)}
              </div>

              {/* Delete button positioned absolute to not disrupt layout */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="absolute -right-6 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                title="Remove Item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end text-sm mb-4 mt-6 py-4">
          <div className="flex w-full sm:w-2/3 justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₹ {grandTotal.toFixed(0)}</span>
          </div>
        </div>

        <div className="border-b border-black mb-6 -mx-6 sm:-mx-8 print:-mx-[0.5cm]"></div>

        {/* Footer */}
        <div className="text-center text-sm">
          <p className="font-semibold uppercase tracking-wide">** Thank You !! **</p>
          <p className="mt-1">Please visit again</p>
        </div>

        {/* Action Buttons (Hidden on Print) */}
        <div className="mt-8 flex justify-between gap-4 print:hidden">
          <button
            onClick={handleAddItem}
            className="flex-1 flex items-center justify-center space-x-2 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded shadow-sm font-medium transition-colors"
          >
            <Plus size={18} />
            <span>Add Item</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow-sm font-medium transition-colors"
          >
            <Printer size={18} />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }
          html, body, #root {
            height: auto !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            width: 100% !important;
          }
          body {
            background-color: white !important;
            color: black !important;
            display: flex !important;
            justify-content: center !important;
            padding: 1cm !important;
          }
          #receipt-content {
            break-inside: avoid !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            padding: 0.5cm !important;
            border: 2px solid black !important;
          }
          /* Hide number input spinners */
          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        }
        
        /* Hide number input spinners globally for a cleaner look */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}} />
    </div>
  );
}

export default App;
