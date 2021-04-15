export function ComicCard({ comic, onClickTitle }) {
    const imagePath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    return (
        <>
            <img className="comic-cover" src={imagePath} alt={comic.title} />
            <button className="comic-title" title="Ver detalhes do quadrinho" onClick={onClickTitle}>{comic.title}</button>
        </>
    )
}

