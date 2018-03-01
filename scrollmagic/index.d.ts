/**
 * Defines scrollmagic namespace
 */
declare namespace ScrollMagic
{
    /**
     * The main class that is needed once per scroll container.
     */
    class Controller
    {
        constructor(options?: ControllerOptions);

        /**
         * Add one ore more scene(s) to the controller.
         * This is the equivalent to `Scene.addTo(controller).`
         * @param {Scene|Scene[]} newScene ScrollMagic Scene or Array of Scenes to be added to the controller.
         */
        addScene(newScene: Scene|Scene[]): Controller;


        /**
         * Destroy the Controller, all Scenes and everything.
         * @param {boolean} resetScenes If `true` the pins and tweens (if existent) of all scenes will be reset.
         */
        destroy(resetScenes?: boolean): void;

        /**
         * Remove one ore more scene(s) from the controller.
         * This is the equivalent to `Scene.remove()`.
         * @param {Scene|Scene[]} scene ScrollMagic Scene or Array of Scenes to be removed from the controller.
         */
        removeScene(scene: Scene|Scene[]): Controller;

        /**
         * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.
         * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
         * @param {number|string|object|Scene|Function} scrollTarget The supplied argument can be one of these types: number,string,object,Scene,Function
         * @param {any} additionalParameter If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
         */
        scrollTo(scrollTarget: number|string|object|Scene|Function, additionalParameter?: any): Controller;

        /**
         * Updates the controller params and calls updateScene on every scene, that is attached to the controller.
         * See `Controller.updateScene()` for more information about what this means.
         * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.
         * The only application for this method is when ScrollMagic fails to detect these events.
         * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes. For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
         * @param {boolean} immediately If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
         */
        update(immediately?: boolean): Controller;

        /**
         * Update one ore more scene(s) according to the scroll position of the container.
         * This is the equivalent to `Scene.update()`.
         * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.
         * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
         * *__Note__: This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters.*
         * @param {Scene} Scene ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
         * @param {boolean} immediately If `true` the update will be instant, if `false` it will wait until next update cycle. This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
         */
        updateScene(Scene: Scene, immediately?: boolean): Controller;

        /**
         * __Set__ the current enabled state of the controller.
         * This can be used to disable all Scenes connected to the controller without destroying or removing them.
         * @param {boolean} newState The new enabled state of the controller `true` or `false`.
         */
        enabled(newState: boolean): Controller;

        /**
         * __Get__ the current enabled state of the controller.
         */
        enabled(): boolean;

        /**
         * __Set__ the current loglevel option value.
         * @param {number} newLoglevel The new loglevel setting of the Controller. `[0-3]`
         */
        loglevel(newLoglevel: number): Controller;

        /**
         * __Get__ the current loglevel option value.
         */
        loglevel(): number;

        /**
         * __Set__ a new method to calculate it.
         * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.
         * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.
         * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.
         * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.
         * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
         * @param {Function} scrollPosMethod The function to be used for the scroll position calculation of the container.
         */
        scrollPos(scrollPosMethod: Function): Controller;

        /**
         * __Get__ the current scrollPosition
         * When used as a getter this function will return the current scroll position.
         * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.
         * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
         */
        scrollPos(): number;
    }

    /**
     * An object containing one or more options for the controller.
     */
    interface ControllerOptions
    {
        /**
         * A selector, DOM object that references the main container for scrolling.
         */
        container?: string|object;

        /**
         * Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
         */
        vertical?: boolean;

        /**
         * These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see `ScrollMagic.Scene`.
         */
        globalSceneOptions?: SceneOptions;

        /**
         * Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
         *
         * - `0` => silent
         * - `1` => errors
         * - `2` => errors, warnings
         * - `3` => errors, warnings, debuginfo
         */
        loglevel?: 0|1|2|3;

        /**
         * Some changes don't call events by default, like changing the container size or moving a scene trigger element.
         * This interval polls these parameters to fire the necessary events.
         * If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
         */
        refreshInterval?: number;

        /**
         * If set to `true` every scene that is added to the controller will automatically get indicators added to it.
         */
        addIndicators?: boolean;
    }

    /**
     * A Scene defines where the controller should react and how.
     */
    class Scene
    {
        constructor(options?: SceneOptions);

        /**
         * Add the scene to a controller.
         * This is the equivalent to `Controller.addScene(scene)`.
         * @param {Controller} controller The controller to which the scene should be added.
         */
        addTo(controller: Controller): Scene;

