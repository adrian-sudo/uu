import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner"; // Importa el Toaster de sonner

// Configura la fuente Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Ajusta los pesos según necesites
});

export const metadata: Metadata = {
  title: "Dashboard CasaLuker",
  description: "portal de inventario | casa luker ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* Aplica la clase de la fuente al body */}
        <body className={poppins.className}>
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" />{" "}
            {/* Configura la posición del Toaster */}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
