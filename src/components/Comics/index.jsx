import './styles.scss';

export const Comics = ({ comics, lastComicElementRef, checkSelectedComic, handleSelection, handleShowDetails }) => (
    <ul className="comics-wrapper">
        {
            comics.map((comic, index) => {
                if (comics.length === index + 1) {
                    return (
                        // Aqui cabe criar um componente específico, mas como estou usando IntersectionObserver resolvi deixar assim por enquanto
                        <li ref={lastComicElementRef} key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                            <img className="comic-cover" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                            <button className="comic-title" title="Ver detalhes do quadrinho" onClick={e => handleShowDetails(e, comic)}>{comic.title}</button>
                        </li>
                    )
                } else {
                    return (
                        // Aqui cabe criar um componente específico, mas como estou usando IntersectionObserver resolvi deixar assim por enquanto
                        <li key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                            <img className="comic-cover" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                            <button className="comic-title" title="Ver detalhes do quadrinho" onClick={e => handleShowDetails(e, comic)}>{comic.title}</button>
                        </li>
                    )
                }
            })}
    </ul>
)