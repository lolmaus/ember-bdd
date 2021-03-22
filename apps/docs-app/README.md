# docs-app

## Env Vars

#### Backend

* `EMBER_ROOT_URL` - sets the root url (folder) of the app deployment. Must start and end with "/". Non-existent and empty var is treated as "/". Example value: "/ember-bdd/".



#### Debugging

These variables are enabled when `true`, disabled by default.

* `EMBER_DEBUG_LOG_RESOLVER`
* `EMBER_DEBUG_LOG_ACTIVE_GENERATION`
* `EMBER_DEBUG_LOG_TRANSITIONS`
* `EMBER_DEBUG_LOG_TRANSITIONS_INTERNAL`
* `EMBER_DEBUG_LOG_VIEW_LOOKUPS`



## Dotenv files

Dotenv files are presets of configuration variables specified above.

A few are provided out of the box, you can create more as necessary.



#### Dotenv file naming convention

Dotenv file name schema contains two variable parts: `.env-<backend>-<debugging>`

* backend:
    * `dev`
    * `pages` — for deployment to GitHubPages

* debugging:
    * `normal` — debugging disabled, default
    * `debug` — debugging enabled

In order to invoke `ember s` or `ember b` with a dotenv file, use the `EMBER_DOTENV` env var.

For example, `EMBER_DOTENV=staging-normal ember` starts Ember picks env vars from the `.env-staging-normal` dotenv file.

The default dotenv file is `.env-mirage-normal`.



#### Choosing build env

The build environment, such as `devlopment` and `production` is used to determine params like **minification** and **fingerprinting**.

You should NOT use it as a refernce to a certain server. There are times when you want to run a dev build against a production server, and vice versa.

Since `ember-cli-dotenv` is unable to change the build environment on the go, you have to set it separately, e. g.:

    * `ember s` — development environment
    * `ember s -prod` — production environment

You can combine this with the dotenv file: `EMBER_DOTENV=staging-debug ember b -prod`.



#### Warning against prviate keys

Since dotenv files are committed to the codebase by default, you should think twice before including private keys into them.

Ideally, private keys should go into a gitignored dotenv file. Each developer could create their own without exposing their keys to everyone.

Unfortunately, `ember-cli-dotenv` does not support loading more than one dotenv file. This can be worked around by assembling a temporary file from several ones, but this hasn't been implemented yet.



## CI commands

* `yarn lint:ts` — checks the codebase for TypeScript issues.
* `yarn lint:eslint` — checks the codebase for linting issues, including TypeScript-specific ones.
* `yarn lint:hbs` — checks the templates for linting issues.
* `yarn lint:js` — runs `lint:ts` and `lint:eslint`.
* `yarn lint` — runs `lint:ts`, `lint:eslint` and `lint:hbs`.
* `yarn lint-staged` — runs `lint:eslint` and `lint:hbs` on git-staged files only, runs `lint:ts` on the whole codebase.
* `yarn dev-prod` — runs `ember s` against the production server in development mode. ⚠ Must be configured in `package.json`.
* `yarn dev-staging` — runs `ember s` against the staging server in development mode. ⚠ Must be configured in `package.json`.



## Git hooks

### pre-commit

The codebase is configured to run `lint-staged` (see above) on `pre-commit` hook.

It will prevent from committing unlinted code.

If you do need to commit unlinted code (e. g. to have your work-in-progress backed up), run `git commit` with the `-n` flag.

If you want to run the hook without the actual commit, `git add` your files and then run `yarn lint-staged`.



## Working with styles

This boilerplate uses [ember-css-modules](https://github.com/salsify/ember-css-modules) restricted to a compound file extension `.module.scss`.

This is because otherwise `ember-css-modules` treats all `.scss` files as modules, making it impossible to work with Sass partials in a conventional way. If you keep using partials wihtout resolving the problem, you will end up with duplicate CSS, likely without even realizing it.

This is the expected file structure of your app's components and pages:

```
app/
    components/
        my-component.hbs
        my-component.module.scss
        my-component.ts
        
    pods/
        my-route/
            controller.ts
            route.ts
            styles.module.scss
            template.hbs
```
