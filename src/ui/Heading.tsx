import { css, styled } from 'styled-components'
import styledProps from '../types/styledProps.type'

const Heading = styled.h1<Pick<styledProps, 'as'>>`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `};
`

export default Heading
