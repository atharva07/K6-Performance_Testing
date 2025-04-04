import { check } from 'k6';
import http from 'k6/http'

export default function() {

    const credentials = {
            username : "test_" + Date.now(),
            password : "secret_" + Date.now(),
        }
    
        http.post(
            'https://test-api.k6.io/user/register/', 
            JSON.stringify(credentials), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    
        let res = http.post(
            'https://test-api.k6.io/auth/token/login/',
            JSON.stringify(
                {
                    username: credentials.username,
                    password: credentials.password
                }
            ),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    
        const accessToken = res.json().access;
        console.log(accessToken);

        http.get(
            "https://test-api.k6.io/my/crocodiles/",
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );

        let res1 = http.post(
            'https://test-api.k6.io/my/crocodiles/',
            JSON.stringify(
                {
                    name: "Random croc",
                    sex: "M",
                    date_of_birth: "1900-10-28"
                }
            ),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );

        const newCrocodileId = res1.json().id;

        let res2 = http.get(
            `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );

        check(res2, {
            'status is 200': (r) => r.status === 200,
            'crocodile id': (r) => r.json().id === newCrocodileId
        });

        let res3 = http.put(
            `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
            JSON.stringify(
                {
                    name: "update Random croc",
                    sex: "M",
                    date_of_birth: "1900-10-28"
                }
            ),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );

        let res4 = http.patch(
            `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
            JSON.stringify(
                {
                    sex: "F",
                }
            ),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );

        let res5 = http.del(
            `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
            null,
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }
        );
}  