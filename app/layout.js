import "./globals.css";
import { siteConfig } from "@/config/site";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
