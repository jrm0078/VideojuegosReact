export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6">
      <p className="font-bold">Error</p>
      <p>{message || 'Algo salió mal. Por favor, intenta de nuevo.'}</p>
    </div>
  );
}
