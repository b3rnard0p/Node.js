import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const API_AUTH = import.meta.env.VITE_API_AUTH || 'http://localhost:3002';
  const API_NOTES = import.meta.env.VITE_API_NOTES || 'http://localhost:3003';

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_AUTH}/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert('Erro no login');
    }
  };

  const fetchNotes = async () => {
    const res = await axios.get(`${API_NOTES}/notes`, {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    await axios.post(
      `${API_NOTES}/notes`,
      { content: newNote },
      {
        headers: { Authorization: token },
      },
    );
    setNewNote('');
    fetchNotes();
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const inputClass =
    'w-full rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-2';

  const btnPrimary =
    'rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900';

  const btnGhost =
    'rounded-lg border border-slate-600 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:bg-slate-800';

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-black/40">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-emerald-400/90">
            Microserviços UFN
          </p>
          <h1 className="mt-2 text-center text-2xl font-semibold text-slate-50">Login</h1>
          <p className="mt-1 text-center text-sm text-slate-400">Entre com seu e-mail e senha</p>
          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">E-mail</label>
              <input
                type="email"
                className={inputClass}
                placeholder="seu@email.com"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Senha</label>
              <input
                type="password"
                className={inputClass}
                placeholder="••••••••"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button type="button" className={`${btnPrimary} mt-2 w-full`} onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-50">Minhas notas</h1>
            <p className="text-xs text-slate-500">Notas colaborativas</p>
          </div>
          <button
            type="button"
            className={btnGhost}
            onClick={() => {
              localStorage.clear();
              setToken(null);
            }}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg">
          <label className="mb-2 block text-xs font-medium text-slate-400">Nova nota</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={newNote}
              className={`${inputClass} flex-1`}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Escreva algo..."
            />
            <button type="button" className={`${btnPrimary} shrink-0 sm:px-6`} onClick={addNote}>
              Salvar
            </button>
          </div>
        </div>

        <ul className="mt-8 space-y-3">
          {notes.length === 0 ? (
            <li className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 py-10 text-center text-sm text-slate-500">
              Nenhuma nota ainda. Crie a primeira acima.
            </li>
          ) : (
            notes.map(note => (
              <li
                key={note._id}
                className="rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm leading-relaxed text-slate-200"
              >
                {note.content}
              </li>
            ))
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
