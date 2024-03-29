import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <section className={styles.container}>
                <header className={styles.header}></header>
                <main className={styles.main}>{children}</main>
                <footer className={styles.footer}></footer>
              </section>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
