import './EstrelaInput.css';

// Implementado como um grupo de radio buttons (fieldset + legend) em vez de
// apenas ícones clicáveis: garante operação por teclado, leitura correta por
// leitores de tela ("Nota 4 de 5") e não depende só da cor para indicar a
// nota selecionada.
export default function EstrelaInput({ nome, rotulo, valor, aoAlterar, obrigatorio = true }) {
  return (
    <fieldset className="campo estrela-fieldset">
      <legend>
        {rotulo} {obrigatorio && <span aria-hidden="true">*</span>}
      </legend>
      <div className="estrela-grupo" role="radiogroup" aria-label={rotulo}>
        {[1, 2, 3, 4, 5].map((n) => {
          const id = `${nome}-${n}`;
          return (
            <span key={n} className="estrela-opcao">
              <input
                type="radio"
                id={id}
                name={nome}
                value={n}
                checked={Number(valor) === n}
                onChange={() => aoAlterar(n)}
                required={obrigatorio}
              />
              <label htmlFor={id}>
                <span aria-hidden="true">★</span>
                <span className="visually-hidden">Nota {n} de 5</span>
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}
