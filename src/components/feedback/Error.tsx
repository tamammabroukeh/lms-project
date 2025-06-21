export default function Error({ error }: { error: string }) {
  return (
    error && (
      <p className="text-xl font-semibold mx-auto text-red-500">{error}</p>
    )
  );
}
