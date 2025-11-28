import { useState } from "react";
import Sidebar from "../components/SideBar";
import ProductsPage from "../pages/products.tsx";
import VentasPage from "../pages/ventas.tsx";

export default function Dashboard() {
  const [option, setOption] = useState("producto");
  return (
    <div className="flex min-h-screen">
      <Sidebar onSelect={setOption} />
      <div className="flex-1 bg-slate-900">
        {option === "producto" && <ProductsPage />}
        {option === "venta" && <VentasPage />}
      </div>
    </div>
  );
}
