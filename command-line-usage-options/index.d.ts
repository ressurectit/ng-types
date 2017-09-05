declare module "command-line-usage-options"
{
    import {OptionDefinition} from 'command-line-args';
    
    /**
     * Extended options for usage displaying
     */
    export interface UsageOptionDefinition extends OptionDefinition
    {
        /**
         * Description of option
         */
        description: string;
    
        /**
         * Better description of type
         */
        typeLabel?: string;
    }
    
    /**
     * Extended options for usage displaying
     */
    export interface UsageOptionDefinition extends OptionDefinition
    {
        /**
         * Description of option
         */
        description: string;
    
        /**
         * Better description of type
         */
        typeLabel?: string;
    }
    
    /**
     * Base section which serves as parameter for command line usage
     */
    export interface Section
    {
        /**
         * The section header, always bold and underlined.
         */
        header: string,
    }
    
    /**
     * A Content section comprises a header and one or more lines of content.
     */
    export interface Content extends Section
    {
        /**
         * Overloaded property, accepting data in one of four formats:
         *
         *  1. A single string (one line of text)
         *  2. An array of strings (multiple lines of text)
         *  3. An array of objects (recordset-style data). In this case, the data will be rendered in table format. The property names of each object are not important, so long as they are consistent throughout the array.
         *  4. An object with two properties - data and options. In this case, the data and options will be passed directly to the underlying table layout module for rendering.
         */
        content: string|string[]|any[];
    
        /**
         * Set to true to avoid indentation and wrapping. Useful for banners.
         */
        raw?: boolean;
    }
    
    /**
     * A OptionList section adds a table displaying details of the available options.
     */
    export interface OptionList
    {
        /**
         * an array of option definition objects. In addition to the regular definition properties, command-line-usage will look for:
         *
         *  - description - a string describing the option.
         *  - typeLabel - a string to replace the default type string (e.g. <string>). It's often more useful to set a more descriptive type label, like <ms>, <files>, <command> etc.
         */
        optionList: UsageOptionDefinition[];
    
        /**
         * If specified, only options from this particular group will be printed.
         */
        group?: string|string[];
    
        /**
         * The names of one of more option definitions to hide from the option list.
         */
        hide?: string|string[];
    }
}