import { useEffect, useState } from "react";
// Importamos solo las funciones necesarias de nuestro nuevo servicio de ventas
import { 
  getVentas, 
  addVenta, 
  deleteVenta, 
} from "../services/ventas";
import { useNavigate } from "react-router-dom";

// Cambiamos el nombre del componente de ClientsPage a VentasPage
export default function VentasPage() {
  const navigate = useNavigate();
  
  // Estado principal: la lista de ventas
  const [ventas, setVentas] = useState<any[]>([]);
  
  // Variables para la NUEVA VENTA: (ID del Producto y Cantidad)
  const [newProductId, setNewProductId] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  
  // Estado para la adición
  const [isAdd, setIsAdd] = useState(false);
  
  // Nota: Eliminamos todos los estados de edición (editId, editName, etc.) ya que las ventas solo se anulan, no se editan.

  // Cargar ventas al iniciar
  useEffect(() => {
    const fetchVentas = async () => {
      // Llama a la función del servicio de ventas
      const data = await getVentas();
      //console.log(data.results);
      setVentas(data.results || data || []);
    };
    fetchVentas();
  }, []); // [ ] asegura que se ejecute una sola vez al cargar

  const handleSetAdd = async () =>{
    setIsAdd(true);
  }

  const handleAdd = async () => {
	// Validamos que haya datos mínimos
	if(!newProductId || newQuantity < 1) {
		alert("ID de producto y cantidad son obligatorios.");
		return;
	}
	
	// Llamamos a la función para agregar la venta con los datos del producto
    const newVenta = await addVenta({ product_id: newProductId, quantity: newQuantity });
    setVentas([...ventas, newVenta]); // Agregamos la venta a la lista local
    
	// Limpiamos los campos y cerramos el modal
    setNewProductId("");
    setNewQuantity(1);
	setIsAdd(false);
  };

  const handleDelete = async (id: number) => {
	if(!confirm("¿Anular esta venta?")) return;
	// Llama a la función para eliminar la venta por su ID
    await deleteVenta(id);
    setVentas(ventas.filter(v => v.id !== id)); // Filtramos la lista para quitar el registro
  };

  // Eliminamos completamente la función handleEdit y handleSaveEdit
  
  const handleBack = async () => {
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Registro de Ventas</h1>
      <button onClick={handleSetAdd}>Nueva Venta</button>
      <button onClick={handleBack}>Volver</button>

      {/* Tabla de ventas */}
      <table border={1} cellPadding={10} style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Total ($)</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {/* Mapeamos sobre la lista de ventas */}
          {ventas.map(v => (
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>{v.created_at || "---"}</td> {/* Usamos el campo de fecha o creación */}
            <td>${v.total_amount || v.total || "---"}</td> {/* Mostramos el total */}
            <td>
            <button onClick={() => handleDelete(v.id)}>Anular</button></td>
          </tr>
          ))}
        </tbody>
      </table>

      {/* Eliminamos el bloque de Edit Modal completo ya que las ventas no se editan. */}
      {/* El bloque que empieza con {isEditing && ...} ya no existe aquí. */}

      {/* Add Modal - Ahora para registrar la Venta */}
      {isAdd  && (
        <div id="modalVenta" style={{
          position: "fixed", 
          top: "30%", 
          left: "30%", 
          background: "white", 
          padding: "20px", 
          border: "1px solid black"
        }}>
          <h3>Registrar Venta</h3>
          <label style={{display: 'block'}}>ID Producto:</label>
          <input 
			type="number"
            value={newProductId}
			placeholder="ID del producto vendido (ej: 5)"
            onChange={(e) => setNewProductId(e.target.value)}
          />
          <label style={{display: 'block', marginTop: '10px'}}>Cantidad:</label>
          <input 
			type="number"
			min="1"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
          />
          <br />
          <button onClick={handleAdd}>Confirmar</button>
          <button onClick={() => setIsAdd(false)} style={{marginLeft: '10px'}}>Cancelar</button>
        </div>
      )}
    </div>
  );
}