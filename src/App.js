import React, { useState, useRef, useCallback } from 'react'
// import { loadComics } from './utils/load-comics';
import useComicSearch from './utils/use-comic-search';
import { Loader } from './components/Loader';
import './App.scss';
import { SearchInput } from './components/SearchInput';
import { ComicDetails } from './components/ComicDetails';
import { Comic } from './components/Comic';

export default function App() {
  const [query, setQuery] = useState('');
  const [openedComic, setOpenedComic] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedComics, setSelectedComics] = useState(new Set());

  const {
    comics,
    hasMore,
    loading,
    error
  } = useComicSearch(query, pageNumber)

  const observer = useRef()
  const lastComicElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  const handleSelection = comic => {
    const selected = new Set(selectedComics);
    if (selected.has(comic)) {
      selected.delete(comic);
    } else {
      selected.add(comic);
    }
    setSelectedComics(selected);
  }

  const checkSelectedComic = comic => {
    return selectedComics.has(comic);
  };

  const handleSelectionClose = () => {
    handleSelection(openedComic);
    handleDetailsClose();
  }

  const handleSelectionCancel = () => {
    setSelectedComics(new Set());
  }

  const handleShowDetails = (e, comic) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenedComic(comic);
  }

  const handleDetailsClose = () => {
    setOpenedComic(null);
  }


  return (
    <div>
      <SearchInput onChange={handleSearch}></SearchInput>

      {
        loading && (
          <Loader></Loader>
        )
      }
      <div>{error && (<h5>Ocorreu um erro ao se comunicar com o servidor da Marvel</h5>)}</div>
      {
        !loading && !error && comics.length === 0 && (
          <h5>Nenhum quadrinho encontrado</h5>
        )
      }
      {
        openedComic && (<ComicDetails comic={openedComic} onClose={handleDetailsClose} onSelect={handleSelectionClose}></ComicDetails>)
      }
      <ul className="comics-wrapper">
        {
          comics.map((comic, index) => {
            if (comics.length === index + 1) {
              return (
                <li ref={lastComicElementRef} key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                  <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                  <a href="" className="comic-title" title="Ver detalhes do quadrinho" onClick={e => handleShowDetails(e, comic)}>{comic.title}</a>
                  {checkSelectedComic(comic)}
                </li>
              )
            } else {
              return (
                <li key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                  <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                  <a href="" className="comic-title" title="Ver detalhes do quadrinho" onClick={e => handleShowDetails(e, comic)}>{comic.title}</a>
                  {checkSelectedComic(comic)}
                </li>
              )
            }
          })}
      </ul>

      {
        selectedComics.size > 0 && (
          <div className="footer">
            <span>{selectedComics.size + (selectedComics.size > 1 ? ' quadrinhos selecionados' : ' quadrinho selecionado')}</span>
            <button type="button">Enviar por e-mail</button>
            <button type="button" onClick={handleSelectionCancel}>Cancelar</button>
          </div>
        )
      }



    </div>

  )

}