"use client";

import { useLocale } from "next-intl";
import { addDays, format, startOfDay } from "date-fns";
import { arSA, enUS, fr } from "date-fns/locale";
import { useEffect, useId, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { RESAVENUE_REG_CODE } from "@/lib/resavenueBooking";
import calStyles from "./DaysBookingDatePicker.module.scss";
import styles from "./DaysBookingPanel.module.scss";

export type DaysBookingLabels = {
  title: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  adults: string;
  children: string;
  submit: string;
  placeholderDate: string;
  childNone: string;
};

type SelectOption = { value: string; label: string };

function CustomSelect({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? "";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={`${styles.field} ${styles.fieldCustomSelect}`} ref={wrapRef}>
      <span id={`${listId}-label`}>{label}</span>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={`${styles.dropdownTrigger} ${styles.dropdownTriggerCompact}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${listId}-label`}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.dropdownValue}>{displayLabel}</span>
        <span className={styles.chevron} aria-hidden />
      </button>
      {open ? (
        <ul className={styles.dropdownList} id={listId} role="listbox" aria-labelledby={`${listId}-label`}>
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button
                type="button"
                className={`${styles.dropdownOption} ${o.value === value ? styles.dropdownOptionActive : ""}`}
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ThemedDatePicker({
  label,
  value,
  onChange,
  minDate,
  placeholder,
  dateLocale,
  dir,
}: {
  label: string;
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
  minDate: Date;
  placeholder: string;
  dateLocale: typeof enUS | typeof fr | typeof arSA;
  dir: "ltr" | "rtl";
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const display = value ? format(value, "dd/MM/yyyy", { locale: dateLocale }) : null;

  return (
    <div className={`${styles.field} ${styles.fieldDate}`} ref={wrapRef}>
      <span>{label}</span>
      <button
        type="button"
        className={styles.dateTrigger}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={display ? undefined : styles.datePlaceholder}>{display ?? placeholder}</span>
        <span className={calStyles.calendarIcon} aria-hidden />
      </button>
      {open ? (
        <div className={calStyles.popover} dir={dir} role="dialog" aria-label={label}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange(d);
              setOpen(false);
            }}
            disabled={{ before: minDate }}
            locale={dateLocale}
            dir={dir}
            captionLayout="label"
            className={calStyles.themedPicker}
            defaultMonth={value ?? minDate}
          />
        </div>
      ) : null}
    </div>
  );
}

export function DaysBookingPanel({ labels, prominent = false }: { labels: DaysBookingLabels; prominent?: boolean }) {
  const intlLocale = useLocale();
  const dir: "ltr" | "rtl" = intlLocale === "ar" ? "rtl" : "ltr";
  const dateLocale = intlLocale === "ar" ? arSA : intlLocale === "fr" ? fr : enUS;

  const today = startOfDay(new Date());
  const [checkIn, setCheckIn] = useState<Date | undefined>(() => today);
  const [checkOut, setCheckOut] = useState<Date | undefined>(() => addDays(today, 1));

  const [rooms, setRooms] = useState("1");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const checkOutMin = checkIn ? addDays(startOfDay(checkIn), 1) : addDays(today, 1);

  useEffect(() => {
    if (!checkIn) return;
    setCheckOut((prev) => {
      const min = addDays(startOfDay(checkIn), 1);
      if (!prev || startOfDay(prev).getTime() <= startOfDay(checkIn).getTime()) {
        return min;
      }
      return prev;
    });
  }, [checkIn]);

  const roomOptions: SelectOption[] = [1, 2, 3, 4, 5].map((n) => ({
    value: String(n),
    label: String(n),
  }));
  const adultOptions: SelectOption[] = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  const childOptions: SelectOption[] = [
    { value: "0", label: labels.childNone },
    ...[1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) })),
  ];

  const hiddenFields = (
    <>
      <input type="hidden" name="curr" value="INR" />
      <input type="hidden" name="regCode" value={RESAVENUE_REG_CODE} />
      <input type="hidden" name="arr_date" value={checkIn ? format(checkIn, "dd-MM-yyyy") : ""} />
      <input type="hidden" name="dep_date" value={checkOut ? format(checkOut, "dd-MM-yyyy") : ""} />
    </>
  );

  const prominentBody = (
    <div className={styles.barInner}>
      <div className={styles.barRow}>
        <div className={styles.segment}>
          <ThemedDatePicker
            label={labels.checkIn}
            value={checkIn}
            onChange={setCheckIn}
            minDate={today}
            placeholder={labels.placeholderDate}
            dateLocale={dateLocale}
            dir={dir}
          />
        </div>
        <div className={styles.segment}>
          <ThemedDatePicker
            label={labels.checkOut}
            value={checkOut}
            onChange={setCheckOut}
            minDate={checkOutMin}
            placeholder={labels.placeholderDate}
            dateLocale={dateLocale}
            dir={dir}
          />
        </div>
        <div className={styles.segment}>
          <CustomSelect name="roomNo" label={labels.rooms} options={roomOptions} value={rooms} onChange={setRooms} />
        </div>
        <div className={styles.segment}>
          <CustomSelect name="adult_1" label={labels.adults} options={adultOptions} value={adults} onChange={setAdults} />
        </div>
        <div className={styles.segment}>
          <CustomSelect
            name="child_1"
            label={labels.children}
            options={childOptions}
            value={children}
            onChange={setChildren}
          />
        </div>
        <div className={`${styles.submitWrap} ${styles.submitSegment}`}>
          <button type="submit" className={styles.submit}>
            <span>{labels.submit}</span>
            <span className={styles.submitArrow} aria-hidden>
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const compactBody = (
    <div className={styles.barInner}>
      <div className={styles.barFields}>
        <ThemedDatePicker
          label={labels.checkIn}
          value={checkIn}
          onChange={setCheckIn}
          minDate={today}
          placeholder={labels.placeholderDate}
          dateLocale={dateLocale}
          dir={dir}
        />
        <ThemedDatePicker
          label={labels.checkOut}
          value={checkOut}
          onChange={setCheckOut}
          minDate={checkOutMin}
          placeholder={labels.placeholderDate}
          dateLocale={dateLocale}
          dir={dir}
        />

        <CustomSelect name="roomNo" label={labels.rooms} options={roomOptions} value={rooms} onChange={setRooms} />
        <CustomSelect name="adult_1" label={labels.adults} options={adultOptions} value={adults} onChange={setAdults} />
        <CustomSelect
          name="child_1"
          label={labels.children}
          options={childOptions}
          value={children}
          onChange={setChildren}
        />

        <div className={styles.submitWrap}>
          <button type="submit" className={styles.submit}>
            {labels.submit}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <form
      className={`${styles.barRoot} ${prominent ? styles.barRootProminent : ""}`}
      action="https://bookings.resavenue.com/resBooking4/searchRooms"
      method="get"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labels.title}
    >
      {hiddenFields}
      {prominent ? prominentBody : compactBody}
    </form>
  );
}
