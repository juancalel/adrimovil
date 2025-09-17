import jwt from 'jsonwebtoken'

export default (request, response, next) => {
    const authorization = request.get('authorization')
    let token = ''


    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }


    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const { id: userId, exp } = decodedToken
        // Verificar si el token ha expirado
        const currentTimeInSeconds = Math.floor(Date.now() / 1000) // Convertir a segundos
        if (currentTimeInSeconds > exp) {
            return response.status(401).json({ error: 'token expired' })
        }

        request.userId = userId

        next()
    } catch (error) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
}
