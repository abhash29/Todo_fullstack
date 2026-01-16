function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
