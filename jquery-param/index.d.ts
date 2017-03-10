declare module jqueryParam
{
    interface IJQueryParam
    {
        (obj: any): string;
    }
}

declare module "jquery-param"
{
    var param: jqueryParam.IJQueryParam;
    export = param;
}

