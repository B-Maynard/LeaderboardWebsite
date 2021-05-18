function loginHandler(username, password) {
    const url = 'http://localhost:8080/auth/login';

    $.ajax({
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "POST",
        dataType: "json",
        data: {
            username: username,
            password: password
        },
        success: function(result) {
            console.log(result);
        },
        error: function(err) {
            console.log(err);
        }
    });

    // axios({
    //     method: 'post',
    //     url: url,
    //     data: {
    //         data
    //     }
    // }).then(data => console.log(data))
    // .catch(err => console.log(err));
}