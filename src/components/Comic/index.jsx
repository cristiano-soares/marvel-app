import './styles.scss';
import { Component } from 'react';

export class Comic extends Component {
    render() {
        const { comic, onSelect, onClickDetails } = this.props;
        return (
            <li className={"comic" + (comic.isSelected ? ' selected' : '')} onClick={onSelect}>
                <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
                <a href="" className="comic-title" title="Ver detalhes do quadrinho" onClick={onClickDetails}>{comic.title}</a>
            </li>
        )
    }
}