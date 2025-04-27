import { NextRequest } from "next/server";
import {i18nRouter} from 'next-i18n-router'
import i18Config from "./i18nConfig"

export function middleware (request: NextRequest) {

    return i18nRouter(request, i18Config)

}


export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  };