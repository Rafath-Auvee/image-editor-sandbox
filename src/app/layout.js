import { Poppins } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

const poppins = Poppins({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Save The Date",
  description: "ECard Customization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://cs.iubenda.com/autoblocking/3402669.js"
        strategy="afterInteractive"
      />
      <Script
        src="//cdn.iubenda.com/cs/gpp/stub.js"
        strategy="afterInteractive"
      />
      <Script
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="afterInteractive"
      />

      <Script id="iubenda-cs" strategy="afterInteractive">
        {`   
        var _iub = _iub || [];
    _iub.csConfiguration = {
        "lang": "en",
        "siteId": 3402669,
        "cookiePolicyId": 46735824, 
        "enableRemoteConsent": "false",
        "banner":
          { 
            "acceptButtonCaptionColor":"#FFFFFF",
            "acceptButtonColor":"#0073CE",
            "acceptButtonDisplay":true,
            "backgroundColor":"#FFFFFF",
            "backgroundOverlay":true,
            "brandBackgroundColor":"#FFFFFF",
            "brandTextColor":"#000000",
            "closeButtonDisplay":false,
            "customizeButtonCaptionColor":"#4D4D4D",
            "customizeButtonColor":"#DADADA",
            "customizeButtonDisplay":true,
            "explicitWithdrawal":true,
            "listPurposes":true,
            "logo":"https://www.muezzyn.com/_next/static/media/Muezzyn_N.0867113b.svg",
            "position":"float-bottom-right",
            "rejectButtonCaptionColor":"#FFFFFF",
            "rejectButtonColor":"#0073CE",
            "rejectButtonDisplay":true,
            "showTitle":false,
            "textColor":"#000000" 
        },
        "callback": {
            "onPreferenceExpressed": function(preference) {
                console.log('onPreferenceExpressed', preference);
            }
        },
        "preferenceCookie": {
            "expireAfter": 180
        }
    };
       `}
      </Script>
      <body className={`${fraunces.variable}`}>{children}</body>
    </html>
  );
}
