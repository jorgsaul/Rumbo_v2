import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-neutral-500">Esta página no existe</p>
      <Link
        href="/feed"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
