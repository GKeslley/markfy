import React from 'react';
import Logo from './Header/Logo';
import styles from '../Css/Footer.module.css';
import { Link } from 'react-router-dom';
import Input from './Form/Input';
import Button from './Reusable/Button';
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className={`${styles['footer-bg']}`}>
      <article className={`${styles.footer}`}>
        <div className={styles['personal-infos']}>
          <Logo />
          <ul className={styles.logo}>
            <li>
              <Link to="instagram.com">
                <AiFillInstagram />
              </Link>
            </li>
            <li>
              <Link to="linkedin.com">
                <AiFillLinkedin />
              </Link>
            </li>
            <li>
              <Link to="github.com">
                <AiFillGithub />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p>Produtos</p>
          <ul>
            <li>
              <Link to="/conta/produto/categoria">Adicionar Produto</Link>
            </li>
            <li>
              <Link to="/conta/anuncios">Meus Anúncios</Link>
            </li>
            <li>
              <Link to="/favoritos">Favoritos</Link>
            </li>
          </ul>
        </div>

        <div>
          <p>Usuário</p>
          <ul>
            <li>
              <Link to="/conta/perfil">Perfil</Link>
            </li>
            <li>
              <Link to="/conta/endereco">Endereço</Link>
            </li>
            <li>
              <Link to="/conta/configuracoes">Configurações</Link>
            </li>
          </ul>
        </div>

        <div>
          <Input label="Newsletter" name="newsletter" />
          <Button>Inscrever</Button>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
