///<reference types="jquery" />
///<reference types="jqueryui" />
///<reference types="jquery.fancytree" />

interface JQuery {
    fancytree(option?: "getActiveNode"): Fancytree.FancytreeNode;
    fancytree(option?: "getTree"): Fancytree.Fancytree;
}

declare namespace Fancytree {
    interface Fancytree {
    }

    /** A FancytreeNode represents the hierarchical data model and operations. */
    interface FancytreeNode {
    }

    /** Context object passed to events and hook functions. */
    interface EventData {
    }

    /** The `this` context of any event function is set to tree's the HTMLDivElement  */
    interface FancytreeEvents {
    }

    interface FancytreeOptions extends FancytreeEvents {
        icon?: boolean|((event: any, data: EventData) => void);
    }

    /** Data object passed to FancytreeNode() constructor. Note: typically these attributes are accessed by meber methods, e.g. `node.isExpanded()` and `node.setSelected(false)`.  */
    interface NodeData {
    }

    /** Data object similar to NodeData, but with additional options.
      * May be passed to FancytreeNode#applyPatch (Every property that is omitted (or set to undefined) will be ignored)  */
    interface NodePatch {
    }

    /** May be passed to Fancytree#applyPatch. */
    interface TreePatch {
    }

    interface FancytreeStatic {
    }
}

