const registerTemplates = require('./register')
const loginTemplate = require('./login')
const logoutTemplate = require('./logout')

module.exports = {
    register : registerTemplates, // Contains registration requests JSON templates for each user type
    login : loginTemplate,
    logout : logoutTemplate
}
