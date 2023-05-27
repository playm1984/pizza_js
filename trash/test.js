function test(arr) {
  let obj = {};
  let num = 0;

  arr.forEach((el) => {
    if (!obj.hasOwnProperty(el)) {
      obj[el] = 1;
    } else {
      obj[el] += 1;
    }
  });

  for (const key in obj) {
    if (obj[key] < 2) {
      num += +key;
    }
  }
  return num;
}
console.log(test([1, 1, 2, 3]));
