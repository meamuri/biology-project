import {Phylum, Family, Species} from './taxon';
import axios from 'axios';

export function getData(): Phylum[] {
    return [
        new Phylum('woof', [
            new Family(
                'au', [
                    new Species("Meeeh")
                ]
            )
        ])
    ]
}

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const getApiData = async () => {
    return await httpClient.get<Phylum[]>('')
};
