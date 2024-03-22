import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Missoes() {
  const [descricaoMissao, setDescricaoMissao] = useState('');
  const [progresso] = useState([30, 0, 100]);

  return (
    <div>
      <h2>Missões</h2>
      <div className="missao-lista">
        <ul>
          <li
            onMouseEnter={() => setDescricaoMissao('Embarque em uma jornada para derrotar o temível dragão que ameaça o Monte da Perdição.')}
            onMouseLeave={() => setDescricaoMissao('')}
          >
            Temível Dragão no Monte da Perdição (Difícil) <ProgressBar now={progresso[0]} />
          </li>
          <li
            onMouseEnter={() => setDescricaoMissao('Aventure-se na Floresta Encantada e recupere a lendária Espada Mítica, perdida há séculos.')}
            onMouseLeave={() => setDescricaoMissao('')}
          >
            Espada Mítica na Floresta Encantada (Moderada) <ProgressBar now={progresso[1]} />
          </li>
          <li
            onMouseEnter={() => setDescricaoMissao('Explore os abismos sombrios e desafiadores em busca do tesouro perdido que repousa no Abismo Sem Fim.')}
            onMouseLeave={() => setDescricaoMissao('')}
          >
            Tesouro Perdido no Abismo Sem Fim (Fácil) <ProgressBar now={progresso[2]} />
          </li>
        </ul>
      </div>
      <div className="descricao-missao" style={{display: descricaoMissao ? 'block' : 'none'}}>
        <p>{descricaoMissao}</p>
      </div>
    </div>
  );
}

export default Missoes;