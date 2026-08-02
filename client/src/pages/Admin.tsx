/**
 * SHTËPI MOBILE — Admin Panel
 * Menaxhim produktesh, galerie dhe mesazhesh: shto, redakto, fshi, ngarko foto
 */
import { useState, useEffect, useRef } from "react";
import { supabase, type Product, type GalleryImage } from "@/lib/supabase";
import { compressImage } from "@/lib/imageCompress";

const categories = ["Dhoma Ndenje", "Dhoma Gjumi", "Kuzhinë", "Komoda"];
const galleryCategories = ["Dhoma Ndenje", "Dhoma Gjumi", "Kuzhinë", "Komoda", "Ngrënie", "Të Tjera"];
const spanOptions = [
  { label: "Normale", value: "" },
  { label: "E gjerë (2 kolona)", value: "col-span-2" },
  { label: "E madhe (2x2)", value: "col-span-2 row-span-2" },
];

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "true") {
      setAuthed(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authed", "true");
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Fjalëkalim i gabuar");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1410] via-[#2A1F16] to-[#1C1410] px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif text-[#FAF7F2] tracking-wide">Shtëpi Mobile</h1>
            <p className="text-xs text-[#C9A84C]/70 uppercase tracking-[0.2em] mt-1">Paneli Admin</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#FAF7F2]/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-[#C9A84C]/20"
          >
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-2">
              Fjalëkalimi
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-[#E8E0D4] rounded-md px-4 py-3 mb-4 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all bg-white"
              autoFocus
            />
            {authError && (
              <p className="text-red-600 text-sm mb-4 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-[#1C1410] text-[#C9A84C] py-3 rounded-md font-medium tracking-wide hover:bg-[#C9A84C] hover:text-[#1C1410] transition-colors duration-300"
            >
              Hyr
            </button>
          </form>

          <p className="text-center text-[#FAF7F2]/30 text-xs mt-6">
            Qasje e kufizuar — vetëm për administratorë
          </p>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [tab, setTab] = useState<"products" | "gallery" | "messages">("products");
  const [unreadCount, setUnreadCount] = useState(0);

  async function loadUnreadCount() {
    const { count } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);
    setUnreadCount(count || 0);
  }

  useEffect(() => {
    loadUnreadCount();
  }, [tab]);

  function logout() {
    sessionStorage.removeItem("admin_authed");
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header bar */}
      <div className="bg-[#1C1410] border-b border-[#C9A84C]/20">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif text-[#FAF7F2] tracking-wide">Paneli Admin</h1>
            <p className="text-xs text-[#C9A84C]/70 uppercase tracking-wider mt-0.5">
              Menaxhimi i Përmbajtjes
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-sm text-[#C9A84C] hover:text-[#FAF7F2] transition-colors border border-[#C9A84C]/30 rounded-md px-4 py-2 hover:bg-[#C9A84C]/10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Dil
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1">
          <button
            onClick={() => setTab("products")}
            className={`px-5 py-3 text-sm tracking-wide border-b-2 transition-colors ${
              tab === "products"
                ? "border-[#C9A84C] text-[#C9A84C]"
                : "border-transparent text-[#FAF7F2]/50 hover:text-[#FAF7F2]"
            }`}
          >
            Produktet
          </button>
          <button
            onClick={() => setTab("gallery")}
            className={`px-5 py-3 text-sm tracking-wide border-b-2 transition-colors ${
              tab === "gallery"
                ? "border-[#C9A84C] text-[#C9A84C]"
                : "border-transparent text-[#FAF7F2]/50 hover:text-[#FAF7F2]"
            }`}
          >
            Galeria
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`relative px-5 py-3 text-sm tracking-wide border-b-2 transition-colors flex items-center gap-2 ${
              tab === "messages"
                ? "border-[#C9A84C] text-[#C9A84C]"
                : "border-transparent text-[#FAF7F2]/50 hover:text-[#FAF7F2]"
            }`}
          >
            Mesazhet
            {unreadCount > 0 && (
              <span className="bg-[#C9A84C] text-[#1C1410] text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-tight">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {tab === "products" ? (
          <ProductsTab />
        ) : tab === "gallery" ? (
          <GalleryTab />
        ) : (
          <MessagesTab onChange={loadUnreadCount} />
        )}
      </div>
    </div>
  );
}

/* ============================= MESSAGES TAB ============================= */

function MessagesTab({ onChange }: { onChange: () => void }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  async function loadMessages() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function markAsRead(id: number) {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    onChange();
  }

  async function handleDelete(id: number) {
    if (!confirm("Je i sigurt që do ta fshish këtë mesazh?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    onChange();
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("sq-AL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const filtered = filter === "unread" ? messages.filter((m) => !m.is_read) : messages;

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-serif font-semibold text-[#1C1410]">
          Mesazhet nga Klientët
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === "all"
                ? "bg-[#1C1410] text-[#C9A84C]"
                : "border border-[#E8E0D4] text-[#1C1410]/60 hover:border-[#C9A84C]"
            }`}
          >
            Të Gjitha ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              filter === "unread"
                ? "bg-[#1C1410] text-[#C9A84C]"
                : "border border-[#E8E0D4] text-[#1C1410]/60 hover:border-[#C9A84C]"
            }`}
          >
            Të Palexuara ({messages.filter((m) => !m.is_read).length})
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-[#1C1410]/50 text-sm">Duke ngarkuar...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-[#E8E0D4]">
          <p className="text-[#1C1410]/40 text-sm">
            {filter === "unread" ? "S'ka mesazhe të palexuara." : "Ende s'ka mesazhe."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-lg border p-5 transition-colors ${
                msg.is_read ? "border-[#E8E0D4]" : "border-[#C9A84C] bg-[#C9A84C]/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#1C1410]">{msg.name}</p>
                    {!msg.is_read && (
                      <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                    )}
                  </div>
                  <a
                    href={`tel:${msg.phone}`}
                    className="text-sm text-[#8B6914] hover:underline"
                  >
                    {msg.phone}
                  </a>
                </div>
                <span className="text-xs text-[#1C1410]/40 whitespace-nowrap">
                  {formatDate(msg.created_at)}
                </span>
              </div>

              <p className="text-sm text-[#1C1410]/80 leading-relaxed mb-4 whitespace-pre-wrap">
                {msg.message}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 font-medium hover:text-green-800 transition-colors flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                {!msg.is_read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="text-sm text-[#8B6914] font-medium hover:text-[#1C1410] transition-colors"
                  >
                    Shëno si të lexuar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="text-sm text-red-600 font-medium hover:text-red-700 transition-colors flex items-center gap-1 ml-auto"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                  Fshi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ============================= PRODUCTS TAB ============================= */

type PendingProductImage = {
  file: File;
  previewUrl: string;
};

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    material: "",
    price: "",
    description: "",
    tag: "",
    featured: false,
  });
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [pendingImages, setPendingImages] = useState<PendingProductImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formTopRef = useRef<HTMLFormElement>(null);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      pendingImages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, [pendingImages]);

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setCompressing(true);
    try {
      const compressedFiles = await Promise.all(files.map((file) => compressImage(file)));

      const newPending: PendingProductImage[] = compressedFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setPendingImages((prev) => [...prev, ...newPending]);
    } catch (err) {
      alert("Gabim gjatë përpunimit të fotove: " + (err as Error).message);
    } finally {
      setCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removePendingImage(index: number) {
    setPendingImages((prev) => {
      const item = prev[index];
      URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  function removeExistingImage(index: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  function clearForm() {
    pendingImages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingImages([]);
    setExistingImages([]);
    setEditingId(null);
    setForm({
      name: "",
      category: categories[0],
      material: "",
      price: "",
      description: "",
      tag: "",
      featured: false,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      material: product.material,
      price: product.price != null ? String(product.price) : "",
      description: product.description || "",
      tag: product.tag || "",
      featured: product.featured || false,
    });
    setExistingImages(
      product.images && product.images.length > 0 ? product.images : [product.image]
    );
    pendingImages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingImages([]);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const totalImages = existingImages.length + pendingImages.length;
    if (totalImages === 0) {
      alert("Zgjidh të paktën një foto");
      return;
    }
    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const item of pendingImages) {
        const fileExt = item.file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, item.file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      const allImages = [...existingImages, ...uploadedUrls];

      const payload = {
        name: form.name,
        category: form.category,
        material: form.material,
        price: form.price ? Number(form.price) : null,
        description: form.description,
        tag: form.tag,
        featured: form.featured,
        image: allImages[0],
        images: allImages,
      };

      if (editingId != null) {
        const { error: updateError } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("products").insert(payload);
        if (insertError) throw insertError;
      }

      clearForm();
      loadProducts();
    } catch (err) {
      alert("Gabim gjatë ruajtjes: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Je i sigurt që do ta fshish këtë produkt?")) return;
    await supabase.from("products").delete().eq("id", id);
    if (editingId === id) clearForm();
    loadProducts();
  }

  const isEditing = editingId != null;

  return (
    <>
      {/* Form shtimi / editimi */}
      <form
        ref={formTopRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-[#E8E0D4] p-6 md:p-8 mb-10"
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E0D4]">
          <h2 className="text-lg font-serif font-semibold text-[#1C1410]">
            {isEditing ? "Ndrysho Produktin" : "Shto Produkt të Ri"}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={clearForm}
              className="text-xs text-[#1C1410]/50 hover:text-[#1C1410] transition-colors"
            >
              Anulo editimin
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Emri
            </label>
            <input
              required
              placeholder="p.sh. Koleksioni Venezia"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Kategoria
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Materiali
            </label>
            <input
              placeholder="p.sh. Kadife · Dru Arrë"
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
              className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Çmimi (€)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="p.sh. 450"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Etiketa (opsionale)
            </label>
            <input
              placeholder="p.sh. Bestseller"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Përshkrimi
            </label>
            <textarea
              placeholder="Përshkrimi i produktit..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Foto ekzistuese (vetëm kur editohet) */}
        {isEditing && existingImages.length > 0 && (
          <div className="mb-4">
            <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
              Fotot ekzistuese
            </label>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((url, i) => (
                <div key={url + i} className="relative">
                  <img
                    src={url}
                    alt="Ekzistuese"
                    className="w-24 h-24 object-cover rounded-md border border-[#E8E0D4] shadow-sm"
                  />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#C9A84C] text-[#1C1410] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Kopertina
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeExistingImage(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-[#1C1410] text-[#FAF7F2] shadow-md hover:bg-red-600 transition-colors"
                    aria-label="Hiq foton"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Foto të reja upload + preview */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
            {isEditing ? "Shto foto të reja (opsionale)" : "Fotot e produktit (e para bëhet kopertina)"}
          </label>

          <label
            htmlFor="product-file-input"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8E0D4] rounded-md py-10 cursor-pointer hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeOpacity="0.4" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span className="text-sm text-[#1C1410]/60">
              {compressing ? "Duke përpunuar fotot..." : "Kliko për të zgjedhur një ose disa foto"}
            </span>
            <span className="text-xs text-[#1C1410]/40">JPG, PNG deri në disa MB — do të komprimohen automatikisht</span>
            <input
              id="product-file-input"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              disabled={compressing}
              className="hidden"
            />
          </label>

          {pendingImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {pendingImages.map((p, i) => (
                <div key={i} className="relative">
                  <img
                    src={p.previewUrl}
                    alt="Parapamje"
                    className="w-24 h-24 object-cover rounded-md border border-[#E8E0D4] shadow-sm"
                  />
                  {!isEditing && i === 0 && existingImages.length === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#C9A84C] text-[#1C1410] text-[9px] font-bold px-1.5 py-0.5 rounded">
                      Kopertina
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removePendingImage(i)}
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-[#1C1410] text-[#FAF7F2] shadow-md hover:bg-red-600 transition-colors"
                    aria-label="Hiq foton"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading || compressing}
          className="w-full bg-[#1C1410] text-[#C9A84C] py-3.5 rounded-md font-medium tracking-wide hover:bg-[#C9A84C] hover:text-[#1C1410] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Duke ruajtur...
            </>
          ) : isEditing ? (
            "Ruaj Ndryshimet"
          ) : (
            "Shto Produktin"
          )}
        </button>
      </form>

      {/* Lista e produkteve */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-serif font-semibold text-[#1C1410]">Produktet Ekzistuese</h2>
        <span className="text-xs font-medium text-[#C9A84C] bg-[#1C1410] rounded-full px-3 py-1">
          {products.length}
        </span>
      </div>

      {loading ? (
        <p className="text-[#1C1410]/50 text-sm">Duke ngarkuar...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-[#E8E0D4]">
          <p className="text-[#1C1410]/40 text-sm">Ende nuk ka produkte të shtuara.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow ${
                editingId === p.id ? "border-[#C9A84C] ring-2 ring-[#C9A84C]/30" : "border-[#E8E0D4]"
              }`}
            >
              <img src={p.image} alt={p.name} className="w-full aspect-[3/4] object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-[#1C1410]">{p.name}</p>
                  {p.price != null && (
                    <p className="text-sm font-semibold text-[#8B6914] whitespace-nowrap">
                      {p.price} €
                    </p>
                  )}
                </div>
                <p className="text-xs text-[#1C1410]/50 mb-1">{p.category}</p>
                {p.images && p.images.length > 1 && (
                  <p className="text-xs text-[#1C1410]/40 mb-3">{p.images.length} foto</p>
                )}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-[#8B6914] text-sm font-medium hover:text-[#1C1410] transition-colors flex items-center gap-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Ndrysho
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors flex items-center gap-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                    Fshi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ============================= GALLERY TAB ============================= */

type PendingImage = {
  file: File;
  previewUrl: string;
  alt: string;
  span: string;
};

function GalleryTab() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [pending, setPending] = useState<PendingImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadImages() {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data) setImages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    return () => {
      pending.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, [pending]);

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setCompressing(true);
    try {
      const compressedFiles = await Promise.all(files.map((file) => compressImage(file)));

      const newPending: PendingImage[] = compressedFiles.map((file, i) => ({
        file,
        previewUrl: URL.createObjectURL(file),
        alt: groupName
          ? files.length > 1
            ? `${groupName} ${pending.length + i + 1}`
            : groupName
          : file.name,
        span: spanOptions[0].value,
      }));

      setPending((prev) => [...prev, ...newPending]);
    } catch (err) {
      alert("Gabim gjatë përpunimit të fotove: " + (err as Error).message);
    } finally {
      setCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removePending(index: number) {
    setPending((prev) => {
      const item = prev[index];
      URL.revokeObjectURL(item.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }

  function updatePendingField(index: number, field: "alt" | "span", value: string) {
    setPending((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  function clearAll() {
    pending.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPending([]);
    setGroupName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending.length === 0) {
      alert("Zgjidh të paktën një foto");
      return;
    }
    setUploading(true);

    try {
      let nextOrder = images.length
        ? Math.max(...images.map((i) => i.sort_order ?? 0)) + 1
        : 0;

      for (const item of pending) {
        const fileExt = item.file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery-images")
          .upload(fileName, item.file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("gallery-images").getPublicUrl(fileName);

        const { error: insertError } = await supabase.from("gallery_images").insert({
          src: publicUrl,
          alt: item.alt,
          span: item.span,
          sort_order: nextOrder,
        });

        if (insertError) throw insertError;
        nextOrder += 1;
      }

      clearAll();
      loadImages();
    } catch (err) {
      alert("Gabim gjatë ruajtjes: " + (err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Je i sigurt që do ta fshish këtë foto?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    loadImages();
  }

  async function moveImage(id: string, direction: "up" | "down") {
    const idx = images.findIndex((i) => i.id === id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= images.length) return;

    const current = images[idx];
    const swapWith = images[swapIdx];

    await supabase.from("gallery_images").update({ sort_order: swapWith.sort_order }).eq("id", current.id);
    await supabase.from("gallery_images").update({ sort_order: current.sort_order }).eq("id", swapWith.id);

    loadImages();
  }

  return (
    <>
      {/* Form shtimi */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-[#E8E0D4] p-6 md:p-8 mb-10"
      >
        <h2 className="text-lg font-serif font-semibold text-[#1C1410] mb-6 pb-4 border-b border-[#E8E0D4]">
          Shto Foto në Galeri
        </h2>

        <div className="mb-4">
          <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
            Kategoria
          </label>
          <select
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border border-[#E8E0D4] rounded-md px-3 py-2.5 outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all bg-white"
          >
            <option value="">— Zgjidh kategorinë —</option>
            {galleryCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#1C1410]/40 mt-1.5">
            Kjo kategori do t'u vendoset automatikisht të gjitha fotove që zgjedh më poshtë (mund t'i ndryshosh individualisht).
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-medium text-[#1C1410]/60 uppercase tracking-wider mb-1.5">
            Foto (mund të zgjedhësh disa njëherësh)
          </label>

          <label
            htmlFor="gallery-file-input"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8E0D4] rounded-md py-8 cursor-pointer hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1C1410" strokeOpacity="0.4" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span className="text-sm text-[#1C1410]/60">
              {compressing ? "Duke përpunuar fotot..." : "Kliko për të zgjedhur një ose disa foto"}
            </span>
            <span className="text-xs text-[#1C1410]/40">JPG, PNG deri në disa MB — do të komprimohen automatikisht</span>
            <input
              id="gallery-file-input"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
              disabled={compressing}
              className="hidden"
            />
          </label>

          {pending.length > 0 && (
            <div className="mt-5 space-y-3">
              {pending.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border border-[#E8E0D4] rounded-md p-3"
                >
                  <img
                    src={p.previewUrl}
                    alt="Parapamje"
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      value={p.alt}
                      onChange={(e) => updatePendingField(i, "alt", e.target.value)}
                      placeholder="Përshkrimi"
                      className="border border-[#E8E0D4] rounded-md px-3 py-1.5 text-sm outline-none focus:border-[#C9A84C]"
                    />
                    <select
                      value={p.span}
                      onChange={(e) => updatePendingField(i, "span", e.target.value)}
                      className="border border-[#E8E0D4] rounded-md px-3 py-1.5 text-sm outline-none focus:border-[#C9A84C] bg-white"
                    >
                      {spanOptions.map((s) => (
                        <option key={s.label} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePending(i)}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-[#1C1410]/40 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                    aria-label="Hiq foton"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading || compressing || pending.length === 0}
          className="w-full bg-[#1C1410] text-[#C9A84C] py-3.5 rounded-md font-medium tracking-wide hover:bg-[#C9A84C] hover:text-[#1C1410] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Duke ruajtur {pending.length} foto...
            </>
          ) : pending.length > 0 ? (
            `Shto ${pending.length} Foto`
          ) : (
            "Shto Foto"
          )}
        </button>
      </form>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-serif font-semibold text-[#1C1410]">Foto në Galeri</h2>
        <span className="text-xs font-medium text-[#C9A84C] bg-[#1C1410] rounded-full px-3 py-1">
          {images.length}
        </span>
      </div>

      {loading ? (
        <p className="text-[#1C1410]/50 text-sm">Duke ngarkuar...</p>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-[#E8E0D4]">
          <p className="text-[#1C1410]/40 text-sm">Ende nuk ka foto të shtuara.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="bg-white rounded-lg overflow-hidden border border-[#E8E0D4] shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={img.src} alt={img.alt} className="w-full aspect-square object-cover" />
              <div className="p-4">
                <p className="font-semibold text-[#1C1410] text-sm">{img.alt}</p>
                <p className="text-xs text-[#1C1410]/50 mb-3">
                  {spanOptions.find((s) => s.value === img.span)?.label || "Normale"}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveImage(img.id, "up")}
                      disabled={i === 0}
                      className="text-[#1C1410]/50 hover:text-[#1C1410] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Lëviz lart"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveImage(img.id, "down")}
                      disabled={i === images.length - 1}
                      className="text-[#1C1410]/50 hover:text-[#1C1410] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Lëviz poshtë"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors flex items-center gap-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                    Fshi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}