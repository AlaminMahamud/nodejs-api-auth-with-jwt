const express = require('express'),
      jwt     = require('jsonwebtoken');

const app     = express();



/****** Middleware *******/

function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	req.token = bearerToken;
	next();
    } else {
	console.log("I am here");
	res.sendStatus(403);
    }
   
}



/****** Routes *******/

app.get('/api', (req, res) => {
    res.json({
	message: "Welcome to the API"
    });
});


app.post('/api/posts', verifyToken, (req, res) => {
    
    jwt.verify(req.token, 'secretkey', (err, auth) => {
	if (err) {
	    res.sendStatus(403);
	} else {
	    res.json({
		message: "Posts Created",
		auth: auth
	    });
	}
    });
    
    res.json({
	message: "Post Created"
    });
});


app.post('/api/login', (req, res) => {
    // Mock User
    const user = {
	id: 1,
	username: 'alamin',
	email: 'alamin@gmail.com'
    }

    jwt.sign(
	{user: user},
	'secretkey',
	(err, token) => {
	    res.json({
		token: token
	    });
	}
    );

});


app.listen(5000, () => console.log('Server Started on the port 5000'));
