export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Marhaba</h1>
        <p className="text-xl mb-8">Furniture & Packers and Movers</p>
        
        {/* Simple spinner instead of progress bar */}
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        
        <p className="text-lg mt-4">Loading...</p>
      </div>
    </div>
  );
}