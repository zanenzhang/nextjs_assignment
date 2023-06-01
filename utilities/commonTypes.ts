type Modifier = {
  id: number;
  amount: number;
  modifier_type: string;
  modifier_code: string;
  start_date: string | null;
  end_date: string | null;
};

type Code = {
  id: number;
  code: string;
  description: string;
  amount: number;
  start_date: string | null;
  end_date: string | null;
  modifiers: Modifier[];
};
