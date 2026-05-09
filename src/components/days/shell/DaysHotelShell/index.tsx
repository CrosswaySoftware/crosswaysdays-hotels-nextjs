import type { ReactNode } from "react";
import { DaysHotelFooter } from "@/components/days/layout/DaysHotelFooter";
import { DaysV2Header } from "@/components/hotel-v2/layout/DaysV2Header";
import styles from "./DaysHotelShell.module.scss";

export function DaysHotelShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <DaysV2Header />
      <main className={styles.main}>{children}</main>
      <DaysHotelFooter />
    </div>
  );
}
