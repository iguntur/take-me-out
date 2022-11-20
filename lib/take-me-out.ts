function splitNumbers(n: number) {
  return n
    .toString()
    .split("")
    .map((v) => parseInt(v, 10));
}

function sum(numbers: number[]) {
  const value = numbers.reduce((a, b) => a + b, 0);

  return value;
}

function deepSum(numbers: number[]) {
  let value = sum(numbers);

  if (value > 9) {
    const numberArray = splitNumbers(value);
    value = deepSum(numberArray);
  }

  return value;
}

function nameMapNumber(input: string) {
  const letters = input.split("").filter((s) => s !== "" && s !== " ");
  const codeMap: number[] = [];

  for (const l of letters) {
    codeMap.push(l.charCodeAt(0));
  }

  return codeMap;
}

export function count(name: string, partnerName: string) {
  const nameMap = nameMapNumber(name);
  const partnerNameMap = nameMapNumber(partnerName);
  const numbersMap = [...nameMap, ...partnerNameMap];
  const firstMap = [];
  const lastMap = [];

  for (const n of numbersMap) {
    const f = parseInt(n.toString().charAt(0), 10);
    const l = parseInt(n.toString().charAt(1), 10);

    firstMap.push(f);
    lastMap.push(l);
  }

  const summary1 = deepSum(firstMap);
  const summary2 = deepSum(lastMap);

  const result = [summary1, summary2].join("");

  return parseInt(result, 10);
}
