# Webpack

You can use javascript when building the app, it is just another module.

Using `process.env` entry you can access environment variables and also `vue` variables,
you can see [Environment variables](https://cli.vuejs.org/guide/mode-and-env.html#environment-variables).

`vue` can expose environment variables that can be also used on the app, just prefix it with `VUE_`:

The variables will automatically be accessible under `process.env.variableName` in your project. 
Loaded variables are also available to all vue-cli-service commands, plugins and dependencies.

You have a few options, this is from the Environment Variables and Modes documentation:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Remember, the variables defined in all those files will be from top to bottom order, just the latest will remain,
If we configure on `.env` the variable `X=hello` and we have on `.env.local` `X=bye`, then `X` variable will have `bye`
value.

Your `.env` file should look like this:

```
VUE_APP_MY_ENV_VARIABLE=value
VUE_APP_ANOTHER_VARIABLE=value
```

See also `vue.config.js` file.

# Vuetify

To simplify things, I will explain the configuration provided, you can go vuetify site and explore other configuration
options.

The main point is `@/plugins/vuetify.js`, and is imported like a normal file on the `main.js`. To avoid including names,
it will export what we need (instead export default, we use named export). This script will configure vuetify
and i18n (remember `{ x: x }` on ES6 is equivalent to `{ x }`).

As a requisite, we need to change vuetify SASS variables, so we need to change the way vuetify is configured.

We will use a webpack variable to know what type of vuetify configuration we will use: for example, on development, a user
does not need to override SASS variables, while a UI designer will need it.

The variable we need to configure is called SASS (you can change it, but remember to change it on all js files that 
is referenced),  and that variable will be ignored on production build (default to "sass").

This variable will be used to load `@/plugins/vuetify-nosass.js` or `@/plugins/vuetify-sass.js` file, both just configure 
vuetify in similar way, former configures vuetify by default and last with SASS variables.

You can change theme, theme colors, icons on `@/plugins/vuetify-options.js`, used by both variants.

I expose all variant colors that can be used on css via css variables: for example `.somestyle { color:  var(--v-primary-base); }`, 
will configure the color of the style with the primary color. 
If you change the primary color on `@/plugins/vuetify-options.js`, you don't need to change the style.

When I upload my branch, and you run the app, you can inspect html or body element and at the end you will see all css vars
vuetify configures (on styles). 

If you don't need css vars, just remove or comment out from `@/plugins/vuetify-options.js` the options entry:
```
    options: {
      customProperties: true
    },
```

I have included `@/styles/app.scss` file to override `href` color, vuetify set it to `primary` color, so I change it to be
`accent`.

You can configure in this file what you want to override, also use `import` another `scss` files.

## Fonts

I have include `Roboto` and `Montserrat` fonts in the applications to avoid `CORS` problems. The app will include all its
own resources.

You can use [google-webfonts-helper](http://google-webfonts-helper.herokuapp.com/fonts/montserrat?subsets=latin) to change 
to another font.

You need to create a `css` inside `@/css/` directory to configure the files.

Then download your font kit from [google-webfonts-helper](http://google-webfonts-helper.herokuapp.com/fonts/montserrat?subsets=latin),
adjust the `css`, and modify `@/styles/variables.scss` to include your font to vuetify use it:

```
$body-font-family: "Montserrat", sans-serif;
```

Remember, `vuetify` uses `Roboto` by default, so if your revert to `Roboto` font just comment previous entry from `@/styles/variables.scss`.

I only use `woff` and `woff2` variants, about 100% browsers support them, and you are not supporting older browsers like `ie11`,
so there is no need to include `ttf`, `eot`  and `svg` variants. 

Just drop the font files inside `@/fonts/` directory, do not drop `ttf`, `eot`and `svg` files.

Finally, go to `@/main.js` and import the new `css` font file:

```
import "@/css/font-montserrat.css";
```

# Icons

Instead loading a css font, we will use @mdi/js, the same but via javascript, it can be tree shacked, only
use icons we need, not all.

You can see [Material Design Icons - JS SVG](https://vuetifyjs.com/en/features/icons/#material-design-icons---js-svg).

I configure all my icons on `vuetify-icons.js` and expose it under a logic name, so if I need use one, just use
`$vuetify.icons.<name>`: this will give you the power of changing them in only one place and all references will be magically
changed.

You can see [MDI Icons](https://materialdesignicons.com/), then click on one and use the import from the dialog.

# Internazionalization - I18n

Instead setting all text inside your pages or components, we use `i18n` to make ui agnostic to translations, so
if we need to add a new one language, just copy/paste all resources from `en-US` version and just begin translate
each entry in each file.

Once the translation is include, then it is available at runtime, the ui don't need to be changed.

I have configured [Vue I18n](https://kazupon.github.io/vue-i18n/) on the project.

I also configure vuetify to use this plugin to be used for translation instead its built-in, just vuetify will
delegate all translations to the plugin.

You can see [Vuetify Vue I18n](https://vuetifyjs.com/en/features/internationalization/#vue-i18n).

I have included a small demo on home view, you can see what you can do.

## Configure I18n

There are 3 folders where i18n stuff goes: `data`, `i18n` and `lang`.

## Data folder

Here, we only have the file with all locales available `languages.yml`, just add a new one copy/paste and adjust.

I configure spanish as an example, just remove it when you want.

The convention is to use the name in camel case format but first letter upper case, for example:

- a file called app.yml will be referenced using `App.` prefix, each property inside it can be referenced with the literal name.
- a file inside a folder, will be referenced using the name: for example, the file `components/main-menu.yml` will 
be referenced with the prefix `Components.MainMenu.`, each property inside it can be referenced with the literal name.

I suggest you to create a structured folder, for example, one for components, another for menus, another for pages/views and so on.

Try to create generic ones as much as you can, so you don't need to repeat the same text multiple times. For example, If we have
a `buttons.yml` file, you can create inside it all variant texts, so when referencing a button text just use `$t("Buttons.ok")`,
`$t("Buttons.cancel")`, `$t("Buttons.copy")`, `$t("Buttons.paste")` and so on: just add these properties to `buttons.yml` and you 
are done.

## i18n folder

The file inside this directory do not need to be changed, it does all for you: just load default lang configured, the first one
on `language.yml` and exports some functions to change locale at runtime.

## lang folder

This folder will contain all translations for all available languages configured on `languages.yml`.

To add a new one, just copy `en-US` and paste renaming it to the new lang. Once copied, just change texts inside
each `yml` file. 


# Views / Pages + Router

You need to separate your views from your router as much as possible: we need a router with super powers (using Vue Router).

Imaging we are working and all people touching the router, we will have problems on merge, so we need a mechanism to
just drop the route (its script) in the router directory, and voila, we are done.

We must also think on composition as much as possible (not composition api), I refer this term as divide and conquer, not only
for pages/views also for any component.

First rule, keep your pages/views with the minimal markup, and use components to fill its own content. This way we can use lazy
load when page content is huge.

The router I configure, just traverse all `js` files inside router directory and configures vue router with the information it read.

Always use a directory for your pages/views, I use `views`: I have configured `HelloWorld` view as an example. You are
putting your views inside `components` folder, this is a problem, you need to go to router to see if it is a component or a view
or both.

There is an important thing about routes, if we have a huge amount of them, we are loading the views and its routes,
so the module will grow faster.

If we split the view and the route, we can load the view when the route requires it: using the webpack import magic function,
we can now load the views in an async fashion.

You can see on `@/router/post.js` file how can load the component using async.

When app routes grows, then the number can be huge, but all views are not included on the build, just a reference with a 
promise that will be resolved once the user goes to the route.
