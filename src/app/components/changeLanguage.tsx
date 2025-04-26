import { cookies, headers } from "next/headers";
import {useTranslations} from 'next-intl';




export default function ChangeLanguage() {

  const t = useTranslations();


  const handleChangeLanguage = async () => {

    const cookieStore = await cookies()

    cookieStore.set('NEXT_LOCALE', 'fr')

  }
  

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
        

        <div onClick={()=> handleChangeLanguage()}>Change Language</div>
    
      
    </div>
  );
}
