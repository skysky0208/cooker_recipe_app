import { Step } from 'interfaces';
import client from './client';
import Cookies from 'js-cookie';

export const getSteps = (id: string | undefined) => {
    return client.get(`recipes/${id}/steps`);
};

export const updateSteps = (id: string | undefined, data: Step[]) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.put(`recipes/${id}/steps`, data, { headers: headers });
};