"use client";

import { ModiferChooser } from "@/components";
import { CodeChooser } from "@/components/CodeChooser";
import { calculateCodePrice } from "@/utilities/calculateCodePrice";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const Calculator = () => {
  // const [code, setCode] = useState<Code>();
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);
  const [finalModifiers, setFinalModifiers] = useState<Modifier[]>([]);
  
  const [codes, setCodes] = useState<Code[]>([]);
  const [selectedCode, setSelectedCode] = useState<Code>({id: 0, code: "", description: "", amount: 0, start_date: null, end_date: null, modifiers: []});

  const [selectedFirstModifier, setSelectedFirstModifier] = useState<Modifier>({id: 0, amount: 0, modifier_type: "", modifier_code: "", start_date: null, end_date: null});
  const [selectedSecondModifier, setSelectedSecondModifier] = useState<Modifier>({id: 0, amount: 0, modifier_type: "", modifier_code: "", start_date: null, end_date: null});
  const [selectedThirdModifier, setSelectedThirdModifier] = useState<Modifier>({id: 0, amount: 0, modifier_type: "", modifier_code: "", start_date: null, end_date: null});

  // const fetchCode = async () => {
  //   const response = await fetch(`http://localhost:3000/api/code`);
  //   setCode(await response.json());
  // };

  const fetchCodes = async () => {
    const response = await fetch(`http://localhost:3000/api/allcodes`);
    setCodes(await response.json());
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  useEffect( ()=> {

    let finalSelection = []
    selectedFirstModifier && finalSelection.push(selectedFirstModifier)
    selectedSecondModifier && finalSelection.push(selectedSecondModifier)
    selectedThirdModifier && finalSelection.push(selectedThirdModifier)
    setFinalModifiers(finalSelection)

    //Could pass final modifiers into each selector in case modifiers cannot be used multiple times

  }, [selectedFirstModifier, selectedSecondModifier, selectedThirdModifier])

  useEffect( ()=> {

    if(selectedCode){
      setModifiers(selectedCode.modifiers)

      if(finalModifiers){
        let final = calculateCodePrice({code:selectedCode, modifiers:finalModifiers})
        setFinalPrice(final)
      }
    }

  }, [selectedCode])

  useEffect( ()=> {

    if(finalModifiers && selectedCode){
      let final = calculateCodePrice({code: selectedCode, modifiers:finalModifiers})
      setFinalPrice(final)
    }

  }, [finalModifiers])


  // const finalPrice =
  //   code && modifiers ? calculateCodePrice({ code, modifiers }) : 0;

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
        <Grid item xs={12}>
          <h3>Select Code: </h3>
          <CodeChooser codes={codes || []} setSelectedCode={setSelectedCode}/>
        </Grid>
        <Grid item xs={12}>
          <h3>Select Modifiers: </h3>
        </Grid>
        <Grid item xs={4}>
          <ModiferChooser modifiers={modifiers || []} setSelectedModifier={setSelectedFirstModifier}>
            Modifier 1
          </ModiferChooser>
        </Grid>
        {selectedFirstModifier?.modifier_code && <Grid item xs={4}>
          <ModiferChooser modifiers={modifiers || []} setSelectedModifier={setSelectedSecondModifier} disabledSelect={!selectedFirstModifier}>
            Modifier 2
          </ModiferChooser>
        </Grid>}
        {selectedSecondModifier?.modifier_code && <Grid item xs={4}>
           <ModiferChooser modifiers={modifiers || []} setSelectedModifier={setSelectedThirdModifier} disabledSelect={!selectedSecondModifier}>
            Modifier 3
          </ModiferChooser>
        </Grid>}

      </Grid>

      <p style={{padding: '10px'}}>{finalPrice ? `The price is: $${(Math.round(finalPrice * 100)/100).toFixed(2)}` : `Please select a code and three modifiers`}</p>
    </main>
  );
};

export default Calculator;
