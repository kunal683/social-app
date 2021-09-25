const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

const { Secret_key } = require('../config')

module.exports = (context) => {

    const authheader = context.req.headers.authorization

    if (authheader) {
        const token = authheader.split('Bearer ')[1];
        if (token) {
           
            try {
                const user = jwt.verify(token, Secret_key)
     
                return user
            } catch (err) {
                throw new AuthenticationError('Token Invalid')
            }
        }
        throw new AuthenticationError('Authentication error Token cannot be null ')
    }
    throw new AuthenticationError('Authentication header must be provided')
}