        /**
         * __Get__ the associated controller.
         */
        controller(): Controller;

        /**
         * Destroy the scene and everything.
         * @param {boolean} reset If `true` the pin and tween (if existent) will be reset.
         */
        destroy(reset?: boolean): void;

        /**
         * __Set__ the scene's progress.
         * `enter` events will always trigger __before__ the progress update and `leave` envents will trigger __after__ the progress update.
         * `start` and `end` will always trigger at their respective position.
         * @param {number} progress The new progress value of the scene `[0-1]`.
         */
        progress(progress: number): Scene;

        /**
         * __Get__ the scene's progress.
         */
        progress(): number;

        /**
         * Updates dynamic scene variables like the trigger element position or the duration. This method is automatically called in regular intervals from the controller. See `ScrollMagic.Controller` option `refreshInterval`.
         *
         * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement. If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
         */
        refresh(): Scene;

        /**
         * Remove the scene from the controller.
         * This is the equivalent to `Controller.removeScene(scene)`. The scene will not be updated anymore until you readd it to a controller. To remove the pin or the tween you need to call removeTween() or removePin() respectively.
         */
        remove(): Scene;

        /**
         * Remove the class binding from the scene.
         * @param {booealn} reset If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
         */
        removeClassToggle(reset?: boolean): Scene;

        /**
         * Remove the pin from the scene.
         * @param {boolean} reset If `false` the spacer will not be removed and the element's position will not be reset.
         */
        removePin(reset?: boolean): Scene;

        /**
         * Define a css class modification while the scene is active.
         * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over. If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
         * @param {string|object} element A Selector targeting one or more elements or a DOM object that is supposed to be modified.
         * @param {string} classes One or more Classnames (separated by space) that should be added to the element during the scene.
         */
        setClassToggle(element: string|object, classes: string): Scene;

        /**
         * Pin an element for the duration of the tween.
         * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.
         * Make sure only one pin is applied to an element at the same time. An element can be pinned multiple times, but only successively. *__NOTE__: The option `pushFollowers` has no effect, when the scene duration is 0.*
         * @param {string|object} element A Selector targeting an element or a DOM object that is supposed to be pinned.
         * @param {PinOptions} settings Settings for the pin
         */
        setPin(element: string|object, settings?: PinOptions): Scene;

        /**
         * Updates the Scene to reflect the current state.
         * This is the equivalent to `Controller.updateScene(scene, immediately)`.
         * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.
         * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress. This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.
         * *__NOTE__: This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters.*
         * @param {boolean} immediately If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
         */
        update(immediately?: boolean): Scene;

        /**
         * __Set__ the duration option value. As a setter it also accepts a function returning a numeric value.
         * This is particularly useful for responsive setups.
         *
         * The duration is updated using the supplied function every time `Scene.refresh()` is called, which happens periodically from the controller (see ScrollMagic.Controller option `refreshInterval`).
         * *__NOTE__: Be aware that it's an easy way to kill performance, if you supply a function that has high CPU demand.
         * Even for size and position calculations it is recommended to use a variable to cache the value. (see example)
         * This counts double if you use the same function for multiple scenes.*
         *
         * @param {number|Function} newDuration The new duration of the scene.
         */
        duration(newDuration: number|Function): Scene;

        /**
         * __Get__ the duration option value. As a setter it also accepts a function returning a numeric value.
         */
        duration(): number;

        /**
         * __Set__ the current enabled state of the scene.
         * This can be used to disable this scene without removing or destroying it.
         * @param {boolean} newState The new enabled state of the scene `true` or `false`.
         */
        enabled(newState: boolean):Scene;

        /**
         * __Get__ the current enabled state of the scene.
         */
        enabled():boolean;

        /**
         * __Set__ the offset option value.
         * @param {number} newOffset The new offset of the scene.
         */
        offset(newOffset: number): Scene;

        /**
         * __Get__ the offset option value.
         */
        offset(): number;

        /**
         * __Set__ the reverse option value.
         * @param {boolean} newReverse The new reverse setting of the scene.
         */
        reverse(newReverse: boolean): Scene;

        /**
         * __Get__ the reverse option value.
         */
        reverse(): boolean;

        /**
         * __Set__ the triggerElement option value. Does __not__ fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
         * @param {string|object} newTriggerElement The new trigger element for the scene.
         */
        triggerElement(newTriggerElement: string|object): Scene;

        /**
         * __Get__ the triggerElement option value.
         */
        triggerElement(): string|object;

