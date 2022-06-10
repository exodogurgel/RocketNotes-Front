import { Container } from './styles'

export function Button( { title, loading, ...rest } ) { // Desestruturando de props

  return (
    <Container
      type="button"
      disabled={loading}
      {...rest}
    >
      { loading ? 'Carregando...' : title }
    </Container>
  )
}

// o if ternário foi criado para se tiver a propriedade loading, mudar o title para carregando