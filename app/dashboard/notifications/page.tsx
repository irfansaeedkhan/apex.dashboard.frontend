"use client";

import { useState } from "react";
import { Notifications } from "@/assets/svgs";

const initialNotifications = [
  {
    id: 1,
    title: "Reward credited",
    message: "Your August referral reward of 680 USDT is now available.",
    date: "Today, 09:42",
    unread: true,
  },
  {
    id: 2,
    title: "Withdrawal approved",
    message: "Your withdrawal request has been approved and is being processed.",
    date: "Yesterday, 16:18",
    unread: true,
  },
  {
    id: 3,
    title: "New month, new opportunities",
    message: "Explore the latest meta asset packages in your dashboard.",
    date: "28 Aug 2026",
    unread: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  const markAllAsRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, unread: false })));
  };

  const dismiss = (id: number) => {
    setNotifications((items) => items.filter((item) => item.id !== id));
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-blue-shade-1 p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Inbox</p>
          <h1 className="font-bai-jamjuree text-3xl font-semibold">Notifications</h1>
          <p className="mt-2 max-w-lg text-sm text-white/70">Keep up with your rewards, account activity, and Apex updates.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-white/10 px-3 py-2 text-sm">{unreadCount} unread</span>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-shade-1 transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <article
              key={notification.id}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-shade-1/10">
                <Notifications className="size-5 fill-blue-shade-1" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-black-shade-2">{notification.title}</h2>
                  {notification.unread && <span className="size-2 rounded-full bg-green-500" aria-label="Unread" />}
                </div>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                <time className="mt-3 block text-xs font-medium text-gray-400">{notification.date}</time>
              </div>
              <button
                type="button"
                onClick={() => dismiss(notification.id)}
                className="shrink-0 text-xs font-semibold text-gray-400 transition hover:text-black-shade-2"
              >
                Dismiss
              </button>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="font-semibold text-black-shade-2">You&apos;re all caught up</h2>
            <p className="mt-1 text-sm text-gray-500">New account activity will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
