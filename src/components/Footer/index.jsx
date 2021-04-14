import './styles.scss';

export const Footer = ({ selectedComics, handleSendMail, handleSelectionCancel, mailContent }) => (
    <div className="footer">
        <span>{selectedComics.size + (selectedComics.size > 1 ? ' quadrinhos selecionados' : ' quadrinho selecionado')}</span>
        <button type="button" onClick={handleSendMail}>Enviar por e-mail</button>
        <button type="button" onClick={handleSelectionCancel}>Cancelar</button>
        <form id="emailForm" className="mail-form">
            <textarea name="message" value={mailContent}></textarea>
        </form>
    </div>
)