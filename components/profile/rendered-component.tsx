"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { InvoiceTable } from ".";
import { InvoiceTableMobile } from "../dashboard/invoice-table-mobile";

export const RenderedComponent = () => {
  const params = useSearchParams();

  return params.get("tab") === "terms" ? (
    <div>
      <div className="flex flex-col items-start justify-between gap-2 pb-10 lg:flex-row lg:items-center lg:gap-5">
        <h3 className="text-blue-shade-1 text-xl font-semibold">
          Terms & conditions
        </h3>
        <p className="text-blue-shade-1/80 text-sm font-medium">
          Last Updated: February 23, 2024
        </p>
      </div>
      <p className={pClass}>
        <span>
          <span className={boldClass}>Thank you for visiting APEX.xyz. </span>
          By visiting, accessing, or using APEX.xyz and associated application
          program interface or mobile applications (“APEX Platform”), you
          (“User”, “user”, “You” or “you”) consent to the Terms of Service
          (these “Terms”), so please read them carefully.
        </span>
        <span>
          The Terms constitute the agreement and understanding regarding the use
          of any or all of the Services, and any manner of accessing them,
          between you and the following service providers (“we,” “us” or “our”)
          depending on your residency and date of registration:
        </span>
        <span>
          <span className={boldClass}>OKCoin Europe LTD, </span>a Malta limited
          liability company (“OKC EU”), which operates under the APEX brand, for
          Users who are residents of one of our approved operating locations
          within the European Economic Area. The Terms of Service for such users
          can be found here;
        </span>
        <span>
          <span className={boldClass}>
            APEX Bahamas FinTech Company Limited,{" "}
          </span>
          a Bahamas registered company (“APEX Bahamas”), for Users who are
          residents of Mexico and who registered between November 16, 2022 and
          August 28, 2023, and institutional Users who are registered on or
          after August 29, 2023;
        </span>
        <span>
          <span className={boldClass}>
            APEX Hong Kong FinTech Company Limited,{" "}
          </span>
          a Hong Kong registered company (“APEX HK”), for Users who are
          residents of Hong Kong and who registered on or after May 15, 2023;
        </span>
        <span>
          <span className={boldClass}>APEX Serviços Digitais Ltda., </span>a
          Brazil limited liability company (“APEX Brazil”), for Users who are
          residents of Brazil and who registered on or after June 15, 2023;
        </span>
        <span>
          <span className={boldClass}>APEX SG Pte. Ltd., </span>a Singapore
          limited liability company (“APEX Singapore”), for Users who are
          residents of Singapore and who registered on or after October 13,
          2023;
        </span>
        <span>
          <span className={boldClass}>Aux Cayes FinTech Co. Ltd., </span>a
          Seychelles registered company (“Aux Cayes”), for all other Users
          eligible to access and use APEX&apos;s Services.
        </span>
        <span>
          Where the term “APEX” is used in these Terms, it shall mean either OKC
          EU, APEX Bahamas, APEX HK, APEX Brazil, APEX Singapore, or Aux Cayes
          as the case may be for their respective Users.
        </span>
      </p>
      <h2 className="py-8 text-xl font-semibold leading-5 text-black">
        2 ELIGIBILITY AND PROHIBITION OF USING OUR SERVICES & BUSINESS
      </h2>
      <p className={pClass}>
        <span>
          <span className={boldClass}>2.1 </span>
          The Services are intended solely for Users who are Natural Persons
          aged 18 or older. If you are a Natural Person, by accessing or using
          our Services, you represent and warrant that you are at least 18 years
          old. If you are registering to use the Service(s) on behalf of a legal
          entity (e.g. corporate or institutional customers), you represent and
          warrant that such legal entity is duly organized and validly existing
          under the applicable laws of the jurisdiction of its organization; you
          are duly authorized by such legal entity to act on its behalf, such
          legal entity agrees to be responsible to us if you violate these
          Terms, and you have not previously been suspended or removed from the
          APEX Platform or Services. You also represent and warrant that you are
          not on and that you will not transact with anyone on any trade or
          economic sanctions lists of any Competent Authority, which includes
          without limitation: Terrorism and terrorist financing - Islamic State
          in Iraq and the Levant (Da&apos;esh), Al-Qaida, the Taliban, and
          associated individuals, groups, undertakings, and entities, any
          individual or entity designated by the United Arab Emirates
          (&ldquo;Local Terrorism List&rdquo;); and the financing of
          proliferation of weapons of mass destruction (WMDs) - Democratic
          People&apos;s Republic of Korea: nuclear-related, other weapons of
          mass destruction-related, and ballistic missile-related programs;
          Islamic Republic of Iran: nuclear program; and other sanction lists
          that may be promulgated by a Competent Authority, including but not
          limited to the United Nations Security Council, European Union, the
          Monetary Authority of Singapore, Hong Kong Monetary Authority, Hong
          Kong Customs and Excise Department, or Office of Foreign Asset
          Control. You agree to provide written certification of your compliance
          of this Clause 2.1 as soon as reasonably practicable when requested by
          us.
        </span>
        <span>
          <span className={boldClass}>2.2 </span>
          Note that we may not make all of the Services available in all markets
          and jurisdictions, and may restrict or prohibit use of all or a
          portion of the Services from Restricted Locations, which at this time
          include Hong Kong (specifically regarding our derivatives-related
          Services), Belgium, Cuba, France and its overseas territories
          including Guadeloupe, French Guiana, Martinique, Mayotte, La Réunion,
          Saint Barthélemy, Saint-Martin, Saint-Pierre-et-Miquelon, French
          Southern and Antarctic Lands, French Polynesia, Wallis and Futuna, and
          New Caledonia, Iran, India, Japan, North Korea, Malaysia, Singapore
          (specifically regarding our Margin and derivatives related Services),
          Syria, the People&apos;s Republic of China, the United States of
          America including all U.S.A. territories like Puerto Rico, American
          Samoa, Guam, Northern Mariana Island, and the US Virgin Islands (St.
          Croix, St. John and St. Thomas), the Bahamas, Canada, the Netherlands,
          the United Kingdom (specifically regarding our derivatives-related
          Services for retail users), Ireland, Bangladesh, Bolivia, Crimea,
          Donetsk and Luhansk of Ukraine, Uzbekistan and Malta. The content of
          the Terms shall not be excluded from the laws of the country or region
          under which the user belongs. As a result, if you do not meet these
          eligibility requirements, do not use our Services. Residents of
          Belgium, France, Ireland, Japan, the Bahamas and the Netherlands are
          not permitted to open new accounts at APEX or access the Services if
          they have not yet opened an account.
        </span>
      </p>
    </div>
  ) : (
    <>
      <InvoiceTable />
      <InvoiceTableMobile />
    </>
  );
};

const pClass =
  "flex flex-col gap-3 whitespace-pre-wrap break-words text-sm font-medium leading-6";

const boldClass = "font-bold";
