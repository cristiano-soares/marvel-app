import './styles.scss';

export const Footer = ({ selectedComics, onOpenMailForm, onCancelSelection }) => (
    <div className="footer">
        <span>{selectedComics.size + (selectedComics.size > 1 ? ' quadrinhos selecionados' : ' quadrinho selecionado')}</span>
        <button type="button" onClick={onOpenMailForm}>Enviar por e-mail</button>
        <button type="button" onClick={onCancelSelection}>Cancelar</button>
    </div>
)