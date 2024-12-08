# Switching styles in the project

This project allows you to switch between different styles by simply modifying the SCSS file.

## Instructions to switch styles

1. Open the file where the styles are defined (e.g., `mystyle.scss`).

2. Locate the following lines at the beginning of the file:
   ```scss
   @use '_base-red.scss' as base; // Uncommented by default
   @use '_base-blue.scss' as base; // Commented by default
    ```

3. To use _base.blue.scss:
    ```scss
   // @use '_base-red.scss' as base;
   @use '_base-blue.scss' as base;
   ```