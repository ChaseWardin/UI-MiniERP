import { API_CONFIG } from "../config/api.ts"

export async function getProducts() {
  const token = localStorage.getItem("token");
  const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PRODUCTS, {
    headers: { 
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function getProductsById(id : number) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PRODUCTS + `${id}/`, {
        headers : {
            Authorization : `Bearer ${token}`
        },     
    });
    return response.json();
}

export async function addProduct(product: any) {
    const token = localStorage.getItem("token");
    return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PRODUCTS , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export async function updateProduct(id: number, product: any) {
  const token = localStorage.getItem("token");
  return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PRODUCTS + `${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export async function deleteProduct(id: number) {
  const token = localStorage.getItem("token");
  return fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PRODUCTS + `${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}