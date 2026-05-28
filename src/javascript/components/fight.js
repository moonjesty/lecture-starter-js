import controls from '../../constants/controls';

const pressedKeys = {};

function updateHealthBar(position, health, maxHealth) {
    const bar = document.getElementById(`${position}-fighter-indicator`);

    const healthPercent = (health * 100) / maxHealth;

    bar.style.width = `${healthPercent}%`;
}

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;

    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;

    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);

    return damage > 0 ? damage : 0;
}

function keyUp(event) {
    pressedKeys[event.code] = false;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        let firstHealth = firstFighter.health;
        let secondHealth = secondFighter.health;

        let firstBlock = false;
        let secondBlock = false;

        let firstCriticalReady = true;
        let secondCriticalReady = true;

        function keyDown(event) {
            pressedKeys[event.code] = true;

            if (event.code === controls.PlayerOneBlock) {
                firstBlock = true;
            }

            if (event.code === controls.PlayerTwoBlock) {
                secondBlock = true;
            }

            if (controls.PlayerOneCriticalHitCombination.every(code => pressedKeys[code]) && firstCriticalReady) {
                secondHealth -= 2 * firstFighter.attack;

                updateHealthBar('right', secondHealth, secondFighter.health);

                firstCriticalReady = false;

                setTimeout(() => {
                    firstCriticalReady = true;
                }, 10000);
            }

            if (controls.PlayerTwoCriticalHitCombination.every(code => pressedKeys[code]) && secondCriticalReady) {
                firstHealth -= 2 * secondFighter.attack;

                updateHealthBar('left', firstHealth, firstFighter.health);

                secondCriticalReady = false;

                setTimeout(() => {
                    secondCriticalReady = true;
                }, 10000);
            }

            if (event.code === controls.PlayerOneAttack && !firstBlock) {
                const damage = secondBlock ? getDamage(firstFighter, secondFighter) : getHitPower(firstFighter);

                secondHealth -= damage;

                updateHealthBar('right', secondHealth, secondFighter.health);
            }

            if (event.code === controls.PlayerTwoAttack && !secondBlock) {
                const damage = firstBlock ? getDamage(secondFighter, firstFighter) : getHitPower(secondFighter);

                firstHealth -= damage;

                updateHealthBar('left', firstHealth, firstFighter.health);
            }

            if (firstHealth <= 0) {
                document.removeEventListener('keydown', keyDown);
                document.removeEventListener('keyup', keyUp);

                resolve(secondFighter);
            }

            if (secondHealth <= 0) {
                document.removeEventListener('keydown', keyDown);
                document.removeEventListener('keyup', keyUp);

                resolve(firstFighter);
            }
        }

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
    });
}
