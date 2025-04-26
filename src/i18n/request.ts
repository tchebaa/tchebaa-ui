import {getRequestConfig} from 'next-intl/server';
import { cookies, headers } from "next/headers";
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  
  const headersList = await headers();
  const cookiesList = await cookies();

  const defaultLocale = headersList.get("accept-language")?.split(",")[1];

  const newDefaultLocale = defaultLocale?.split(";")[0]

  console.log(newDefaultLocale, 'default')

  const locale = cookiesList.get("NEXT_LOCALE")?.value || newDefaultLocale || "en";

  console.log(locale, 'locale')


 
  return {
    locale,
    messages: (await import(`../app/assets/languages/${locale}.json`)).default
  };
});