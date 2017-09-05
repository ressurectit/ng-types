declare module "command-line-usage"
{
    import {Section} from 'command-line-usage-options';

    /**
     * Returns options as help string
     * @param {commandLineUsage.Section[]|commandLineUsage.Section} sections Sections that will be displayed
     * @returns {object}
     * @alias module:command-line-usage
     */
    function commandLineUsage(sections: Section[]|Section): any;

    export = commandLineUsage;
}