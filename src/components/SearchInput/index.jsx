import './styles.scss';

export const SearchInput = ({ onChange }) => (
    <div className="search-wrapper">
        <input type="search" className="search-box" placeholder="Pesquisar quadrinho..." onChange={onChange} />
    </div>
)