
interface DayplannerItem {
  time?: string;  // Should really be date
  content: string;
}

interface DayplannerDay {
  items: DayplannerItem[];
}
