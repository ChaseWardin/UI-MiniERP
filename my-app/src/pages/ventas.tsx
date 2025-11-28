import { useEffect, useState } from "react";
import { getVentas, addVenta, deleteVenta } from "../services/ventas";
import { getProducts } from "../services/products";
import { getClients,getClientsById } from "../services/clients";

export default function VentasPage() {
	const [ventas, setVentas] = useState<any[]>([]);
	const [newProductId, setNewProductId] = useState(0);
	const [newClientId, setNewClientId] = useState(0);
	const [newQuantity, setNewQuantity] = useState<number>(1);
	const [newPrice, setNewPrice] = useState<number>(0);

	const [products, setProducts] = useState<any[]>([]);
	const [clients, setClients]  = useState<any[]>([]); 

	const [isAdd, setIsAdd] = useState(false);

	// Cargar ventas al iniciar
	useEffect(() => {
		const fetchVentas = async () => {
			const dataC = await getClients();
			setClients(dataC.results || []);

			const dataP = await getProducts();
			setProducts(dataP.results || []);

			const data = await getVentas();
			console.log(data.results);
			setVentas(data.results || []);
		};
		fetchVentas();
	}, []);

	const handleSetAdd = () => {
		setIsAdd(true);
	};

	const handleAdd = async () => {
		if (!newProductId || newQuantity < 1) {
			alert("ID de producto y cantidad son obligatorios.");
			return;
		}
		const client = await getClientsById(newClientId);

		const newVenta = await addVenta({
			costumer: client,
			product_id: newProductId,
			quantity: newQuantity, 
			price: newPrice,
		});

		setVentas([...ventas, newVenta]);
		setNewProductId(0);
		setNewQuantity(1);
		setIsAdd(false);
	};

	const handleDelete = async (id: number) => {
		if (!confirm("¿Anular esta venta?")) return;

		await deleteVenta(id);
		setVentas(ventas.filter((v) => v.id !== id));
	};

	return (
		<div className="w-full ml-4">
			{/* Header */}
			<div className="flex items-center mb-8 mt-6">
				<h1 className="text-4xl font-semibold text-white">Ventas</h1>
				<button
					onClick={handleSetAdd}
					className="px-4 py-2 rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 ml-8"
				>
					Nueva venta
				</button>
			</div>

			{/* Tabla de ventas */}
			<table className="w-full text-left text-slate-100">
				<thead>
					<tr className="border-b border-slate-700">
						<th className="w-1/4 text-center">ID Venta</th>
						<th className="w-1/4 text-center">Fecha Orden</th>
						<th className="w-1/4 text-center">Fecha Envio</th>
						<th className="w-1/4 text-center">Cliente</th> 
						<th className="w-1/4 text-center">Cantidad</th>
						<th className="w-1/4 text-center">Precio ($)</th>
						<th className="w-1/4 text-center">Acciones</th>
					</tr>
				</thead>

				<tbody>
					{ventas.map((v,index) => (
						<tr key={index} className="border-b border-slate-800">
							<td className="py-2 text-center">{v.id}</td>
							<td className="py-2 text-center">
								{v.order_date ? String(v.order_date).slice(0, 10) : "---"}
							</td>
							<td className="py-2 text-center">
								{v.delivery_date ? String(v.delivery_date).slice(0, 10) : "---"}
							</td>
							<td className="py-2 text-center">
								{v.customer_id?.name ? String(v.customer_id.name).slice(0, 10) : "---"}
							</td>
							<td className="py-2 text-center">
								{v.items?.[0]?.quantity ??  "0"}
							</td>
							<td className="py-2 text-center">
								{v.items?.[0]?.unit_price ?? "0"}
							</td>
							<td className="py-2 text-center">
								<button
									onClick={() => handleDelete(v.id)}
									className="px-3 py-1 rounded bg-red-600 hover:bg-red-500"
								>
									Anular
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modal para registrar venta */}
			{isAdd && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
					<div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6">
						<h3 className="text-xl font-semibold text-white mb-4">
							Registrar venta
						</h3>

						<div className="space-y-4 mb-6">
							<div className="flex flex-col gap-1">
								<label className="text-sm text-slate-300">Producto</label>
								<select
									value={newProductId}
									onChange={(e) => {
										setNewProductId(Number(e.target.value))
										const id = Number(e.target.value);

										const product = products.find(p => p.id === id);
    									setNewPrice(product ? Number(product.price) : 0);
										}		
									}
									className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
							    <option value="">Seleccione un producto...</option>
								{products.map((p) => (
    								<option key={p.id} value={p.id}>
      									{p.name}
    								</option>
  								))}
								</select>
							</div>

							<div className="flex flex-col gap-1">
								<label className="text-sm text-slate-300">Cantidad</label>
								<input
									type="number"
									min={1}
									value={newQuantity}
									onChange={(e) => setNewQuantity(Number(e.target.value))}
									className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="flex flex-col gap-1">
								<label className="text-sm text-slate-300">Cliente</label>
								<select
									value={newClientId}
									onChange={(e) => setNewClientId(Number(e.target.value))}
									className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
							    <option value="">Seleccione un cliente...</option>
								{clients.map((c) => (
    								<option key={c.id} value={c.id}>
      									{c.name}
    								</option>
  								))}
								</select>
							</div>

							<div className="flex flex-col gap-1">
  								<label className="text-sm text-slate-300">Precio del producto</label>
  								<input
    								type="number"
    								value={newPrice}
    								readOnly
    								className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100"
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
								Confirmar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
