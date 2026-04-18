import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Arabic, Poppins } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DaysHotelShell } from "@/components/days/shell/DaysHotelShell";
import { routing } from "@/i18n/routing";
import "@/styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Crossway Days Hotel | OMR Chennai",
    ar: "فندق كروسواي دايز | أومر تشيناي",
    fr: "Crossway Days Hotel | OMR Chennai",
  };
  const descriptions: Record<string, string> = {
    en: "Crossway Days Hotel Chennai OMR combines superior hospitality with ultra-modern amenities to offer an experience of a lifetime.",
    ar: "يجمع فندق كروسواي دايز في أومر تشيناي بين ضيافة رفيعة ومرافق عصرية لتجربة لا تُنسى.",
    fr: "Le Crossway Days Hotel Chennai OMR allie hospitalité supérieure et équipements ultramodernes pour une expérience inoubliable.",
  };
  return {
    title: {
      default: titles[locale] ?? titles.en,
      template: `%s | ${titles[locale] ?? titles.en}`,
    },
    description: descriptions[locale] ?? descriptions.en,
    icons: { icon: "/favicon.png" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${poppins.variable} ${arabic.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3XY5PG7RCJ" strategy="afterInteractive" />
        <Script id="ga-days" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3XY5PG7RCJ');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          <DaysHotelShell>{children}</DaysHotelShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
