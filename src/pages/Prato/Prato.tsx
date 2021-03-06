import React, { useState } from 'react';
import styles from './Prato.module.scss';
import stylesTema from 'assets/styles/Tema.module.scss';
import cardapio from 'assets/db.json';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import NotFound from 'pages/NotFound/NotFound';

const Prato = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //const {state} = useLocation();
  //const { prato } = state as { prato: typeof cardapio.itens[0]};

  const prato = cardapio.itens.find((item) => item.id.toString() === id);
  if (!prato) {
    return <NotFound />;
  }

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className={styles.voltar}
      >
        {'< Voltar'}
      </button>
      <section className={styles.container}>
        <h1 className={styles.titulo}>{prato.title}</h1>
        <div className={styles.imagem}>
          <img src={prato.photo} alt={prato.title} />
        </div>
        <div className={styles.conteudo}>
          <p className={styles.conteudo__descricao}>{prato.description}</p>
          <div className={styles.tags}>
            <div
              className={classNames({
                [styles.tags__tipo]: true,
                [styles[`tags__tipo__${prato.category.label.toLowerCase()}`]]:
                  true,
              })}
            >
              {prato.category.label}
            </div>
            <div className={styles.tags__porcao}>{prato.size}g</div>
            <div className={styles.tags__qtdpessoas}>
              Serve {prato.serving} pessoa{prato.serving == 1 ? '' : 's'}
            </div>
            <div className={styles.tags__valor}>
              R$ {prato.price.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Prato;
