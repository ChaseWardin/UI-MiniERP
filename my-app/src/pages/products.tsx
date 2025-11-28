import { useEffect, useState } from "react";
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
} from "../services/products";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const navigate = useNavigate();
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
      //console.log(data.results);
      setProducts(data.results || []);
    };
    fetchProducts();
  }, []);

  const handleSetAdd = async () =>{
    setIsAdd(true);
  }

  const handleAdd = async () => {
    console.log(`${newName},${newPrice},${newQuantity}`);
    const newProduct = await addProduct({ name: newName, price: newPrice, stock_quantity: newQuantity });
    setProducts([...products, newProduct]);
    setNewName("");
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
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
    const updated = await updateProduct(editId, { name: editName, price: editPrice, stock_quantity: editQuantity  });

    setProducts(products.map(p => p.id === editId ? updated : p));
    setIsEditing(false);
  };

  const handleBack = async () => {
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Productos</h1>
      <button onClick={handleSetAdd}>Añadir</button>
      <button onClick={handleBack}>Volver</button>

      {/* Products table */}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td><button onClick={() =>handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button></td>
          </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditing && (
        <div style={{
          position: "fixed", 
          top: "30%", 
          left: "30%", 
          background: "white", 
          padding: "20px", 
          border: "1px solid black"
        }}>
          <h3>Editar producto</h3>
          <input 
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input 
            value={editPrice}
            onChange={(e) => setEditPrice(Number(e.target.value))}
          />
          <input 
            value={editQuantity}
            onChange={(e) => setEditQuantity(Number(e.target.value))}
          />
          <br />
          <button onClick={handleSaveEdit}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      )}

      {/* Add Modal */}
      {isAdd  && (
        <div id="productoId" style={{
          position: "fixed", 
          top: "30%", 
          left: "30%", 
          background: "white", 
          padding: "20px", 
          border: "1px solid black"
        }}>
          <h3>Editar producto</h3>
          <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input 
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
          />
          <input 
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
          />
          <br />
          <button onClick={handleAdd}>Guardar</button>
          <button onClick={() => setIsAdd(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
