// src/components/CTABanner.jsx

import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTABanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-red-500">
      <div className="container my-10 mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 py-10 px-6 md:px-12 text-white">
        <div className="text-center sm:text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
            Don't wait any longer, start looking for a house right away!
          </h2>
          <p className="text-sm text-red-100 max-w-lg">
            SmartHomes brings together the entire rental market with a single
            search. Don't miss out on the rental of your dreams.
          </p>
        </div>

        <div className="flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={() => navigate("/search")}
            className="w-full sm:w-auto bg-white text-red-500 hover:bg-red-50 active:scale-95 px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-md hover:shadow-lg"
          >
            <Search className="w-5 h-5" />
            Search now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
