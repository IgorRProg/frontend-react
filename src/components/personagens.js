import React, { useState } from 'react';
import Missoes from './missoes';
import '../App.css';

import cavaleiroMasc from '../images/cavaleiro-masc.jpeg';
import cavaleiroFem from '../images/cavaleiro-fem.jpeg';
import magoMasc from '../images/mago-masc.jpeg';
import magoFem from '../images/mago-fem.jpeg';
import arqueiroMasc from '../images/arqueiro-masc.jpeg';
import arqueiroFem from '../images/arqueiro-fem.jpeg';

function Personagens({ personagens }) {
  const [selectedPersonagem, setSelectedPersonagem] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState('masculino');
  const [missaoCarregada, setMissaoCarregada] = useState(false);
  const [descricaoPersonagem, setDescricaoPersonagem] = useState('');

  const handleSelectPersonagem = (personagem, descricao) => {
    setSelectedPersonagem(personagem);
    setDescricaoPersonagem(descricao);
    setMissaoCarregada(false);
  };

  const handleCarregarMissoes = () => {
    setMissaoCarregada(true);
  };

  const handleVoltarParaPersonagens = () => {
    setSelectedPersonagem(null);
    setMissaoCarregada(false);
  };

  const handleImageMouseEnter = (personagem) => {
    setDescricaoPersonagem(exibirDescricaoPersonagem(personagem));
  };

  const handleImageMouseLeave = () => {
    setDescricaoPersonagem('');
  };

  function getImagePath(personagem) {
    switch (personagem) {
      case 'Cavaleiro':
        return selectedSexo === 'masculino' ? cavaleiroMasc : cavaleiroFem;
      case 'Mago':
        return selectedSexo === 'masculino' ? magoMasc : magoFem;
      case 'Arqueiro':
        return selectedSexo === 'masculino' ? arqueiroMasc : arqueiroFem;
      default:
        return '';
    }
  }

  return (
    <div>
      {selectedPersonagem ? (
        <div className='personagem'>
          <h3>Personagem selecionado: {selectedPersonagem}</h3>
          <button onClick={handleCarregarMissoes}>Visualizar Missões</button>
          <button onClick={handleVoltarParaPersonagens}>Voltar para Personagens</button>
          {missaoCarregada && <Missoes onBack={handleVoltarParaPersonagens} />}
        </div>
      ) : (
        
    <div className='selecao-personagem'>
      <h2>Selecione seu personagem</h2>
      <h3>Selecione o sexo:</h3>
      <select value={selectedSexo} onChange={(e) => setSelectedSexo(e.target.value)}>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>
          <ul>
            {personagens.map((personagem, index) => (
              <div className="li-wrapper" key={index}>
                <li
                  onMouseEnter={() => handleImageMouseEnter(personagem)}
                  onMouseLeave={handleImageMouseLeave}
                  onClick={() => handleSelectPersonagem(personagem, exibirDescricaoPersonagem(personagem))}
                  className="nome-personagem"
                >
                  <img
                    src={getImagePath(personagem)}
                    alt={`${personagem} ${selectedSexo}`}
                    className="personagem-img"
                  />
                  {personagem}
                </li>
                {descricaoPersonagem &&
                  <p className="descricao">
                    {descricaoPersonagem}
                  </p>
                }
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Personagens;

function exibirDescricaoPersonagem(personagem) {
  const caracteristicas = {
    "Cavaleiro": { "Ataque": 10, "Defesa": 9, "Mágica": 1, "Destreza": 8 },
    "Mago": { "Ataque": 4, "Defesa": 4, "Mágica": 10, "Destreza": 8 },
    "Arqueiro": { "Ataque": 9, "Defesa": 7, "Mágica": 5, "Destreza": 10 }
  };

  const descricoes = {
    "Cavaleiro": "O cavaleiro é poderoso no combate corpo a corpo, com uma boa defesa e pouca habilidade em mágica.",
    "Mago": "Um feiticeiro poderoso que domina as artes mágicas. Apesar de sua fragilidade física, o mago é capaz de lançar feitiços devastadores e controlar a magia com maestria.",
    "Arqueiro": "Um especialista em combate à distância, habilidoso com o arco e flecha. O arqueiro é ágil e evasivo, capaz de causar danos precisos e letais a seus inimigos."
  };

  if (personagem in caracteristicas) {
    let descricao = `Descrição de ${personagem}:\n${descricoes[personagem]}\n`;
    for (const [caracteristica, valor] of Object.entries(caracteristicas[personagem])) {
      descricao += `${caracteristica}: ${valor}\n`;
    }
    return descricao;
  } else {
    return "Personagem não encontrado.";
  }
}