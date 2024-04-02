## Todos Application

Created in NextJS using redux toolkit, redux toolkit query along with a custom server in ExpressJS

### Setup and Use

1. Clone the repository
2. Install all modules with `npm install`
3. Add an `.env.local` file based on the `.env.example`
4. Run `npm dev` to start the custom server locally
5. Log in with the specified credentials
6. Create, edit, delete your todos list

### Structure

Standard NextJS Approuter App, with redux toolkit support. Logic for the RTKQ parts are present in a feature wise format in the `lib` folder

Custom NextJS Express server to call the backend directly is present in the parent folder

Uses nodemon for monitoring along with HMR of NextJS

Uses latest Material UI components from React Mui [https://mui.com/]

Global CSS styles and JS styles are available for use

### Testing

-- For tests, check out the `__tests__` folder in the `app` directory

--It uses JEST along with react testing library to test the UI elements, with mock calls served from `msw`

--Has setup for redux and redux toolkit query to support the same

<sub><span style="color:red">Please do not use PORT 3000 to deploy the app, as it locally uses the server deployed on the part to interact</span>
Please take note, the NextJS router is quite slow sometimes in the development mode, especially on the first renders of the application</sub>
