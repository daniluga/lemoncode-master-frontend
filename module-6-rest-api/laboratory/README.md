# Launch Exercises

Follow these steps to launch the exercise via the terminal:

1. Open exercise folder in integrated terminal and install dependencies:

   ```bash
   cd path/to/exercise
   npm install
   ```

2. Open mock server folder and install dependencies

   ```bash
   cd path/to/exercise/server
   npm install
   ```

3. Go back to exercise folder and run

   ```bash
   cd ..
   npm run start
   ```

4. Once it starts, check your browser and use ENV variables for testing the application.

## Environment Variables

You can configure the behavior of the app using the following environment variables:

| Variable Name          | Default | Description                                            |
| ---------------------- | ------- | ------------------------------------------------------ |
| `VITE_USE_MOCK_SERVER` | `false` | If `true`, uses a mock server instead of the real API. |
| `VITE_USE_GRAPHQL`     | `false` | If `true`, uses GraphQL instead of REST API calls.     |

### Example `.env` file

You can create a `.env` file in the root of your project with the following content:

```env
VITE_USE_MOCK_SERVER=true
VITE_USE_GRAPHQL=true
```

You will have available a `.env.example` file, just update it's name to `.env` 😉.

That's it! You're ready to go.
