import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Personagens from './components/personagens';
import './App.css';
import backgroundMusic from './music/musica.mp3';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [personagens] = useState(['Cavaleiro', 'Mago', 'Arqueiro']);
  const [audio] = useState(new Audio(backgroundMusic));
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    audio.loop = true;
    if (musicOn) {
      audio.play().catch(error => console.error("Erro ao reproduzir música:", error));
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [audio, musicOn]);

  useEffect(() => {

    if (musicOn) {
      audio.play().catch(error => console.error("Erro ao reproduzir música:", error));
    }
  }, [audio, musicOn]);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Nome de usuário ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const toggleMusic = () => {
    setMusicOn(!musicOn);
  };

  return (
    <div className="app">
      <Helmet>
        <title>Craftage</title>
        <link rel="icon" href="/icon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      {loggedIn ? (
        <div>
          <h1>Trilhe bons caminhos em sua jornada</h1>
          <Personagens personagens={personagens} />
          <button onClick={handleLogout}>Sair</button>
          <button onClick={toggleMusic}>{musicOn ? 'Desligar Música' : 'Ligar Música'}</button>
        </div>
      ) : (
        <div>
          <h1>Inicie sua jornada</h1>
          <div className='usuario'>
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='senha'>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='container'>
            <button onClick={handleLogin}>Entrar</button>
            {error && <p className="mensagem-erro">{error}</p>}
            <button onClick={toggleMusic}>{musicOn ? 'Desligar Música' : 'Ligar Música'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;