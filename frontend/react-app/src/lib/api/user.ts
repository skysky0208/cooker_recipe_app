import client from './client';
import Cookies from 'js-cookie';

export const getUserForMypage = () => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };
    return client.get('mypage', { headers: headers });
};
