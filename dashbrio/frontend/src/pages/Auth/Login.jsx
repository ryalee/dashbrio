import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({email, password});

    if (error) {
      alert(error.message);
    } else {
      alert("Login efetuado com sucesso");
    }
  }

  return (
    <div>
      <input 
        type="email" 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        placeholder="senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>

      <Link to="/signup"/>
    </div>
  )
}