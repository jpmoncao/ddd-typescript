export interface MailTo {
    nome: string;
    email: string;
}

export interface MailBody {
    html: string;
    textContent: string;
}

export interface MailGateway {
    sendMail(to: MailTo[], subject: string, body: MailBody): Promise<boolean | void>;
}