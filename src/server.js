const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

// habilidar o uso do req.body nA APLICAÇÃO
server.use(express.urlenconded({extended: true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express:server,
    noCache: true
})


//configurar caminho na minha aplicação
//pagina inicial
//req: requisição(pergunta)
//res: resposta
server.get("/",  (req, res) => {
   return res.render("index.html", {title: "Um titulo"})

})

server.get("/create-point",  (req, res) => {
    //req
    //console.log(req.query)



    return res.render("create-point.html")

})

server.post("savepoint", (req, res) => {

    //req.body: o corpo do nossa formulario
    //console.log(req.body)

    //insirir dados no banco de dados

    return res.send("ok")
})

server.get("/search",  (req, res) => {


    //pegar os dados fdo banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
       if(err){
           return console.log("err")
    }
        const total = rows.length
       //mostra a pagina html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})
    })

})


// ligar o servidor 
server.listen(3000)