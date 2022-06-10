import { Container } from './styles';

export function Input({icon: Icon, ...rest}) { // o icon sera para inputs que tem ícones, por isso estão sendo criados dentro do container
  return (
    <Container>
      { Icon && <Icon size={20} />} 
      <input {...rest} />
    </Container>
  )
}

/*{ Icon && <Icon />}  se existe o ícone sera adicionado, se não existir, não acontecera nada*/