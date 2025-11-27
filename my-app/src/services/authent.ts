import { API_CONFIG } from "../config/api.ts";

interface LoginResponse {
  access_token: string;
}

interface ROL {
  name : string;
}

interface UserProfile {
  id: number;
  email: string;
  full_name: string;
  role: ROL;
}

/**
 * Hace login y devuelve token
 */
export async function loginAndGetProfile(email: string,password: string) : Promise<{ token: string; profile: UserProfile }> {
  console.log(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN);
  const loginResponse = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!loginResponse.ok) {
    const errorText = await loginResponse.text();
    throw new Error("Error de login: " + errorText);
  }

  const data: LoginResponse = await loginResponse.json();
  const token = data.access_token;

  localStorage.setItem("token", token);

  const profileResponse = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.PROFILE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!profileResponse.ok) {
    const errorText = await profileResponse.text();
    throw new Error("Error al obtener perfil: " + errorText);
  }

  const profile: UserProfile = await profileResponse.json();

  return { token, profile };
}
