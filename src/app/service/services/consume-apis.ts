export class CONSUME_API {

    static apiUrl: string = window['apiUrl'] || (location.protocol + '//' + 'localhost:8080/api');  
    static USERS: any = {
        LOGIN: '/v1/userCtrl/login',
    }

    static CUSTOMER: any = {
        CUSTOMERS: '/v1/customers',
    }
}