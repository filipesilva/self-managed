
interface DayplannerItem {
  time?: Date;
  content: string;
}

interface DayplannerDay {
  date: Date;
  items: DayplannerItem[];
}
