import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <aside style={{ width: "250px", background: "#1E293B", color: "white", padding: "20px" }}>
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard/products" style={{ color: "white" }}>Productos</Link></li>
            <li><Link to="/dashboard/customers" style={{ color: "white" }}>Clientes</Link></li>
            <li><Link to="/dashboard/orders" style={{ color: "white" }}>Ventas</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>Bienvenido al Panel</h1>
        <p>Selecciona una opción del menú.</p>
      </main>
    </div>
  );
}
