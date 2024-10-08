import React, { ReactNode, Suspense } from "react";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Suspense>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Nav />
              {children}
            </main>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
