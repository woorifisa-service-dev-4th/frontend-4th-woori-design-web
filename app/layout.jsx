import "./globals.css";
import Header from "../components/header.jsx";
import Sidebar from "../components/sidebar.jsx";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="flex min-h-screen flex-col w-full">
        <Header />

        <div className="flex flex-1">
            <Sidebar />

            <main className="flex-1 p-6">{children}</main>
        </div>
        </body>
        </html>
    );
}
