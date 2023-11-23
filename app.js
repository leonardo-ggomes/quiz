
const express = require('express')
const consign = require('consign')
const app = express()
const { createServer } = require('http')
const server = new createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const session = require("express-session");


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const sessionMiddleware = session({
    secret: "#socketvotacao#",
    resave: true,
    saveUninitialized: true,
});

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.set('view engine', 'ejs')
app.set('views', 'src/views')


app.get('/adm', (req, res) => {
    res.render('votacao-adm', {})
})

app.get('/', (req, res) => {
    res.render('votacao-cliente', { })
})

app.get('/report', (req, res) => {
    res.render('votacao-report', {})
})

const def = {
    pergunta: "",
    opcoes: []
}

function resetData(){
    def.pergunta = ""
    def.opcoes = []
}

io.on('connection', (socket) => {
    const sessionId = socket.request.session.id;
    const isVoted = socket.request.session.votou;
    console.log('Aluno conectado ' + sessionId);

    if(!isVoted){
        io.to(socket.id).emit("votacao", def);
       
       // socket.sockets.connected[sessionId].emit("votacao", def);
    }

    io.emit("resultado", def)

    socket.on("questao", (data) => {
        resetData()
        def.pergunta = data.pergunta
        def.opcoes = data.opcoes

        def.opcoes = def.opcoes.map(op => {
            return {
                option: op,
                cont: 0
            }
        })

        socket.request.session.reload((err) => {
            if (err) {
                return socket.disconnect();
            }
            socket.request.session.votou = false;
            socket.request.session.save();
        });

        io.emit("votacao", def)
        io.emit("resultado", def)
    })

    socket.on("limpardados", () => {
        resetData()
        io.emit("votacao", def)
        io.emit("resultado", def)
    })

    socket.on("resposta", (data) => {
        if (!socket.request.session.votou) {

            socket.request.session.reload((err) => {
                if (err) {
                    return socket.disconnect();
                }
                socket.request.session.votou = true;
                socket.request.session.save();
            });


            def.opcoes = def.opcoes.map(op => {

                if (data == op.option) {
                    return {
                        ...op,
                        cont: op.cont + 1
                    }
                }

                return {
                    ...op
                }


            })

            //  console.log(def)
            socket.request.session.votou = true
            io.emit("resultado", def)
            return;
        }
        else {
            console.log("Já votou " + sessionId + " - " + socket.request.session.votou)
        }



    })
});


server.listen(process.env.PORT || 80, () => console.log('Servidor Online'))
