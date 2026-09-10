const demoUser = {
  Email: "demo@apex.local",
  Name: "Avery",
  Surname: "Morgan",
  AffiliateCode: "APEX-DEMO",
  WalletAddress: "0x381E97Fb7531BF0E1795B02fa9Db203940B78D10",
  PasswordResetAt: "",
  Auth_Token: "demo-access-token",
  refresh_token: "demo-refresh-token",
};

const today = "2026-09-05";

const dashboard = {
  Available_Balance: 8420.5,
  Company_Lands_Value: 136000,
  Contract_Expiry_Date: "2027-05-30",
  Contract_Start_Date: "2024-05-30",
  Equity_Percentage: 12.5,
  Lands_Value: 42800,
  Minted_Lands: 136,
  Number_of_Pages: 2,
  Onwhitdraw_balance: 1200,
  Page_size: 5,
  Owned_Lands: 42,
  ROI_Last_Month: 3.8,
  ROI_Until_Now: 18.4,
  Supply_Max: 12000,
  Wallet_Address: demoUser.WalletAddress,
  return_stats_arrays: [
    {
      year: "2025",
      percentages: [
        { January: 2.1 },
        { February: 2.5 },
        { March: 2.7 },
        { April: 3.4 },
        { May: 2.2 },
        { June: 3.1 },
        { July: 3.3 },
        { August: 2.8 },
        { September: 3.6 },
        { October: 3.8 },
        { November: 4.1 },
        { December: 4.4 },
      ],
    },
    {
      year: "2026",
      percentages: [
        { January: 3.2 },
        { February: 3.6 },
        { March: 4.1 },
        { April: 4.6 },
        { May: 4.2 },
        { June: 4.8 },
        { July: 5.1 },
        { August: 5.4 },
        { September: 5.8 },
        { October: 6.1 },
        { November: 6.4 },
        { December: 6.8 },
      ],
    },
  ],
  transactions_list: [
    { Amount: 2400, Status: "Approved", Transaction_Date: today, Transaction: "Meta asset purchase", TxHash: "0x8f2a...91bc", Type: "Deposit" },
    { Amount: 680, Status: "Pending", Transaction_Date: "2026-09-02", Transaction: "Monthly withdrawal", TxHash: "0x1a6d...70fe", Type: "Withdrawal" },
    { Amount: 1250, Status: "Approved", Transaction_Date: "2026-08-28", Transaction: "Referral commission", TxHash: "0x4ce1...0a92", Type: "Deposit" },
    { Amount: 940, Status: "Approved", Transaction_Date: "2026-08-20", Transaction: "Meta asset purchase", TxHash: "0x7d3e...bb1a", Type: "Deposit" },
    { Amount: 300, Status: "Rejected", Transaction_Date: "2026-08-14", Transaction: "Withdrawal request", TxHash: "0x2b11...ce40", Type: "Withdrawal" },
  ],
};

const rewards = [
  { Amount: 1250, Date: "2026-08-28", Type: "Sale" },
  { Amount: 680, Date: "2026-08-21", Type: "Referral" },
  { Amount: 940, Date: "2026-08-12", Type: "Sale" },
  { Amount: 420, Date: "2026-08-03", Type: "Referral" },
];

const affiliates = Array.from({ length: 8 }, (_, index) => ({
  name: ["Maya", "Jordan", "Sam", "Taylor", "Casey", "Riley", "Quinn", "Drew"][index],
  surName: ["Chen", "Ellis", "Patel", "Brooks", "Rivera", "Kim", "Adams", "Stone"][index],
  email: `member${index + 1}@apex.local`,
  MetaAsset_Purchased: [2, 1, 3, 2, 4, 1, 2, 3][index],
  Royalty: [184, 96, 246, 132, 318, 84, 156, 224][index],
}));

const leaderboard = Array.from({ length: 10 }, (_, index) => ({
  ImageProfileUrl: "",
  Position: index + 1,
  Score: 9800 - index * 643,
  Username: ["Avery", "Nova", "Atlas", "Sage", "Orion", "Mila", "Kai", "Luna", "Theo", "Iris"][index],
  WalletAddress: `0x${(index + 1).toString(16).padStart(2, "0")}a7c...${(91 - index).toString(16)}e2`,
}));

const invoices = [
  { Amount: 1000, Date: "2026-08-18", Duration: 36, Qty: 2, SinglePackCost: 1000, TotalAmount: 2000 },
  { Amount: 1000, Date: "2026-06-10", Duration: 36, Qty: 1, SinglePackCost: 1000, TotalAmount: 1000 },
  { Amount: 1000, Date: "2026-04-02", Duration: 36, Qty: 3, SinglePackCost: 1000, TotalAmount: 3000 },
];

export const demoProfile = { ...demoUser, Phone: "+1 555 010 2026", Country: "United States" };

export function getMockResponse(url = "", method = "get", config: any = {}) {
  const path = url.split("?")[0].replace(/^\//, "");
  const offset = Number(config?.params?.offset ?? 0);
  const page = Number(config?.params?.Page ?? config?.data?.Page ?? Math.floor(offset / 5) + 1);

  if (path === "auth/login") return demoUser;
  if (path === "auth/register") return { ...demoUser, message: "Demo account created" };
  if (path === "me") return demoUser;
  if (path === "profile/profile") return demoProfile;
  if (path === "Dashboard") return dashboard;
  if (path === "showorderinfo") return { SinglePackCost: 1000, SinglePackDuration: 36, StartDate: "2026-07-03" };
  if (path === "RevenuesHistory") return { Number_of_Pages: 1, Page_size: 5, RevenuesHistory: rewards };
  if (path === "user/referrals/count") return 12;
  if (path === "user/referrals") return { offset: (page - 1) * 5, limit: 5, total: affiliates.length, data: affiliates.slice((page - 1) * 5, page * 5) };
  if (path === "LeaderBoard") return { Number_of_Pages: 2, LeaderBoard: leaderboard.slice((page - 1) * 5, page * 5) };
  if (path === "Invoices") return { Number_of_Pages: 1, Invoices: invoices };
  if (path === "auth/refresh-token") return { accessToken: demoUser.Auth_Token, refreshToken: demoUser.refresh_token };
  if (path === "auth/logout" || method === "delete") return { success: true };
  return { success: true, message: "Demo action completed" };
}