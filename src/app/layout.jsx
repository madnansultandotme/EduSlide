import "./globals.css";
import Navbar from "../components/Navbar.jsx";

export const metadata = {
  title: 'EduSlide AI - AI-Powered Educational Slide Generator',
  description: 'Generate professional educational presentations from PDFs, eBooks, or topics using AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
