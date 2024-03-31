import axios from "axios";

export const Logout = async (navigate) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error('Token not found in localStorage');
            return false;
        }

        const headers = {
            'x-sh-auth': token,
        };

        const response = await axios.get('http://146.190.164.174:4000/api/app_api/logout', { headers });
        console.log('Logout API Response:', response);

        if (response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');

            navigate('/login');
            return true;
        } else {
            console.error('Unexpected status code:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
}
