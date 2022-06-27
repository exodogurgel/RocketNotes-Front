import { FiPlus, FiX } from 'react-icons/fi'

import { Container } from './styles'

export function NoteItem({ isNew = false, value, onClick, ...rest}) {
  return (
    <Container isNew={isNew}>
      <input 
        type="text"
        value={value}
        readOnly={!isNew} // se não for criar um novo, ficara so leitura, (se ja estiver sido criado)
        {...rest}
      />

      <button
        type="button"
        onClick={onClick} 
        className={isNew ? 'button-add' : 'button-delete'} 
      >
        { isNew ? <FiPlus /> : <FiX />} 
      </button>
  
    </Container>
  )
}

/* aqui esta sendo definidas a propriedades dessa forma, porque são para lugares diferentes
   ex: o isValue para o input e o onClick para o button 
   
   { isNew ? <FiPlus /> : <FiX />} nessa parte aqui se for um botão novo sera um icone, se nao for sera outro
*/

