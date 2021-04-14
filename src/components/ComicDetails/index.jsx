import './styles.scss';

export const ComicDetails = ({ comic, onClose }) => (
    <div className="details-wrapper">
        <div className="details-content">
            <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
            <div className="details-overview">
                <button type="button" onClick={onClose}>&times;</button>
                <h2>{comic.title}</h2>

            </div>
        </div>
    </div>
)