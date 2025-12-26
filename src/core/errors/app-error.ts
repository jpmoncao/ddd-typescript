/**
 * Padronização de erros conforme RFC 9457 (Problem Details for HTTP APIs - [https://www.rfc-editor.org/rfc/rfc9457.html])
 * @param type https://www.rfc-editor.org/rfc/rfc9457.html#name-type
 * @param status https://www.rfc-editor.org/rfc/rfc9457.html#name-status
 * @param title https://www.rfc-editor.org/rfc/rfc9457.html#name-title
 * @param detail https://www.rfc-editor.org/rfc/rfc9457.html#name-detail
 * @param instance https://www.rfc-editor.org/rfc/rfc9457.html#name-instace 
 * @param extensionMembers https://www.rfc-editor.org/rfc/rfc9457.html#name-extension-members
 */
export abstract class AppError<T = Record<string, any>> extends Error {
    public readonly type: string;
    public readonly status: number;
    public readonly title: string;
    public readonly detail: string;
    public readonly instance?: string;
    public readonly extensionMembers?: T;

    constructor(props: {
        status: number;
        title: string;
        detail: string;
        type?: string;
        instance?: string;
        extensionMembers?: T;
    }) {
        super(props.detail);
        this.status = props.status;
        this.title = props.title;
        this.detail = props.detail;
        this.instance = props.instance;

        this.type = props.type || 'about:blank';
        this.extensionMembers = props.extensionMembers;
    }

    public toJSON() {
        return {
            type: this.type,
            status: this.status,
            title: this.title,
            detail: this.detail,
            instance: this.instance,
            ...(this.extensionMembers || {})
        };
    }
}