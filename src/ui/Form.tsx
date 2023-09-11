import styled, { css } from 'styled-components'

interface FormProps {
  $item: 'regular' | 'modal'
}
const Form = styled.form<FormProps>`
  ${(props) =>
    props.$item === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$item === 'modal' &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`

export default Form
