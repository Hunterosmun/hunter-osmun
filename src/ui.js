import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  background-color: #414141;
  min-height: 100vh;
  display: flex;
  flex-direction: ${p => (p.row ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
  & * {
    font-family: 'Optima', sans-serif;
  }
`

export const Spacer = styled.div`
  flex: 1;
`
export const ButtonWrap = styled.div`
  width: 357px;
  display: flex;
  justify-content: space-between;
  position: relative;
`

export const Button = styled.button`
  background-color: transparent;
  color: ${p => (p.onWhite ? 'black' : 'white')};
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: #61dafb;
  }
  &:active {
    color: #48a5be;
  }
`

export const LinkButton = styled.a`
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: #61dafb;
  }
  &:active {
    color: #48a5be;
  }
`

export const Floaty = styled.div`
  position: absolute;
  ${p =>
    p.top
      ? css({ top: p.top })
      : p.bottom
        ? css({ bottom: p.bottom })
        : css({ top: '50px' })}
  ${p =>
    p.right
      ? css({ right: p.right })
      : p.left
        ? css({ left: p.left })
        : css({ right: '60px' })}
`

export const Popup = styled.div`
  position: absolute;
  top: 24px;
  left: 135px;
  width: 170px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  box-sizing: border-box;
  & :not(:last-child) {
    padding-bottom: 16px;
  }
`

export const Title = styled.h1`
  margin-bottom: 8px;
`

export const Subtitle = styled.h4`
  margin-top: 0px;
  margin-bottom: 20px;
`
