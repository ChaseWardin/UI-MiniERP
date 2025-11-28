import { API_CONFIG } from "../config/api.ts"

export async function getVentas() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SALES, { 
        headers: { 
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}` 
        },
    });
    if(!response.ok) {
        throw new Error("Error al obtener ventas");
    }
    return response.json();
}

export async function addVenta(venta: any) {
    const token = localStorage.getItem("token");
    console.log(venta);
    return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SALES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            customer_id: venta.customer,
            order_date: new Date().toISOString().slice(0, 10),
            delivery_date: new Date().toISOString().slice(0, 10),
            notes: "",
            items: [
                {
                    product: venta.product_id,
                    quantity: venta.quantity,
                    unit_price: venta.price
                }
            ]
        }),
    }).then((res) => res.json());
}


export async function deleteVenta(id: number) {
    const token = localStorage.getItem("token");
    return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SALES + `${id}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}