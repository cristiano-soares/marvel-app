import './styles.scss';

export const Loader = ({backdropColor}) => {
    const backdropClass = `spinner-grow-backdrop ${backdropColor ? 'backdrop-color' : ''}`;
    return (
        <div className={backdropClass}>
            <div className="spinner-grow"></div>
        </div>
    )
}