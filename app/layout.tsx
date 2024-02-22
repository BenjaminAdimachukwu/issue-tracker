import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css"; // first we imported the default styles of radix-ui
import "./theme-config.css"; // then we import thr default  theme configuration
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import QueryClientProvider  from "@/app/QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  //display: 'swap',
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Issue-tracker",
  description: "An app for tracking Issues with code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" radius="large">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
