const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=>{
/*     res.send('this is working'); */
    res.send(database.users)
})

app.post('/signin', (req, res)=>{
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json('success')
        }
    else{
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res)=>{
    const {email, password, name} = req.body
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id){
            res.json(user);
        }    
    })
    res.status(404).json('no such user')
})

app.put('/image', (req, res)=>{
    const { id } = req.body;
    database.users.forEach(user => {
        if (user.id === id){
            user.entries++
            res.json(user.entries);
        }    
    })
    res.status(400).json('no such user')
})

app.listen(3000, ()=>{
    console.log('app is running 3000');
})

/* 
The backend responses we want in our code

'/':                res = working, show users
'/signin':          post = success/fail based on if email and password match any known user
'/register':        post = user, add a user
'/profile/:userId': get = user, checks id then res with specific user
'/image':           put = user, increases entries by 1 each time

*/