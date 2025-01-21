
const express = require('express')
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

// Lógica do endpoint

app.get('/adm', (req, res) => {
    res.render('votacao-adm', {})
})

app.get('/', (req, res) => {
    res.render('votacao-cliente', { })
})

app.get('/report', (req, res) => {
    res.render('votacao-report', {})
})

//Lógica do socket

const votedIpList = []

const enquete = {
    pergunta: "",
    opcoes: []
}

function limparEnquete(){
    enquete.pergunta = ""
    enquete.opcoes = []
}

io.on('connection', (socket) => {
    const meuIp = socket.handshake.address
    const isVoted = votedIpList.find(ip => ip == meuIp )

    if(!isVoted){
        io.to(socket.id).emit("votacao", enquete); 
       // socket.sockets.connected[sessionId].emit("votacao", enquete);
    }

    io.emit("resultado", enquete)

    socket.on("questao", (data) => {
        limparEnquete()
        enquete.pergunta = data.pergunta
        enquete.opcoes = data.opcoes

        enquete.opcoes = enquete.opcoes.map(op => {
            return {
                option: op,
                cont: 0
            }
        })

        for(let index in votedIpList){
            delete votedIpList[index]
        }

        io.emit("votacao", enquete)
        io.emit("resultado", enquete)
    })

    socket.on("limpardados", () => {
        limparEnquete()
        io.emit("votacao", enquete)
        io.emit("resultado", enquete)
    })

    socket.on("resposta", (data) => {

        console.group('O IP votou:')
        console.log(socket.handshake.address)
        console.groupEnd()

        const isVoted = votedIpList.find(ip => ip == socket.handshake.address)

        if (!isVoted) {
         
            enquete.opcoes = enquete.opcoes.map(op => {

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

            //  console.log(enquete)
            votedIpList.push(socket.handshake.address)
            io.emit("resultado", enquete)
            return;
        }
        else {
            console.log(socket.handshake.address + " já votou!")
        }



    })
});


server.listen(process.env.PORT || 80, () => console.log('Servidor Online'))
