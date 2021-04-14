import React from 'react';
import { loadComics } from './utils/load-comics';
import { Loader } from './components/Loader';
import './App.scss';

export default class App extends React.Component {
  state = {
    comics: [],
    selectedComics: new Set(),
    isLoading: false
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

  render() {
    const { comics, isLoading, selectedComics } = this.state;
    return (
      <div>
        
        <div className="search-wrapper">
          <input type="search" className="search-box" placeholder="Pesquisar quadrinho..." onChange={this.handleChange} />
        </div>
        {
          isLoading && (
            <Loader></Loader>
          )
        }
        {
          !isLoading && comics.length === 0 && (
            <h5 className="mt-5">Nenhum quadrinho encontrado</h5>
          )
        }
        {
          !isLoading && comics.length > 0 && (
            <ul className="comics-wrapper">
              {
                comics.map(
                  comic =>
                    <li key={comic.id} className={"comic" + (comic.isSelected ? ' selected' : '')} onClick={() => this.handleSelection(comic)}>
                      <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                      <a className="comic-title">{comic.title}</a>
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