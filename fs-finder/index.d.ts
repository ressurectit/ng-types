// Type definitions for fs-finder v1.8.0
// Project: https://github.com/sakren/node-fs-finder
// Definitions by: Michael Zabka <https://github.com/misak113/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace FsFinder
{

    type AsyncFunction = (paths: string | string[]) => void;
    type Type = string; // 'all'|'directories'|'files'
    type Mask = string;
    type Directory = string;

    export interface IFinder
    {
        TIME_FORMAT: string; in (path: string): Finder;
        from(path: string): Finder;
        find(path: string, fn ? : AsyncFunction, type ? : Type): Finder;
        findFiles(path ? : string, fn ? : AsyncFunction): Finder;
        findDirectories(path ? : string, fn ? : AsyncFunction): Finder;
        findFile(path ? : string, fn ? : AsyncFunction): Finder;
        findDirectory(path ? : string, fn ? : AsyncFunction): Finder;
    }

    export class Finder extends Base
    {
        find(mask ? : Mask, fn ? : AsyncFunction, type ? : Type): string[];
        findFiles(mask ? : Mask, fn ? : AsyncFunction): string[];
        findDirectories(mask ? : Mask, fn ? : AsyncFunction): string[];
        findFile(mask ? : Mask, fn ? : AsyncFunction): string[];
        findDirectory(mask ? : Mask, fn ? : AsyncFunction): string[];
        size(operation ? : any, value ? : any): Finder;
        date(operation ? : any, value ? : any): Finder;
    }

    export class Base
    {
        recursively(recursive ? : boolean): Finder;
        exclude(excludes: string | string[], exactly ? : boolean): Finder;
        showSystemFiles(systemFiles ? : boolean): Finder;
        lookUp(up ? : boolean): Finder;
        findFirst(findFirst ? : boolean): Finder;
        filter(fn: Function): Finder;

        getPathsSync(type ? : Type, mask ? : Mask, dir ? : Directory): string[];
        getPathsAsync(fn: AsyncFunction, type ? : Type, mask ? : Mask, dir ? : Directory): void;

        checkExcludes(path: string): boolean;
        checkSystemFiles(path: string): boolean;
        checkFilters(path: string, stats: any): boolean;
        checkFile(path: string, stats: any, mask: Mask, type: Type): number;

        getPathsFromParentsSync(mask ? : Mask, type ? : Type): string[];
        getPathsFromParentsAsync(fn: AsyncFunction, mask ? : Mask, type ? : Type): void;
    }
}

declare module "fs-finder"
{
    var _tmp: FsFinder.IFinder;
    export = _tmp;
}