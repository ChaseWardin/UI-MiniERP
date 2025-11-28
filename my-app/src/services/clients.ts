import { API_CONFIG } from "../config/api.ts"

export async function getClients() {
  const token = localStorage.getItem("token");
  const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CLIENTS, {
    headers: { 
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}` },
  });
  if(!response.ok) throw new Error("Error al obtener clientes");
  return response.json();
}

export async function getClientsById(id : number) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CLIENTS + `${id}/`, {
        headers : {
            Authorization : `Bearer ${token}`
        },     
    });
    if(!response.ok) throw new Error ("No se pudo obtener el cliente");
    return response.json();
}

export async function addClient(client: any) {
    const token = localStorage.getItem("token");
    return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CLIENTS , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(client),
    }).then((res) => res.json());
}

export async function updateClient(id: number, client: any) {
  const token = localStorage.getItem("token");
  return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CLIENTS + `${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(client),
  }).then((res) => res.json());
}

export async function deleteClient(id: number) {
  const token = localStorage.getItem("token");
  return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CLIENTS + `${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}