        /**
         * __Set__ the triggerHook option value.
         * @param {number} newTriggerHook The new triggerHook of the scene. See `Scene` parameter description for value options.
         */
        triggerHook(newTriggerHook: number): Scene;

        /**
         * __Get__ the triggerHook option value.
         */
        triggerHook(): number;

        /**
         * __Get__ the current scroll offset for the start of the scene.
         * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).
         * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
         */
        scrollOffset(): number;

        /**
         * __Get__ the current state.
         */
        state(): "BEFORE"|"DURING"|"AFTER";

        /**
         * __Get__ the trigger position of the scene (including the value of the `offset` option).
         */
        triggerPosition(): number;

        /**
         * Remove one or more event listener.
         * @param {string} names The name or names of the event that should be removed.
         * @param {(event: ScrollMagicEvent) => void} callback A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
         */
        off(names: string, callback?: (event: ScrollMagicEvent) => void): Scene;

        /**
         * Add one ore more event listener.
         * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
         * @param {string} names The name or names of the event the callback should be attached to.
         * @param {(event: ScrollMagicEvent) => void} callback A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
         */
        on(names: string, callback: (event: ScrollMagicEvent) => void): Scene;

        /**
         * Trigger an event.
         * @param {string} name The name of the event that should be triggered.
         * @param {object} vars An object containing info that should be passed to the callback.
         */
        trigger(name: string, vars?: object): Scene;

        /**
         * Add visual indicators for a `ScrollMagic.Scene`.
         * @param {IndicatorOptions} options
         */
        addIndicators(options?: IndicatorOptions): Scene;

        /**
         * Removes visual indicators from a `ScrollMagic.Scene`.
         */
        removeIndicators(): Scene;
    }

    /**
     * An object containing one or more options for the indicators.
     */
    interface IndicatorOptions
    {
        /**
         * A selector, DOM Object or a jQuery object that the indicators should be added to.
         * If undefined, the controller's container will be used.
         */
        parent?: string|object;

        /**
         * This string will be displayed at the start and end indicators of the scene for identification purposes. If no name is supplied an automatic index will be used.
         */
        name?: string;

        /**
         * Additional position offset for the indicators (useful, when having multiple scenes starting at the same position).
         */
        indent?: number;

        /**
         * CSS color definition for the start indicator.
         */
        colorStart?: string;

        /**
         * CSS color definition for the end indicator.
         */
        colorEnd?: string;

        /**
         * CSS color definition for the trigger indicator.
         */
        colorTrigger?: string;
    }

    /**
     * Settings for the pin
     */
    interface PinOptions
    {
        /**
         * If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.
         * Ignored, when duration is `0`.
         */
        pushFollowers?: boolean;

        /**
         * Classname of the pin spacer element, which is used to replace the element.
         */
        spacerClass?: string;
    }

    /**
     * Options for the Scene. The options can be updated at any time.
     * Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers globalSceneOptions option. The object accepts the same properties as the ones below.
     * When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in globalSceneOptions.
     */
    interface SceneOptions
    {
        /**
         * The duration of the scene. If `0` tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.
         * A function retuning the duration value is also supported. Please see `Scene.duration()` for details.
         */
        duration?: number|Function;

        /**
         * Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
         */
        offset?: number;

        /**
         * Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
         */
        triggerElement?: string|object;

        /**
         * Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.
         * Can also be defined using a string:
         *
         * - "onEnter" => 1
         * - "onCenter" => 0.5
         * - "onLeave" => 0
         */
        triggerHook?: number|"onEnter"|"onCenter"|"onLeave";

        /**
         * Should the scene reverse, when scrolling up?
         */
        reverse?: boolean;

        /**
         * Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
         *
         * - `0` => silent
         * - `1` => errors
         * - `2` => errors, warnings
         * - `3` => errors, warnings, debuginfo
         */
        loglevel?: 0|1|2|3;
    }

    /**
     * Event object for scrollmagic events
     */
    interface ScrollMagicEvent
    {
        currentTarget?: Scene;

        namespace?: string;

        progress: 0;

        scrollDirection?: "FORWARD"|"REVERSE";

        state?: "BEFORE"|"DURING"|"AFTER";

        target?: Scene;

        timestamp?: number;

        type?: EventType;
    }

    /**
     * Available event types
     */
    type EventType = "add"|"change"|"destroy"|"end"|"enter"|"leave"|"progress"|"remove"|"shift"|"start"|"update";
}

declare module "scrollmagic"
{
    export = ScrollMagic;
}