const headerConfig = (token: string, multipart: boolean = false) => {
    if (multipart) {
        return {
            headers: {
                'authorization': 'bearer ' + token,
                'Content-Type': 'multipart/form-data',
            }
        }
    }

    return {
        headers: {
            'authorization': 'bearer ' + token,
        }
    }
};

export default headerConfig;