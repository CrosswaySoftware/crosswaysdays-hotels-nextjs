import styles from "./DisplayHeading.module.scss";

export function DisplayHeading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return <Tag className={`${styles.display} ${className}`}>{children}</Tag>;
}
