import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { FiPlus } from 'react-icons/fi'; 
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note }  from '../../components/Note';
import { Input }  from '../../components/Input';
import { Header }  from '../../components/Header';
import { Section }  from '../../components/Section';
import { ButtonText }  from '../../components/ButtonText';

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    // desmarcando todos quando clicar em "Todas"
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName) // verificando se o tagName existe dentro da lista de tags
    
    if (alreadySelected) { // se ja estiver selecionado
      const filteredTags = tagsSelected.filter(tag => tag !== tagName) // retornando todas as tags que são diferentes do tagName
      setTagsSelected(filteredTags); // passando todas as tags, menos a tag desmarcada

    } else { // se não tiver selecionado
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  },[])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes()
  },[tagsSelected, search]) // quando mudar o conteúdo de alguma das dependência, o useEffect sera executado novamente

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            onClick={() => handleTagSelected("all")}
            isActive={tagsSelected.length === 0}
          />
        </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
                title={tag.name} 
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)} // irar retornar verdadeiro caso a tag exista la dentro
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título"
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }

        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  )
}