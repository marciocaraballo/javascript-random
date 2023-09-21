const getUrl = (city) => {
    return `http://api.weatherstack.com/current?access_key=cc5a54321a147d7a51062399c3f83077&query=${city}`;
}

const fetchUtil = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        return Promise.reject(
            new Error('Something went wrong with the request', {
                cause: response.status,
            })
        )
    }
}

const getWeatherInfo = async (city) => {
    const weatherInfo = await fetchUtil(getUrl(city))

    return weatherInfo;
}

export {
    getWeatherInfo
}