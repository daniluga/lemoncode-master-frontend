# Launch Exercise

Follow these steps to launch the exercise via the terminal:

1. Open exercise folder in integrated terminal:

   ```bash
   cd path/to/exercise
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

That's it! You're ready to go.

# Switching styles in the project

This project allows you to switch between different styles by simply modifying the SCSS file.

## Instructions to switch styles

1. Open the file where the styles are defined (e.g., `mystyle.scss`).

2. Locate the following lines at the beginning of the file:

   ```scss
   @use "_base.scss" as base;
   @use "_base-red.scss" as styleBase; // Uncommented by default
   @use "_base-blue.scss" as styleBase; // Commented by default
   ```

3. To use \_base.blue.scss:
   ```scss
   @use "_base.scss" as base;
   // @use '_base-red.scss' as styleBase;
   @use "_base-blue.scss" as styleBase;
   ```
