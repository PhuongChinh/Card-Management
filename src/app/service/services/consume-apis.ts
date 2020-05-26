export class CONSUME_API {

    static apiUrl: string = window['apiUrl'] || (location.protocol + '//' + 'ec2-3-23-128-228.us-east-2.compute.amazonaws.com:8080/api');  
    static USERS: any = {
        LOGIN: '/v1/userCtrl/login',
    }

    static CUSTOMER: any = {
        CUSTOMERS: '/v1/customers',
    }

    static ORDER: any = {
        CREATE_ORDER: '/v1/orderCtrl/createOrUpdateOrder',
        GET_ORDER_BY_CUSTOMER_ID: '/v1/orderCtrl/getOrderByCutomerId'
    }
}