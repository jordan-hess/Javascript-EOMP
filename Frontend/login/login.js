fetch("https://flask-eomp1.herokuapp.com/")
    .then((response) => response.json())
    .then((data) => {
        // storing the results
        let users = data.results;

        let log = [];
        users.forEach((users, index) => {
            log[
                index
            ] = `${users.log.username} ${users.log.password}`;
        })
    });