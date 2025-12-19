const Logo = ({ className = "h-8 w-8" }) => {
  return (
    <div className={`${className} rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-white shadow-md`}>
      <span className="text-sm">JS</span>
    </div>
  );
};

export default Logo;
