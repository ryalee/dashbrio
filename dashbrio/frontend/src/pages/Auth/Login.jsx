import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient"
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if (token) {
        // Armazena o token no localStorage
        login(token);
        console.log("Token JWT salvo:", token);

        // Exemplo de chamada para backend protegido
        const response = await fetch("http://localhost:3001/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const perfil = await response.json();
        console.log("Dados protegidos:", perfil);

        alert("Login efetuado com sucesso");
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Entrar</button>
      <br />
      <Link to="/signup">Criar conta</Link>
    </div>
  );
}
