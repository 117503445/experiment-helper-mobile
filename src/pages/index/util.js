export function p(...params) {
  params = params.map((v, i) => {
    return JSON.stringify(v, null, 2);
  });
  console.log(...params);
}
