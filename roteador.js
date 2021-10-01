const express = require("express");
const intrutores = require("./controladores/instrutores");
const roteador = express();

roteador.get("/instrutores", intrutores.consultarTodosOsInstrutores)
roteador.get("/instrutores/:idConsultado", intrutores.consultarUmInstrutor);
roteador.post("/instrutores", intrutores.criarInstrutor);
roteador.patch("/instrutores/:idConsultado", intrutores.editarInstrutor);
roteador.put("/instrutores/:idConsultado", intrutores.substituirInstrutor);
roteador.delete("/instrutores/:idConsultado", intrutores.deletarInstrutor);

module.exports = roteador;