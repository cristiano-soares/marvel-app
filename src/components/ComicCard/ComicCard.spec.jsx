import { render, screen } from '@testing-library/react';
import { ComicCard } from '.';

const props = {
    comic: {
        title: 'Nome do quadrinho',
        thumbnail: {
            path: 'http://i.annihil.us/u/prod/marvel/i/mg/8/a0/603d5b82a5bc0',
            extension: 'jpg'
        }
    },
    onClickTitle: () => { }
}

const imgPath = `${props.comic.thumbnail.path}.${props.comic.thumbnail.extension}`;
describe('<ComicCard />', () => {
    it('should set the image path correcly', () => {
        render(<ComicCard {...props} />);
        const img = screen.getByRole('img', { src: imgPath });
        expect(img).toBeInTheDocument();
    });
});