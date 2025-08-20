function FullPageSpinner() {
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs z-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cream-200 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default FullPageSpinner;
