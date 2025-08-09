"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type MenuItem = {
  id: string; name: string; description?: string; price_cents: number; image_url?: string;
};

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    // Placeholder: fetch from Supabase (public) later
    setMenu([
      { id: "burger-classic", name: "Burger Classic", description: "Steak, cheddar, salade, tomate, sauce maison", price_cents: 950, image_url: "/logo.png" },
      { id: "fries", name: "Frites maison", description: "Croustillantes", price_cents: 350 }
    ]);
  }, []);

  const add = (id: string) => setCart(prev => ({...prev, [id]: (prev[id]||0)+1}));
  const total = menu.reduce((t,m)=> t + (cart[m.id]||0)*m.price_cents, 0);

  return (
    <div className="space-y-6">
      <header className="text-center">
        <div className="mx-auto w-28 h-28 relative">
          <Image alt="Lily Truck" src="/logo.png" fill className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold mt-2">Lily Truck</h1>
        <p className="text-sm text-gray-600">Le nec plus ultra du Burger</p>
      </header>

      <section className="space-y-3">
        {menu.map((m) => (
          <div key={m.id} className="rounded-xl border p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold">{m.name}</div>
              {m.description && <div className="text-sm text-gray-600">{m.description}</div>}
              <div className="text-brand-orange font-bold mt-1">{(m.price_cents/100).toFixed(2)} €</div>
            </div>
            <button onClick={()=>add(m.id)} className="px-3 py-2 rounded-xl bg-brand-yellow font-semibold">
              Ajouter
            </button>
          </div>
        ))}
      </section>

      <footer className="sticky bottom-3">
        <a href="/api/checkout/session" onClick={(e)=>{ if(total===0){ e.preventDefault(); alert('Ajoute des articles !'); } }}>
          <div className="mx-auto max-w-screen-sm rounded-2xl px-4 py-3 bg-brand-black text-white flex justify-between">
            <span>Passer commande</span>
            <span>{(total/100).toFixed(2)} €</span>
          </div>
        </a>
        <div className="text-xs text-center text-gray-500 mt-1">Paiement sécurisé par Stripe</div>
      </footer>
    </div>
  );
}
