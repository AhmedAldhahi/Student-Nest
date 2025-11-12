// src/components/DateInput.tsx
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

type DateInputProps = {
  label?: string;
  value?: string; // "YYYY-MM-DD"
  onChange: (isoDate: string) => void;
  minYear?: number;
  maxYear?: number;
};

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function toIso(year: number, monthIndex: number, day: number) {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export const DateInput: React.FC<DateInputProps> = ({
  label = "Start date",
  value,
  onChange,
  minYear = 1980,
  maxYear = new Date().getFullYear() + 5,
}) => {
  const parsed = useMemo(() => {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return { year: y, monthIndex: m - 1, day: d };
  }, [value]);

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(parsed?.year ?? new Date().getFullYear());
  const [monthIndex, setMonthIndex] = useState(parsed?.monthIndex ?? new Date().getMonth());
  const [day, setDay] = useState(parsed?.day ?? new Date().getDate());

  const yearOptions = useMemo(() => {
    const arr: number[] = [];
    for (let y = maxYear; y >= minYear; y--) arr.push(y);
    return arr;
  }, [minYear, maxYear]);

  const dayOptions = useMemo(() => {
    const count = daysInMonth(year, monthIndex);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [year, monthIndex]);

  const safeDay = useMemo(() => {
    const maxDay = dayOptions[dayOptions.length - 1];
    return Math.min(day, maxDay);
  }, [day, dayOptions]);

  useEffect(() => {
    if (safeDay !== day) setDay(safeDay);
  }, [safeDay]);

  const confirm = () => {
    onChange(toIso(year, monthIndex, day));
    setOpen(false);
  };

  const cancel = () => {
    if (parsed) {
      setYear(parsed.year);
      setMonthIndex(parsed.monthIndex);
      setDay(parsed.day);
    }
    setOpen(false);
  };

  const formattedValue = value
    ? new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable style={styles.field} onPress={() => setOpen(true)}>
        <Text style={[styles.valueText, !value && styles.placeholder]}>
          {formattedValue || "Select start date"}
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Select date</Text>

            <View style={styles.columns}>
              <WheelColumn
                options={months}
                selectedIndex={monthIndex}
                onSelectIndex={(i) => setMonthIndex(i)}
                flex={1}
              />
              <WheelColumn
                options={dayOptions.map((d) => String(d))}
                selectedIndex={dayOptions.indexOf(safeDay)}
                onSelectIndex={(i) => setDay(dayOptions[i])}
                flex={1}
              />
              <WheelColumn
                options={yearOptions.map((y) => String(y))}
                selectedIndex={yearOptions.indexOf(year)}
                onSelectIndex={(i) => setYear(yearOptions[i])}
                flex={1.2}
              />
            </View>

            <View style={styles.actions}>
              <Pressable style={[styles.btn, styles.btnGhost]} onPress={cancel}>
                <Text style={styles.btnGhostText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.btn, styles.btnPrimary]} onPress={confirm}>
                <Text style={styles.btnPrimaryText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

type WheelColumnProps = {
  options: string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  flex?: number;
};

const itemHeight = 40;

const WheelColumn: React.FC<WheelColumnProps> = ({
  options,
  selectedIndex,
  onSelectIndex,
  flex = 1,
}) => {
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: selectedIndex * itemHeight, animated: false });
    }
  }, [selectedIndex]);

  const onMomentumEnd = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    onSelectIndex(Math.max(0, Math.min(index, options.length - 1)));
  };

  return (
    <View style={[styles.column, { flex }]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumEnd}
        contentContainerStyle={{ paddingVertical: itemHeight * 2 }}
      >
        {options.map((opt, i) => (
          <View key={opt + i} style={[styles.item, i === selectedIndex && styles.itemSelected]}>
            <Text style={[styles.itemText, i === selectedIndex && styles.itemTextSelected]}>
              {opt}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View pointerEvents="none" style={styles.centerHighlight} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 13, color: "#666", marginBottom: 6 },
  field: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  valueText: { fontSize: 15, color: "#111" },
  placeholder: { color: "#999" },

  overlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center", alignItems: "center",
  },
  sheet: {
    width: "92%", backgroundColor: "#fff",
    borderRadius: 14, padding: 16,
    shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 6,
  },
  sheetTitle: { fontSize: 16, fontWeight: "600", color: "#222", marginBottom: 10 },

  columns: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  column: { position: "relative", height: itemHeight * 5, marginHorizontal: 6 },

  item: { height: itemHeight, justifyContent: "center", alignItems: "center" },
  itemText: { fontSize: 16, color: "#666" },
  itemTextSelected: { color: "#111", fontWeight: "600" },
  itemSelected: {
    backgroundColor: "#f0f8ff", // ✅ highlight row
    borderRadius: 6,
  },

  centerHighlight: {
    position: "absolute",
    top: (itemHeight * 5) / 2 - itemHeight / 2,
    left: 0, right: 0, height: itemHeight,
    borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#eee",
  },

  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  btn: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnGhost: { backgroundColor: "#f4f4f4" },
  btnGhostText: { color: "#333", fontWeight: "500" },
  btnPrimary: { backgroundColor: "#007aff" },
  btnPrimaryText: { color: "#fff", fontWeight: "600" },
});
