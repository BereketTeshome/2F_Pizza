// layout.js (server-side)
import ClientRootLayout from "./ClientRootLayout"; // Import the client-side layout

export const metadata = {
  title: "2F-Pizza",
  description:
    "Allow users to order pizzas with various toppings and register multiple restaurants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Include the client-side layout */}
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
