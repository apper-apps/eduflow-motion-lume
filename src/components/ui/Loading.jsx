import React from "react";

const Loading = ({ variant = "default" }) => {
  if (variant === "dashboard") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg skeleton"></div>
                <div className="w-16 h-4 bg-white/10 rounded skeleton"></div>
              </div>
              <div className="w-20 h-8 bg-white/10 rounded skeleton mb-2"></div>
              <div className="w-32 h-4 bg-white/10 rounded skeleton"></div>
            </div>
          ))}
        </div>
        <div className="glass-card p-6">
          <div className="w-48 h-6 bg-white/10 rounded skeleton mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full skeleton"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-white/10 rounded skeleton"></div>
                  <div className="w-1/2 h-3 bg-white/10 rounded skeleton"></div>
                </div>
                <div className="w-20 h-8 bg-white/10 rounded skeleton"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-32 h-6 bg-white/10 rounded skeleton"></div>
            <div className="w-24 h-8 bg-white/10 rounded skeleton"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 h-4 bg-white/10 rounded skeleton"></div>
                <div className="col-span-2 h-4 bg-white/10 rounded skeleton"></div>
                <div className="col-span-2 h-4 bg-white/10 rounded skeleton"></div>
                <div className="col-span-2 h-4 bg-white/10 rounded skeleton"></div>
                <div className="col-span-2 h-4 bg-white/10 rounded skeleton"></div>
                <div className="col-span-1 w-8 h-8 bg-white/10 rounded skeleton"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card-grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card p-6">
            <div className="w-full h-32 bg-white/10 rounded-lg skeleton mb-4"></div>
            <div className="w-3/4 h-5 bg-white/10 rounded skeleton mb-2"></div>
            <div className="w-full h-4 bg-white/10 rounded skeleton mb-2"></div>
            <div className="w-2/3 h-4 bg-white/10 rounded skeleton mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="w-16 h-6 bg-white/10 rounded skeleton"></div>
              <div className="w-20 h-8 bg-white/10 rounded skeleton"></div>
            </div>
          </div>
        ))}
      </div>
    );
}

  if (variant === "calendar") {
    return (
      <div className="space-y-6">
        <div className="glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="w-32 h-6 bg-white/10 rounded skeleton"></div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-white/10 rounded skeleton"></div>
              <div className="w-8 h-8 bg-white/10 rounded skeleton"></div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-10 h-6 bg-white/10 rounded skeleton"></div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="aspect-square bg-white/10 rounded skeleton"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default loading
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{animationDelay: "0.5s", animationDirection: "reverse"}}></div>
      </div>
    </div>
  );
};

export default Loading;