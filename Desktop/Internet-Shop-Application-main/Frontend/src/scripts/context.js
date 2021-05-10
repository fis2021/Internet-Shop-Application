export let userContext = undefined

export function genContext(
    userType = undefined, 
    isLoggedIn = false, 
    sessionToken = undefined, 
    sessionTokenExp = undefined, 
    email = undefined, 
    password = undefined){
        return {
            "user_type" : userType,
            "is_logged_in" : isLoggedIn,
            "session_token" : sessionToken,
            "session_token_expiration" : sessionTokenExp,
            "email" : email,
            "password" : password  // not sure if to store
        }
}