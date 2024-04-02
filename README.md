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

### App Snapshots
<img width="1680" alt="Screenshot 2024-04-02 at 8 51 53 AM" src="https://github.com/harzkr/todos-kh/assets/11775091/4c3af409-6bc4-4b32-9c25-5d87946fd3b6">
<img width="1679" alt="Screenshot 2024-04-02 at 8 52 05 AM" src="https://github.com/harzkr/todos-kh/assets/11775091/747de0a9-7e3c-4780-8c5c-01f5e981ce82">
<img width="1678" alt="Screenshot 2024-04-02 at 8 53 00 AM" src="https://github.com/harzkr/todos-kh/assets/11775091/15f868b4-4485-4a16-99d5-7da86143c166">
<img width="1680" alt="Screenshot 2024-04-02 at 8 53 27 AM" src="https://github.com/harzkr/todos-kh/assets/11775091/2707e22b-e3d2-4c0b-9c28-280fbcf38249">

