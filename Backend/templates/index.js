const registerTemplates = require('./auth/register')
const loginTemplate = require('./auth/login')
const logoutTemplate = require('./auth/logout')
const actionsTemplate = require('./products/actions')
const customerTemplate = require('./customer/funds')

module.exports = {
    register : registerTemplates, // Contains registration requests JSON templates for each user type
    login : loginTemplate,
    logout : logoutTemplate,
    action : actionsTemplate,
    customer : customerTemplate
}
