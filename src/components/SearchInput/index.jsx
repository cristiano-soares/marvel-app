import './styles.scss';

export const SearchInput = ({ onChange }) => (
    <div className="search-wrapper">
        <input type="search" className="search-box" placeholder="Qual quadrinho você procura?" onChange={onChange} />
    </div>
)