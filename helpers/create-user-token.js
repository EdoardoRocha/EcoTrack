import jwt from "jsonwebtoken";

export const createUserToken = user => {
    //Create token
    const token = jwt.sign({
        name: user.name,
        id: user.id
    }, process.env.AUTH_SECRET);

    return token;
}