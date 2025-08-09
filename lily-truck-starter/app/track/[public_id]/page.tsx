import { notFound } from "next/navigation";

async function getOrder(public_id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/orders/${public_id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function Track({ params }: { params: { public_id: string } }) {
  const order = await getOrder(params.public_id);
  if (!order) return notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Suivi commande #{order.public_id}</h1>
      <ol className="relative border-l pl-4">
        {order.timeline.map((s: any) => (
          <li key={s.at} className="mb-6">
            <div className="absolute -left-1.5 w-3 h-3 rounded-full bg-brand-orange"></div>
            <div className="font-semibold capitalize">{s.status}</div>
            <div className="text-xs text-gray-500">{new Date(s.at).toLocaleString()}</div>
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-brand-yellow/30 p-3">Statut actuel : <b>{order.status}</b></div>
    </div>
  );
}
