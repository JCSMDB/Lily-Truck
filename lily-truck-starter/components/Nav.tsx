import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Lily Truck
        </Link>
        <div className="flex gap-3 text-sm">
          <Link href="/kds">Cuisine</Link>
          <Link href="/admin/menu">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
