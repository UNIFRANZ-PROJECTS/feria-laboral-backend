const express = require('express');
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || 3001);


//routes
app.use(express.json());
app.use(cors());
app.use(require('./routes/managers'));
app.use(require('./routes/customers'));
app.use(require('./routes/users'));
app.use(require('./routes/postulations'));
app.use(require('./routes/links'));
app.use(require('./routes/headquarters'));

// app.use(require('./routes/permissions'));
// app.use(require('./routes/roles'));
// app.use(require('./routes/rol_permissions'));
// app.use(require('./routes/user_roles'));
// app.use(require('./routes/careers'))
// app.use(require('./routes/headquarters'))
// app.use(require('./routes/customer_careers'))
// app.use(require('./routes/events_complet'))
// app.use(require('./routes/activities'))
// app.use(require('./routes/exhibitor'))
// app.use(require('./routes/sites'))
// app.use(require('./routes/surveys'))
// app.use(require('./routes/save_files'));
// app.use(require('./routes/channels'));
// app.use(require('./routes/souvenirs'));
// app.use(require('./routes/categories'));
// app.use(require('./routes/kardex'));
// app.use(require('./routes/covenants'));


const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
  });

const io = require('socket.io')(server);
console.log('asdsad')
io.on('connection', function(socket) {
  console.log('conectado')
  socket.on('SEND_MESSAGE', function(data) {
    console.log('enviar mensaje')
    io.emit('MESSAGE', data);
    console.log(data)
  });
});
