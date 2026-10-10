import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS Studio | Ash Ali Content Management System",
  description: "Secure Content Management System for editing, adding and removing content on ashali.com",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function CMSAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
      </head>
      <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-800">
        {children}
      </div>
    </>
  );
}
