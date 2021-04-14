import React from 'react';
import { loadComics } from './utils/load-comics';
import { Loader } from './components/Loader';
import './App.scss';
import { SearchInput } from './components/SearchInput';
import { ComicDetails } from './components/ComicDetails';

export default class App extends React.Component {
  state = {
    comics: [],
    selectedComics: new Set(),
    isLoading: false,
    openedComic: null
  }

  componentDidMount() {
    this.loadComics();
  }

  loadComics = async query => {
    this.setState({
      isLoading: true
    });
    await loadComics(query)
      .then(res => {
        const comics = res.data.data.results;
        console.log(comics[2])
        this.setState({
          comics,
          isLoading: false
        });
      })
  }

  handleSelection = comic => {
    const { selectedComics } = this.state;
    if (selectedComics.has(comic)) {
      selectedComics.delete(comic);
      comic.isSelected = false;
    } else {
      selectedComics.add(comic);
      comic.isSelected = true;
    }
    this.setState({
      selectedComics
    })
  }

  handleSelectionCancel = () => {
    const { selectedComics } = this.state;
    selectedComics.forEach(comic => comic.isSelected = false);
    this.setState({
      selectedComics: new Set()
    })
  }

  handleChange = e => {
    const query = e.target.value;
    this.loadComics(query);
  }

  handleShowDetails = (e, comic) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e)
    this.setState({
      openedComic: comic
    })
  }

  handleDetailsClose = () => {
    this.setState({
      openedComic: null
    })
  }

  render() {
    const {
      comics,
      isLoading,
      selectedComics,
      openedComic } = this.state;
    return (
      <div>
        <SearchInput onChange={this.handleChange}></SearchInput>

        {
          isLoading && (
            <Loader></Loader>
          )
        }
        {
          !isLoading && comics.length === 0 && (
            <h5>Nenhum quadrinho encontrado</h5>
          )
        }
        {
          openedComic && (<ComicDetails comic={openedComic} onClose={this.handleDetailsClose}></ComicDetails>)
        }
        {
          !isLoading && comics.length > 0 && (
            <ul className="comics-wrapper">
              {
                comics.map(
                  comic =>
                    <li key={comic.id} className={"comic" + (comic.isSelected ? ' selected' : '')} onClick={() => this.handleSelection(comic)}>
                      <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                      <a href="" className="comic-title" title="Ver detalhes do quadrinho" onClick={e => this.handleShowDetails(e, comic)}>{comic.title}</a>
                    </li>
                )}
            </ul>
          )
        }

        {
          selectedComics.size > 0 && (
            <div className="footer">
              <span>{selectedComics.size + (selectedComics.size > 1 ? ' quadrinhos selecionados' : ' quadrinho selecionado')}</span>
              <button type="button">Enviar por e-mail</button>
              <button type="button" onClick={this.handleSelectionCancel}>Cancelar</button>
            </div>
          )
        }

      </div>

    )
  }
}