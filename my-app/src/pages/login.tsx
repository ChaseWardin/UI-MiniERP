import { useState } from "react";
import { loginAndGetProfile } from "../services/authent.ts";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token, profile } = await loginAndGetProfile(email, password);

      alert(`Bienvenido ${profile.full_name} (${profile.role.name})`);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col items-center justify-center
          w-full max-w-md
          rounded-2xl
          shadow-[0_0_40px_#2563EB]
          bg-slate-900
          gap-10
          px-8 py-10
          bg-gradient-to-b from-[#1a2642] to-[#0f1729]
        "
      >
        <h2 className="text-2xl font-semibold text-white">
          Iniciar sesión
        </h2>

        <div className="flex flex-col w-4/5 gap-2 -mt-2">
          <label className="text-sm text-slate-200">
            Correo electrónico:
          </label>
          <input
            type="email"
            placeholder="Ej: nombre@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              bg-neutral-900
              text-white
              px-3 py-2
              border-2 border-white
              rounded-2xl
              outline-none
              transition
              focus:border-cyan-400
              focus:shadow-[0_10px_40px_#2563EB]
            "
          />
        </div>

        <div className="flex flex-col w-4/5 gap-2 -mt-2">
          <label className="text-sm text-slate-200">
            Contraseña:
          </label>
          <input
            type="password"
            placeholder="Ingrese su contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              bg-neutral-900
              text-white
              px-3 py-2
              border-2 border-white
              rounded-2xl
              outline-none
              transition
              focus:border-cyan-400
              focus:shadow-[0_10px_40px_#2563EB]
            "
          />

          {error && (
            <p className="text-xs text-red-500 mt-1 text-center w-full">
              Usuario o contraseña incorrecta
            </p>
          )}
        </div>

        <button
          type="submit"
          className="
            w-1/2
            bg-blue-600
            text-white
            py-2
            rounded-lg
            text-sm
            font-medium
            cursor-pointer
            transition
            hover:bg-blue-700
            hover:shadow-[0_10px_40px_#2563EB]
            mb-3
          "
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
