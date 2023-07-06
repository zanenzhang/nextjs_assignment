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
  setSelectedModifier: Function;
  disabledSelect?: boolean | undefined,
}>;

export const ModiferChooser = ({
  children,
  modifiers,
  setSelectedModifier,
  disabledSelect,
}: ModifierChooserProps) => {
  const handleOnChange = ({ target: { value } }: SelectChangeEvent<number>) =>{
      let selected = modifiers.filter(({ id }) => id === value)[0];
      setSelectedModifier(selected)
    }
  return (
    <FormControl>
      {/* Can check if user has access to LMTS here */}
      <Select label={children} onChange={handleOnChange} disabled={disabledSelect}>
        {modifiers
        .filter(({modifier_code})=>(
          modifier_code !== 'LMTS'
        ))
        .map(({ id, modifier_code }) => (
          <MenuItem key={id} value={id}>
            {modifier_code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
