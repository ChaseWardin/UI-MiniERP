import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../services/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [newName, setNewName] = useState("");

  const printProducts = async () => {
    const products = await getProducts();
  }

  const handleAdd = async () => {
    const newProduct = await addProduct({ name: newName });
    setProducts([...products, newProduct]);
    setNewName("");
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h1>Productos</h1>

      {/* Add product */}
      <input
        type="text"
        placeholder="Nombre del producto"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleAdd}>Añadir</button>

      {/* Products table */}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                {/* Puedes agregar editar aquí */}
              </td>
            </tr>
          ))}
        </tbody>
        <button >Limpiar lista</button>
      </table>
    </div>
  );
}
