import { Container } from './styles'

export function Button( { title, ...rest } ) { // Desestruturando de props

  return (
    <Container
      type="button"
      {...rest}
    >
      {title}
    </Container>
  )
}
