import callApi from '../helpers/apiHelper';

class FighterService {
    #fightersEndpoint = 'fighters.json';

    #fighterDetailsEndpoint = 'details/fighter';

    async getFighters() {
        const apiResult = await callApi(this.#fightersEndpoint);
        return apiResult;
    }

    async getFighterDetails(id) {
        const endpoint = `${this.#fighterDetailsEndpoint}/${id}.json`;
        return callApi(endpoint);
    }
}

const fighterService = new FighterService();

export default fighterService;
