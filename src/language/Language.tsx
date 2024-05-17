

import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { locals } from "@/i18n/i18n";
import { useTranslation } from "react-i18next";

export function Language() {
    const {i18n} = useTranslation();
    const currLanguage = locals[i18n.language as keyof typeof locals];
    console.log(currLanguage,"currLanguage");
    
    const changeLanguage = (lng: 'en' | 'vi') => {
        i18n.changeLanguage(lng);
    }
    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline">{currLanguage}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-36">
            <div className="">
                <div className="flex flex-col space-y-2">
                    <button className="hover:bg-slate-200" onClick={() => changeLanguage('en')} >English</button>
                    <button className="hover:bg-slate-200" onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
                </div>
            </div>
        </PopoverContent>
        </Popover>
    )
}

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

// export function Language() {
//     return (
//         <Select>
//         <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="English" />
//         </SelectTrigger>
//         <SelectContent>
//             <SelectGroup>
//             <SelectItem value="apple">English</SelectItem>
//             <SelectItem value="banana">Tiếng Việt</SelectItem>
//             </SelectGroup>
//         </SelectContent>
//         </Select>
//     )
// }


