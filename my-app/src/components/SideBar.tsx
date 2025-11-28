import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authent';
export default function SideBar({ onSelect }: { onSelect: (option: string) => void }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <div className="min-h-screen w-64 bg-slate-950 text-white flex flex-col p-6 bg-gradient-to-b from-[#1a2642] to-[#0f1729]">
            <h1 className="text-4xl font-bold mb-16 text-center">MiniERP</h1>
            <nav className="flex flex-col gap-3">
                <button
                    onClick={() => onSelect("producto")}
                    className="text-center hover:bg-slate-800 p-2 rounded bg-transparent"
                >
                    Producto
                </button>

                <button
                    onClick={() => onSelect("venta")}
                    className="text-center hover:bg-slate-800 p-2 rounded bg-transparent"
                >
                    Venta
                </button>
            </nav>
            <button
                onClick={handleLogout}
                className="mt-auto text-center text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2 rounded"
            >
                Cerrar sesión
            </button>
        </div>
    );
}
