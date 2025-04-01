import { UsuarioService } from '../usuario.service';
declare const OAuth2Strategy_base: new (...args: [options: import("passport-oauth2").StrategyOptionsWithRequest] | [options: import("passport-oauth2").StrategyOptions]) => import("passport-oauth2") & {
    validate(...args: any[]): unknown;
};
export declare class OAuth2Strategy extends OAuth2Strategy_base {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    validate(accessToken: string): Promise<any>;
    private getUserInfo;
}
export {};
