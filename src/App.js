import React, { useState, useRef, useCallback } from 'react';
import useComicSearch from './utils/use-comic-search';
import { Loader } from './components/Loader';
import './App.scss';
import { SearchInput } from './components/SearchInput';
import { ComicDetails } from './components/ComicDetails';
import { Comics } from './components/Comics';
import { Footer } from './components/Footer';
import { EmailForm } from './components/EmailForm';

export default function App() {
  const [query, setQuery] = useState('');
  const [openedComic, setOpenedComic] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedComics, setSelectedComics] = useState(new Set());
  const [showMailForm, setShowMailForm] = useState(false);

  const {
    comics,
    hasMore,
    loading,
    error
  } = useComicSearch(query, pageNumber)

  const observer = useRef();
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

  const handleSearch = e => {
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

  const handleOpenMailForm = () => {
    setShowMailForm(true);
  }
  const handleCloseMailForm = () => {
    handleSelectionCancel();
    setShowMailForm(false);
  }

  return (
    <div>
      <SearchInput onChange={handleSearch}></SearchInput>
      {
        loading && (
          <Loader></Loader>
        )
      }
      {
        error && (
          <h5>Ocorreu um erro ao se comunicar com o servidor da Marvel</h5>
        )
      }
      {
        !loading && !error && comics.length === 0 && (
          <h5>Nenhum quadrinho encontrado</h5>
        )
      }
      {
        openedComic && (
          <ComicDetails
            comic={openedComic}
            onClose={handleDetailsClose}
            onSelect={handleSelectionClose}></ComicDetails>
        )
      }
      <Comics
        comics={comics}
        lastComicElementRef={lastComicElementRef}
        checkSelectedComic={checkSelectedComic}
        handleSelection={handleSelection}
        handleShowDetails={handleShowDetails}></Comics>
        
      <div className="loader-inline">{(loading && comics.length > 0) && 'Carregando mais...'}</div>

      {
        selectedComics.size > 0 && (
          <Footer
            selectedComics={selectedComics}
            onOpenMailForm={handleOpenMailForm}
            onCancelSelection={handleSelectionCancel}></Footer>
        )
      }
      {
        showMailForm && (
          <EmailForm
            onCancelSendMail={handleCloseMailForm}
            selectedComics={selectedComics}></EmailForm>
        )
      }
    </div>
  )

}