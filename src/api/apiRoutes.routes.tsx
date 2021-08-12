export const DNS = {
    host: 'https://fe5384bd35ce.ngrok.io/'
}

export const ROUTES = {
    LOGIN:`${DNS.host}api/user/singin`, //POST /api/user/singin
    // POST /api/user/singup
    NEWTICKET:`${DNS.host}api/tickets/new_ticket`,
    REGISTERSENSORCITIZEN: `${DNS.host}api/user/movil/register/usersensorhumano`,
    GETALERTSRISK: `${DNS.host}api/tickets/tickets`,
    GETMEALERTRISK: `${DNS.host}api/tickets/showbyuser`,
}