import React from 'react';

const FoodCard = ({ item, onAdd }) => {
  return (
    <div className="glass-card overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-orange/5 bg-white border border-gray-100/50">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <div className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500' : 'border-red-500'} bg-white/80 backdrop-blur`}>
            <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1 font-medium">{item.category}</p>
        <h3 className="font-semibold text-gray-800 text-lg mb-3 truncate">{item.name}</h3>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-lg text-gray-900">₹{item.price}</span>
          <button 
            onClick={() => onAdd(item)}
            className="w-10 h-10 rounded-full bg-brand-light text-brand-orange flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors duration-300 shadow-sm"
          >
            <span className="text-xl leading-none -mt-0.5">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
