import { createRoot } from "react-dom/client";
import { HelloComponent } from "./hello-component";

const root = createRoot(document.getElementById("root"));
root.render(<HelloComponent />);
