export default function MeltingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="w-full absolute top-0 left-0 drop-shadow-md text-pink-200 fill-current h-24 md:h-36" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,112C672,128,768,192,864,192C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
      <div className="absolute top-1/4 left-5 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-2/3 right-5 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
}