import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  // Estado para edición
  const [isEditing, setIsEditing] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.results || []);
    };
    fetchProducts();
  }, []);

  const handleSetAdd = () => {
    setIsAdd(true);
  };

  const handleAdd = async () => {
    const newProduct = await addProduct({
      name: newName,
      price: newPrice,
      stock_quantity: newQuantity,
    });

    setProducts([...products, newProduct]);
    setNewName("");
    setNewPrice(0);
    setNewQuantity(0);
    setIsAdd(false);
  };

 const handleDelete = async (id: number) => {
  const confirmed = window.confirm("¿Seguro que quieres eliminar este producto?");
  if (!confirmed) return;

  try {
    const result = await deleteProduct(id);

    setProducts(products.filter((p) => p.id !== id));

  } catch (error) {
    console.error("Error en handleDelete:", error);
    alert("Ocurrió un error inesperado. Mira la consola.");
  }
};

  const handleEdit = (product: any) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditQuantity(product.stock_quantity);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editId) return;

    const updated = await updateProduct(editId, {
      name: editName,
      price: editPrice,
      stock_quantity: editQuantity,
    });

    setProducts(products.map((p) => (p.id === editId ? updated : p)));
    setIsEditing(false);
  };

  return (
    <div className="w-full ml-4">
      <div className="flex items-center mb-8 mt-6">
        <h1 className="text-4xl font-semibold text-white">Productos</h1>
        <button
          onClick={handleSetAdd}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 ml-8"
        >
          Añadir
        </button>
      </div>
      <table className="w-full text-left text-slate-100">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="w-1/5 text-center">ID</th>
            <th className="w-1/5 text-center">Nombre</th>
            <th className="pw-1/5 text-center">Precio</th>
            <th className="w-1/5 text-center">Cantidad</th>
            <th className="w-1/5 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-slate-800">
              <td className="py-2 text-center">{p.id}</td>
              <td className="py-2 text-center">{p.name}</td>
              <td className="py-2 text-center">{p.price}</td>
              <td className="py-2 text-center">{p.stock_quantity}</td>
              <td className="py-2 space-x-2 text-center">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*Modal para editar*/}
      {/* Modal Editar */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Editar producto
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-300">Nombre</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nombre del producto"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-300">Precio</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  placeholder="Precio"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-300">Stock</label>
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(Number(e.target.value))}
                  placeholder="Cantidad"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-100 hover:bg-slate-600 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar */}
      {isAdd && (
        <div
          id="productoId"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Añadir producto
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-300">Nombre</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Teclado mecánico"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-300">Precio</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  placeholder="Ej: 150000"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-slate-300">Cantidad en stock</label>
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(Number(e.target.value))}
                  placeholder="Ej: 20"
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAdd(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-100 hover:bg-slate-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
