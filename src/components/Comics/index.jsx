import './styles.scss';

export const Comics = ({ comics, lastComicElementRef, checkSelectedComic, handleSelection, handleShowDetails }) => (
    <ul className="comics-wrapper">
        {
            comics.map((comic, index) => {
                if (comics.length === index + 1) {
                    return (
                        <li ref={lastComicElementRef} key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                            <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                            <a href="" className="comic-title" title="Ver detalhes do quadrinho" onClick={e => handleShowDetails(e, comic)}>{comic.title}</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                            <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                            <a href="" className="comic-title" title="Ver detalhes do quadrinho" onClick={e => handleShowDetails(e, comic)}>{comic.title}</a>
                        </li>
                    )
                }
            })}
    </ul>
)