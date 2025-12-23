export interface EntregaDespachadaVariables {
    nomeDestinatario: string;
    idEntrega: string;
    linkRastreio?: string;
}

export function getEntregaDespachadaTemplate(vars: EntregaDespachadaVariables): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
        <style>
            .container { font-family: "DM Sans", sans-serif; max-width: 600px; margin: 0 auto; }
            .header { background-color: #ff8724ff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Sua entrega está a caminho! 🚚</h1>
            </div>
            <div class="content">
                <p>Olá, <strong>${vars.nomeDestinatario}</strong>!</p>
                <p>Sua encomenda identificada pelo código <strong>#${vars.idEntrega}</strong> já saiu para entrega!</p>
                <p>Aguarde, logo ela chegará segura até você.</p>
                <br/>
                <p>Atenciosamente,<br/>Equipe Logistics</p>
            </div>
            <div class="footer">
                <p>Este é um email automático, não responda.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}