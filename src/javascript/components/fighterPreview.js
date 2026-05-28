import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;

    const attributes = {
        src: source,
        title: name,
        alt: name
    };

    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';

    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (!fighter) {
        return fighterElement;
    }

    const image = createFighterImage(fighter);

    const info = createElement({
        tagName: 'div',
        className: 'fighter-preview___info'
    });

    info.innerHTML = `
        <h2>${fighter.name}</h2>
        <p>Health: ${fighter.health}</p>
        <p>Attack: ${fighter.attack}</p>
        <p>Defense: ${fighter.defense}</p>
    `;

    fighterElement.append(image, info);

    return fighterElement;
}
