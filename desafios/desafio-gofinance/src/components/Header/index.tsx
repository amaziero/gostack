import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { pathname } = useLocation();
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <span className={pathname === '/' ? 'selectede' : ''}>
            <Link to="/">Listagem</Link>
          </span>

          <span className={pathname === '/import' ? 'selected' : ''}>
            <Link to="/import">Importar</Link>
          </span>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
