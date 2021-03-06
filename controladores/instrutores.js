const listaDeInstrutores = require("../dados/instrutores");
const areasDeAtuacaoValidas = ["Logica", "Back-end", "Full-stack", "Front-end", "Flutter", "Soft Skills", "UI/UX"];

function consultarTodosOsInstrutores(req, res) {
    res.json(listaDeInstrutores);
};

function consultarUmInstrutor(req, res) {
    const instrutor = listaDeInstrutores.find(instrutor => instrutor.id === Number(req.params.idConsultado));
    
    if (!instrutor) {
        res.status(404);
        res.json({erro: `instrutor ${req.params.idConsultado} não existe`});
        return;
    } 
    res.json(instrutor);
};

let proximoId = 5;

function validarInstrutor(instrutor) {
    if (!instrutor.nome) {
        return "O campo nome é obrigatório";
    };

    if (!instrutor.idade) {
        return "O campo idade é obrigatório";
    };

    if (!instrutor.areaDeAtuacao) {
        return "O campo areaDeAtuacao é obrigatório";
    }; 

    if (typeof instrutor.nome !== "string") {
        return "O campo nome deve ser preenchido com um texto";
    };

    if (typeof instrutor.idade !== "number") {
        return "O campo idade deve ser preenchido com um número";
    };

    if (typeof instrutor.areaDeAtuacao !== "string") {
        return "O campo areaDeAtuacao deve ser preenchido com um texto";
    };

    if (instrutor.idade < 18) {
        return "O instrutor deve ser maior de idade";
    }

    if (!areasDeAtuacaoValidas.includes(instrutor.areaDeAtuacao)) {
        return "A área de atuação informada é inválida";
    };

    if (!instrutor.nome.includes(" ")) {
        return "O nome deve conter primeiro nome e sobrenome";
    }
};

function criarInstrutor(req, res) {
    const erro = validarInstrutor(req.body);

    if (erro) {
        res.status(400);
        res.json({ erro });
        return;
    }

    const novoInstrutor = {
        id: proximoId,
        nome: req.body.nome,
        idade: req.body.idade,
        areaDeAtuacao: req.body.areaDeAtuacao,
    };

    listaDeInstrutores.push(novoInstrutor);

    proximoId += 1;

    res.json(novoInstrutor);
}

function editarInstrutor(req, res) {
    const instrutor = listaDeInstrutores.find(instrutor => instrutor.id === Number(req.params.idConsultado));

    if (!instrutor) {
        res.status(404);
        res.json({erro: `instrutor ${req.params.idConsultado} não existe`});
        return;
    } 

const nome = req.body.nome ?? instrutor.nome;

    const erro = validarInstrutor({
        nome,
        idade: req.body.idade === undefined ? instrutor.idade : req.body.idade,
        areaDeAtuacao: req.body.areaDeAtuacao === undefined ? instrutor.areaDeAtuacao : req.body.areaDeAtuacao,
    });

    if (erro) {
        res.status(400);
        res.json({ erro });
        return;
    }

    
    if (req.body.nome !== undefined) {
        instrutor.nome = req.body.nome;
    }

    if (req.body.idade !== undefined) {
        instrutor.idade = req.body.idade;
    }

    if (req.body.areaDeAtuacao !== undefined) {
        instrutor.areaDeAtuacao = req.body.areaDeAtuacao
    }

    res.json(instrutor);
}

function substituirInstrutor(req, res) {
    const erro = validarInstrutor(req.body);

    if (erro) {
        res.status(400);
        res.json({ erro });
        return;
    };

    if (req.body.id !== Number(req.params.idConsultado)) {
        res.status(400);
        res.json({ erro: "O campo ID deve ser igual na rota e no corpo da requisição"});
        return;
    }

    const instrutor = listaDeInstrutores.find(instrutor => instrutor.id === Number(req.params.idConsultado));

    if (instrutor) {
        // substituir o existente
        instrutor.nome = req.body.nome;
        instrutor.idade = req.body.idade;
        instrutor.areaDeAtuacao = req.body.areaDeAtuacao
        res.json(instrutor);
    } else {
        //inserir
        const novoInstrutor = req.body;
        listaDeInstrutores.push(novoInstrutor);
        res.json(novoInstrutor);
    }
}

function deletarInstrutor(req, res) {
    const instrutor = listaDeInstrutores.find(instrutor => instrutor.id === Number(req.params.idConsultado));

    if (!instrutor) {
        res.status(404);
        res.json({erro: `instrutor ${req.params.idConsultado} não existe`});
        return;
    }; 

    const indice = listaDeInstrutores.indexOf(instrutor);

    listaDeInstrutores.splice(indice, 1);

    res.json(instrutor);
}

module.exports = {  consultarTodosOsInstrutores,    consultarUmInstrutor, 
    criarInstrutor,
    editarInstrutor,
    substituirInstrutor,
    deletarInstrutor,
 };