import { ComicCard } from '../ComicCard';
import './styles.scss';

export const Comics = ({ comics, lastComicElementRef, checkSelectedComic, handleSelection, handleShowDetails }) => (
    <ul className="comics-wrapper">
        {
            comics.map((comic, index) => {

                if (comics.length === index + 1) {
                    return (
                        // Aqui mantive a li externa ao componente ComicCard devido ao uso do IntersectionObserver para o scroll infinito
                        // Seria necessário rever isso no futuro
                        <li ref={lastComicElementRef} key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                            <ComicCard comic={comic} onClickTitle={e => handleShowDetails(e, comic)}></ComicCard>
                        </li>
                    )
                } else {
                    return (
                        <li key={index} className={"comic" + (checkSelectedComic(comic) ? ' selected' : '')} onClick={() => handleSelection(comic)}>
                            <ComicCard comic={comic} onClickTitle={e => handleShowDetails(e, comic)}></ComicCard>
                        </li>
                    )
                }
            })}
    </ul>
)