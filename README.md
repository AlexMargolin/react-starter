## React Starter (2.1.0)

### Features:

1. Typescript
1. <a href="https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html">New JSX Transform</a>
1. Jest & React Testing Library
1. ESLint & Prettier
1. Scss support
1. `@/*` alias
   (can be used instead of `./src/*`)

### Environment Variables

Environment Variables can be loaded through .env.* files.

| File Name        | Condition                 |
|------------------|---------------------------|
| .env.development | Development Only (`dev`)  |
| .env.production  | Production Only (`build`) |
| .env             | Always                    |

> NOTE: variable names must be prefixed with `APP_`
> in order to be accessible through the App.

> eg: `APP_API_URL=https://www.api.domain.com`

### Scripts

1. `dev` run a local development server (webpack-dev-server)
1. `build` build the project for deployment
1. `test` run tests with Jest

<hr />

### Changelog

`2.0.0` - React 18

`1.3.0` - Separated Webpack scripts into separate files

`1.2.0` - Better Treeshaking support & Example `Chip` Ui component

`1.1.0` - Environment Variables support
