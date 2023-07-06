import code from "../../../api/code/code.json";

export default function handler(req: any, res: any) {
    console.log(code)
    res.status(200).json(code)
  }