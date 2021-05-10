import {LoginFormData, RegisterNewCustomer, RegisterNewSeller} from 'formatter'
import {genContext} from 'context'

export function submitLogin(email, password, setContext){
    const reqBody = LoginFormData(email, password)

    console.log(reqBody)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
          setContext(userContext, genContext(undefined, true));
          resolve();
        }, 1000);
      });

}

export function submitNewCustomer(name, surname, email, password){
    const reqBody = RegisterNewCustomer(name, surname, email, password)
    console.log(reqBody)
}

export function submitNewSeller(companyName, address, phone, email, password){
    const reqBody = RegisterNewCustomer(companyName, address, phone, email, password)
    console.log(reqBody)
}