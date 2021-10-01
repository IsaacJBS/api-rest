function logarRequisicao (req, res, next) {
    console.log(req.method, req.url);
        next();
};

function travaDeSenha (req, res, next) {
    req.query;

    if(req.method ===  "GET" || req.query.senha === "123456") {
        next();
    } else {
        res.status(401);
        res.json({erro : "senha inválida"})
    }
};

module.exports = { logarRequisicao, travaDeSenha};