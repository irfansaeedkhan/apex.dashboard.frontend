import React from "react";

/**
 * Round 1: this page used to contain copied OKX terms (OKCoin Europe
 * LTD, APEX Bahamas FinTech, APEX Hong Kong FinTech, APEX SG, dated
 * February 23, 2024). None of that belongs to Apex Order, so it was
 * replaced with Apex Order terms. No licence number, registration
 * number, or legal entity detail is stated here, because none is on
 * record in the repository; full legal clearance is an Irfan decision.
 * Last updated is the real date of this rewrite.
 */
const sections: { title: string; body: string }[] = [
  {
    title: "1. Who these terms are for",
    body: "These terms apply to your use of the Apex Order platform, including the dashboard, virtual office spaces, meta assets, and referral features. By creating an account or using the platform, you agree to these terms. If you do not agree, do not use the platform.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old to use the platform. You are responsible for making sure your use of the platform is lawful in your jurisdiction.",
  },
  {
    title: "3. Your account",
    body: "You are responsible for keeping your sign-in details private and for everything that happens under your account. Tell support promptly if you believe your account has been accessed without your permission. You must not share your account, sell it, or use another person's account.",
  },
  {
    title: "4. What the platform does",
    body: "Apex Order offers virtual office spaces and related digital assets, with referral rewards and a dashboard for tracking your activity. Features and availability may change over time. Any purchase, reward rate, or fee is shown to you before you confirm it, and the figures shown at confirmation are the ones that apply.",
  },
  {
    title: "5. Deposits and withdrawals",
    body: "Deposit addresses are shown with their network. You must only send funds on the network named for that address. Funds sent on the wrong network, or to an address shown for a different network, may be lost and may not be recoverable. Withdrawals are processed to the address you provide, so check the address and network carefully before confirming.",
  },
  {
    title: "6. Referrals",
    body: "You may share your referral code with people who are not already platform users. Rewards are calculated from the referral figures shown on your dashboard. Misuse of the referral system, including fake accounts, may lead to rewards being withheld and your account being restricted.",
  },
  {
    title: "7. Acceptable use",
    body: "You must not use the platform for fraud, money laundering, or any unlawful purpose, and you must not interfere with the platform, scrape it in bulk, or try to bypass its security. We may restrict or close an account that breaks these terms.",
  },
  {
    title: "8. Intellectual property",
    body: "The platform, its design, and its content belong to Apex Order or its licensors. You may use them only as part of using the platform. You must not copy, resell, or reuse them outside the platform without permission.",
  },
  {
    title: "9. Liability",
    body: "The platform is provided as is. To the extent permitted by law, Apex Order is not liable for losses caused by your own actions, by wrong-network transfers, or by events outside its reasonable control. Nothing in these terms limits liability that cannot lawfully be limited.",
  },
  {
    title: "10. Changes to these terms",
    body: "We may update these terms from time to time. The version shown on this page is the current one, and the last updated date is shown at the top. Continued use of the platform after an update means you accept the updated terms.",
  },
  {
    title: "11. Contact",
    body: "For questions about these terms, contact support through the support channel shown on the dashboard.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-semibold text-blue-shade-1">
        Terms of Service
      </h1>
      <p className="text-sm text-blue-shade-1 opacity-60">
        Apex Order. Last updated October 29, 2026.
      </p>
      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-blue-shade-1">
            {section.title}
          </h2>
          <p className="text-sm leading-6 text-blue-shade-1 opacity-80">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}
