export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-highlight rounded-full animate-spin"></div>
        <div className="absolute inset-2 bg-primary rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🎮</span>
        </div>
      </div>
    </div>
  );
}
