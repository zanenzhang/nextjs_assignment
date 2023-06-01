"use client";

import { ModiferChooser } from "@/components";
import { calculateCodePrice } from "@/utilities/calculateCodePrice";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const Calculator = () => {
  const [code, setCode] = useState<Code>();
  const [modifiers, setModifiers] = useState<Modifier[]>([]);

  const fetchCode = async () => {
    const response = await fetch(`/api/code`);
    setCode(await response.json());
  };

  useEffect(() => {
    fetchCode();
  }, []);

  const finalPrice =
    code && modifiers ? calculateCodePrice({ code, modifiers }) : 0;

  return (
    <main className="">
      <h1>Calculator</h1>
      <h3>Context</h3>
      <p>
        When a physician treats a patient, we call that an encounter. During
        that encounter, the physician performs multiple procedures which we
        refer to as codes.
      </p>
      <p>
        Each code can have up to 3 modifiers which modify the base price based
        on many factors such the patient, the location, the time, how many
        procedures, etc...
      </p>
      <p>
        Our goal is to calculate the price of a single code based on the
        combination of modifiers the user can select
      </p>
      <p>TODO:</p>
      <ul>
        <li>Fix the UI to change the price when modifiers change</li>
        <li>
          Users should not be able to select modifiers that are of modifier_type
          LMTS
        </li>
        <li>
          Only display modifier 2 if modifier 1 is set, modifier 3 if modifier 2
          is set
        </li>
      </ul>
      <p>
        Bonus: Add an endpoint for retrieving multiple codes and let a user
        build a full encounter
      </p>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ModiferChooser modifiers={code?.modifiers || []}>
            Modifier 1
          </ModiferChooser>
        </Grid>
        <Grid item xs={4}>
          <ModiferChooser modifiers={code?.modifiers || []}>
            Modifier 2
          </ModiferChooser>
        </Grid>
        <Grid item xs={4}>
          <ModiferChooser modifiers={code?.modifiers || []}>
            Modifier 3
          </ModiferChooser>
        </Grid>
      </Grid>

      <p>The Price is: {finalPrice}</p>
    </main>
  );
};

export default Calculator;
