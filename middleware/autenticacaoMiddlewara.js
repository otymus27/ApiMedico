import jwt from 'jsonwebtoken';


function verificarToken(req, res, next){
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({error: 'Acesso Negado!'});
    }

    try {
        const decodificacao = jwt.verify(token, 'you-secret-key');
        req.medicoId = decodificacao.medicoId;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Token invalido!'});
    }

};

export default verificarToken;