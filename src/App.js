import React from 'react';
import { loadComics } from './utils/load-comics';
import './App.scss';

export default class App extends React.Component {
  state = {
    comics: [],
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

  handleChange = e => {
    const query = e.target.value;
    this.loadComics(query);
  }

  render() {
    const { comics, isLoading } = this.state;
    return (
      <div>
        <div className="search-wrapper">
          <input type="search" className="search-box" placeholder="Pesquisar quadrinho..." onChange={this.handleChange} />
        </div>
        {
          isLoading && (
            <h5 className="mt-5">Carregando...</h5>
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
              {comics.map(comic => <li key={comic.id} className="comic">
                <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                <a className="comic-title">{comic.title}</a>
              </li>)}
            </ul>
          )
        }

      </div>

    )
  }
}