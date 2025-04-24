import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({username, email, password});

    if (error) {
      alert(error.message);
    } else {
      alert('Conta criada, seja bem-vindo! :)');
    }
  }

  return (
    <div className="flex flex-col gap-2 max-w-sm mx-auto p-4">
      <input 
        type="text" 
        placeholder="Nome de usuário"

        onChange={(e) => setUsername(e.target.value)}
      />
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

      <button onClick={handleSignUp}>
        Criar Conta
      </button>
    </div>
  )
}