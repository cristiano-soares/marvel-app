import './styles.scss';

export const ComicDetails = ({ comic, onClose, onSelect }) => (
    <div className="details-wrapper">
        <div className="details-content">
            <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
            <div className="details-overview">
                <div className="overview-body">
                    <h2>{comic.title}</h2>
                    <p>
                        Número de páginas: {comic.pageCount === 0 ? (<em>Não informado</em>) : comic.pageCount}
                    </p>
                </div>
                <div className="overview-footer">
                    {
                        !comic.isSelected && (
                            <button type="button" onClick={onSelect}>Selecionar e fechar</button>
                        )
                    }
                    <button type="button" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    </div>
)