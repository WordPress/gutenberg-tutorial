/**
 * Retrieves the translation of text.
 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
 */
var __ = wp.i18n.__;

/**
 * Returns a new element of given type. Element is an abstraction layer atop React.
 * @see https://github.com/WordPress/gutenberg/tree/master/element#element
 */
var el = wp.element.createElement;

/**
 * When a first argument to `el`, creates a Fragment element, which the sidebar API uses
 * @see https://github.com/WordPress/gutenberg/tree/master/element
 */
var Fragment = wp.element.Fragment;

/**
 * The element type for a sidebar to replace the default, for data display, etc
 * @see https://github.com/WordPress/gutenberg/tree/master/edit-post#pluginsidebar
 */
var PluginSidebar = wp.editPost.__experimental.PluginSidebar;

/**
 * Element type for adding and element to the more (three vertical dot) menu, to allow showing of sidebar
 * @see https://github.com/WordPress/gutenberg/tree/master/edit-post#pluginmoremenuitem
 */
var PluginMoreMenuItem = wp.editPost.__experimental.PluginMoreMenuItem;

/**
 * We're creating a component which we will pass to the plugin API. This component is a Fragment chuck which contains
 *      two other components: our PluginSidebar (included its content, here mostly filler), and the PluginMoreMenu
 *      element, which will allow people to trigger and view our sidebar under the "More" (three vertical dots) menu.
 */
var Ex3Component = function() {
    return el(
        Fragment,
        null,
        el(
            PluginSidebar,
            {
                // unique name for the sidebar
                name: 'ex3-sidebar',
                // PluginSidebar's title shows on element to the left of the closing "X"
                title: __( 'Ex3 Sidebar', 'learn-gutenberg' )
            },
            el(
                'h2',
                null,
                __( 'This is a title', 'learn-gutenberg' )
            ),
            el(
                'p',
                null,
                __( 'This is a paragraph. Probably we would have some cool functionality here.', 'learn-gutenberg' )
            )

        ),
        el(
            PluginMoreMenuItem,
            {
                // Name identifies the menu item, must be unique
                name: 'ex3-sidebar-selector',
                // icon is Dashicon slug or SVG shown to the left of title, replaced by a checkmark when sidebar shows
                icon: 'star-filled',
                // Type explains how to group the More menu, `sidebar` is the only option right now
                type: 'sidebar',
                // The target must match the name of your PluginSidebar element
                target: 'ex3-sidebar'
            },
            // The contents of the element is the name that'll show in the dropdown
            __( 'Ex3 Sidebar', 'learn-gutenberg' )
        )
    )
};

/**
 * Create a plugin, which is required for showing our sidebar and more menu markup
 *      The second, settings argument, only has a `render` argument, which wants our component (Fragment)
 * @see https://github.com/WordPress/gutenberg/tree/master/plugins#plugins-api
 */
wp.plugins.registerPlugin(
    // Plugin names should NOT have a prefix or slash, must be unique
    'learn-gutenberg-ex3-sidebar',
    { render: Ex3Component }
);