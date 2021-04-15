import './styles.scss';

export const Loader = ({backdropColor, showBackdrop}) => {
    const backdropClass = `${showBackdrop || backdropColor ? 'spinner-grow-backdrop' : ''} ${backdropColor ? 'backdrop-color' : ''}`;
    return (
        <div className={backdropClass}>
            <div className="spinner-grow"></div>
        </div>
    )
}