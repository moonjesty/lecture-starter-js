import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    const body = createElement({
        tagName: 'div',
        className: 'winner-modal'
    });

    const img = createElement({
        tagName: 'img',
        attributes: {
            src: fighter.source,
            alt: fighter.name
        }
    });

    const title = createElement({
        tagName: 'h2'
    });

    title.innerText = `${fighter.name} wins!`;

    body.append(img, title);

    showModal({
        title: 'Winner',
        bodyElement: body
    });
}
