import React from 'react';
import { ExternalLink } from 'react-feather';
import styled from '@emotion/styled';

const StyledLink = styled('a')`
  color: #5c6975;
  text-decoration: none;
  font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
  display: inline-block;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }

  svg {
    // external link icon
    margin-left: 0.5rem;
  }
`;

const StyledFooter = styled.footer`
  padding: 1rem 0;
`;

export const Footer = () => (
  <StyledFooter>
    <p>
      <strong>Все материалы взяты с сайта </strong>
      <StyledLink href="http://ermak.cs.nstu.ru/cprog/html/">
        http://ermak.cs.nstu.ru/cprog/html/
        <ExternalLink size={14} />
      </StyledLink>
    </p>
  </StyledFooter>
);
