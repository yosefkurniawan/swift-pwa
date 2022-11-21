function requestInternal() {
    return new Promise((resolve) => {
        fetch('http://localhost:3000/getConfig')
            .then((response) => response.json())
            .then((data) => resolve(data));
    });
}

module.exports = requestInternal;
