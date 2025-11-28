import { useState } from "react";
import { loginAndGetProfile } from "../services/authent.ts";
import { useNavigate } from "react-router-dom";
import styles from './login.module.css';

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
    <div className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Iniciar Sesion</h2>
        {error && <p className={styles.error}>Usuario o contraseña incorrecta</p>}
        <div className={styles.seccion}>
          <label>Correo electronico:</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Ej: nombre@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.seccion}>
          <label>Contraseña:</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Ingrese su contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className={styles.button} type="submit">Ingresar</button>
      </form>
    </div>
  );
}
