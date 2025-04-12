import { mapContentToModel } from "@content-island/api-client";
import { client } from "../../lib/client";
import type { About } from "./about.model";

export async function getAbout(): Promise<About> {
  const aboutContent = await client.getContent(
    /**
     * TODO: IMPORTANTE PON EL ID QUE TENGAS EN TU INSTANCIA DE About en Content Island
     */
    /**
     * Para depurar se abre el JS terminal y se ejecuta normalmente habiendo
     * puesto breakpoints en el código.
     */
    "67dbd2133b104b916ae87526",
    {
      contentType: "About",
    },
  );

  return mapContentToModel<About>(aboutContent);
}
