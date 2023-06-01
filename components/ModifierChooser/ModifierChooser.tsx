import { PropsWithChildren } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

type ModifierChooserProps = PropsWithChildren<{
  modifiers: Modifier[];
  onChange?: (selected: Modifier) => void;
}>;
export const ModiferChooser = ({
  children,
  modifiers,
}: ModifierChooserProps) => {
  const handleOnChange = ({ target: { value } }: SelectChangeEvent<number>) =>
    modifiers.filter(({ id }) => id === value)[0];
  return (
    <FormControl>
      <Select label={children} onChange={handleOnChange}>
        {modifiers.map(({ id, modifier_code }) => (
          <MenuItem key={id} value={id}>
            {modifier_code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
