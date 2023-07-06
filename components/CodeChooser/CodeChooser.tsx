import { PropsWithChildren } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

type CodeChooserProps = PropsWithChildren<{
  codes: Code[];
  onChange?: (selected: Code) => void;
  setSelectedCode: Function;
}>;

export const CodeChooser = ({
  children,
  codes,
  setSelectedCode,
}: CodeChooserProps) => {
  const handleOnChange = ({ target: { value } }: SelectChangeEvent<number>) =>{
      let selected = codes.filter(({ id }) => id === value);
      setSelectedCode(selected[0])
    }
  return (
    <FormControl>
      {/* Can check if user has access to LMTS here */}
      <Select label={children} onChange={handleOnChange} >
        {codes
        .map(({ id, code }) => (
          <MenuItem key={id} value={id}>
            {code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
