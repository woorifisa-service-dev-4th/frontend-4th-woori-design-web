import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col p-6">
        {children}
      </body>
    </html>
  );
}
