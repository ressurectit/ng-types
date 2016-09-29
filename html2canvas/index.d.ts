declare module Html2CanvasModule
{
    interface Html2CanvasOptions
    {
        background?: string;
        height?: number;
        width?: number;
        timeout?: number;
    }
    
    interface Html2Canvas
    {
        (body: HTMLElement, options?: Html2CanvasOptions): Promise<HTMLCanvasElement>;
    }
}

declare module "html2canvas" 
{
    var _tmp: Html2CanvasModule.Html2Canvas;
    
    export = _tmp;
}