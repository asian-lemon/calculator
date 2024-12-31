export const metadata = {
  title: "Next.js Calculator App",
  description: "A simple calculator app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <h1>Calculator App</h1>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 Calculator App</p>
        </footer>
      </body>
    </html>
  );
}
