export const DNS = {
    host: 'https://11f7-186-146-169-56.ngrok.io/'
}

export const ROUTES = {
    LOGIN:`${DNS.host}api/user/singin`, //POST /api/user/singin
    // POST /api/user/singup
    NEWTICKET:`${DNS.host}api/tickets/new_ticket`,
    REGISTERSENSORCITIZEN: `${DNS.host}api/user/movil/register/usersensorhumano`,
    GETALERTSRISK: `${DNS.host}api/tickets/tickets`,
    GETMEALERTRISK: `${DNS.host}api/tickets/showbyuser`,
}