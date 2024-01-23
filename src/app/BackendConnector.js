import { getUser } from "./SessionManager/SessionManagerSlice";

const BackendConnector = () => {

    const backendUrl = 'http://localhost:3000/'
    const userId = getUser()

    const getDatastreams = (cb) => {
        const url = `${backendUrl}/datastreams/${userId}`;

        fetch(url).then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            cb(data ? data : [])
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return {
        getDatastreams,
    }
}

export default BackendConnector