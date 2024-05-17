import { BadgeDollarSign } from "lucide-react";
import { RadioTower } from 'lucide-react';
import { UserCheck } from 'lucide-react';
import { PhoneForwarded } from 'lucide-react';
import { HandPlatter } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function WhyChosseTravel() {
  const {t} = useTranslation();
  return <div className='mx-auto mb-20 max-w-7xl '>
    <h2 className="mb-10 text-4xl font-semibold text-black"> {t("title")} </h2>
    <div>
      <div className="flex justify-between text-center">
        <div className="">
          <div className="flex justify-center mb-6 text-blue-500"> <RadioTower className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">{t("Tour_network_2")} </h4>
          <p className="mb-1"> {t("Tour_network_2")}</p>
          <p> {t("Tour_network_2")}</p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <BadgeDollarSign className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">{t("Pay")} </h4>
          <p>{t("Pay_1")} </p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <PhoneForwarded className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">{t("Book_tour")}</h4>
          <p>{t("Book_tour_1")} </p>
        </div>
      </div>

      <div className="flex justify-between mt-10 text-center">
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <HandCoins className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">{t("Price")} </h4>
          <p>{t("Price_1")}</p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <HandPlatter className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">{t("Products")} </h4>
          <p>{t("Products_1")} </p>
        </div>
        <div>
        <div className="flex justify-center mb-6 text-blue-500"> <UserCheck className="w-20 h-20"  /></div>
          <h4 className="mb-4 text-xl font-semibold text-black">{t("Support")} </h4>
          <p>{t("Support1")} </p>
        </div>
      </div>
    </div>
  </div>;
}
