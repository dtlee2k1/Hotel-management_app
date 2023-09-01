import styled, { css } from 'styled-components'
import styledProps from '../types/styledProps.type'

const Form = styled.form<styledProps>`
  ${(props) =>
    props.item !== 'modal' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.item === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`

export default Form
