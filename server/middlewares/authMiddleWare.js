import jwt from "jsonwebtoken"

const protect = async (req , res, next) => {

    console.log("Protect Middleware");
    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message : "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        console.log(decoded);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        console.log("JWT ERROR" , error);
        return res.status(400).json({message : error.message})
    }

}

export default protect;