import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log("This is sis sis  product", product);

  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">

        {/* Image Container */}
        <div className="relative overflow-hidden h-64 bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest text-indigo-600 px-3 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">

          {/* Brand + Name */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              {product.brand}
            </p>
            <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
              {product.name}
            </h2>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Divider */}
          <div className="border-t border-gray-100 mt-auto pt-3 flex items-center justify-between">
            {/* Price */}
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              ₹{product.details[0].price}
            </span>

            {/* CTA */}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all duration-200">
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;