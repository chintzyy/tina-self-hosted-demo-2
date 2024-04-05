import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs";
import databaseClient from "../../../tina/__generated__/databaseClient";
import env from '../../../utils/env.mjs'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

const tinaRoutes = (req, res) => {
  // Modify the request here if you need to
  return handler(req, res);
};

export default tinaRoutes
