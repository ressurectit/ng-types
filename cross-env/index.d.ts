declare namespace CrossEnv
{
    export interface CrossEnvFn
    {
        /**
         * Runs command in node environment with defined ENV variable
         * @param args Arguments passed to command, typically used 'process.argv.slice(2)'
         * @param options Optional options allowing specifying that shell should be used
         */
        (args: string[], options?: {shell?: boolean}): void;
    }
}

declare module "cross-env"
{
    var _tmp: CrossEnv.CrossEnvFn;

    export = _tmp;
}