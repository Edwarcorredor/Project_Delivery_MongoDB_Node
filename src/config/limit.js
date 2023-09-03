import rateLimit from "express-rate-limit";
export const limitPet = ()=>{
    return rateLimit({
        windowMs: 30 * 1000,
        max: 10,
        standardHeaders: true, 
        legacyHeaders: false, 
        message: (req,res)=>{
            res.status(429).send({
                status: 429, 
                message: "Limite de peticiones alcanzado"
            });
        }
    })    
}

export const limitLogin = ()=>{
    return rateLimit({
        windowMs: 30 * 1000,
        max: 5,
        standardHeaders: true, 
        legacyHeaders: false, 
        message: (req,res)=>{
            res.status(429).send({
                status: 429, 
                message: "Limite de login alcanzado"
            });
        }
    })    
}