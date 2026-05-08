import React from 'react';
import { Search } from 'lucide-react';
import FoodCard from './FoodCard';
import { categories } from '../data/mockData';

const MainContent = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory, filteredItems, addToCart }) => {
  return (
    <div className="flex-1 px-4 lg:px-8 py-6 h-screen overflow-y-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Menu</h1>
          <p className="text-gray-500 text-sm mt-1">Select items to add to the bill</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-white shadow-sm ring-1 ring-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all text-sm"
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-4 -mx-4 px-4 lg:mx-0 lg:px-0 hide-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
              ${activeCategory === category 
                ? 'bg-brand-orange text-white shadow-brand-orange/30 shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-100'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 pb-20">
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No items found</h3>
          <p className="text-gray-500 text-sm mt-1">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default MainContent;
