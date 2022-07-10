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
  color: ${p => (p.onWhite ? 'black' : '#61dafb')};
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.25s ease-in-out;
  box-sizing: border-box;

  &:hover {
    color: ${p => (p.onWhite ? 'black' : 'white')};
    border-bottom: 1px solid #61dafb;
  }
  &:active {
    color: #bbb;
    border-bottom: 1px solid #61dafb;
  }
`

export const LinkButton = styled.a`
  color: #61dafb;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: white;
    border-bottom: 1px solid #61dafb;
  }
  &:active {
    color: #bbb;
    border-bottom: 1px solid #61dafb;
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

export const LinkHolder = styled.div`
  top: 50px;
  right: 60px;
  a:first-child {
    margin-right: 12px;
  }
  img {
    width: 48px;
    padding: 6px;
    transition: all 0.2s ease-in-out;
  }
  img:hover {
    width: 60px;
    padding: 0px;
    transition: all 0.2s ease-in-out;
  }
  position: absolute;
  @media (max-width: 720px) {
    top: 24px;
    right: 24px;
  }
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
    margin-bottom: 16px;
  }
  z-index: 2;
`

export const PopupClose = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

export const Title = styled.h1`
  margin-bottom: 8px;
`

export const Subtitle = styled.h4`
  margin-top: 0px;
  margin-bottom: 20px;
`
