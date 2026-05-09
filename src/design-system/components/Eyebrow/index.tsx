import styles from "./Eyebrow.module.scss";

export function Eyebrow({
  children,
  index,
  tone = "light",
}: {
  children: React.ReactNode;
  index?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={`${styles.root} ${tone === "dark" ? styles.rootDark : ""}`}>
      {index ? <span className={styles.num}>{index}</span> : null}
      <span>{children}</span>
    </div>
  );
}
