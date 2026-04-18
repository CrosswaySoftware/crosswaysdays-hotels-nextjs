import type { ReactNode } from "react";
import { DaysHotelFooter } from "@/components/days/layout/DaysHotelFooter";
import { DaysHotelHeader } from "@/components/days/layout/DaysHotelHeader";
import styles from "./DaysHotelShell.module.scss";

export function DaysHotelShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <DaysHotelHeader />
      <main className={styles.main}>{children}</main>
      <DaysHotelFooter />
    </div>
  );
}
