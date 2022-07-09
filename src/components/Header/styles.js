import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  grid-area: header;

  height: 105px;
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 80px;
`

export const Profile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;

  > img {
    // isso fara que so pegue a imagem que esta dentro desse componente
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    // aqui só esta aplicando para as divs que estão aqui dento do profile
    display: flex;
    flex-direction: column;
    line-height: 24px;

    span {
      // dentro dessa div tem uma span
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    strong {
      // dentro dessa div tem um strong
      font-size: 18px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`

export const Logout = styled(Link)`
  border: none;
  background: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 36px;
  }
`
