let nums = [8, 7, 2, 5, 3, 1];
let target = 10;
let finalResult = [];
let totalNumberOfItemsInArray = nums.length;

nums.forEach((value, i) => {
  let toCompareItem = value;
  for (let j = i + 1; j < totalNumberOfItemsInArray; j++) {
    if (toCompareItem + nums[j] == target) {
      finalResult.push(`${toCompareItem}, ${nums[j]}`);
    }
  }
});

if (finalResult.length == 0) {
  console.log("Pair not found");
} else {
  finalResult.forEach((value, index) => {
    console.log(
      `Pair found (${finalResult[index]}) ${
        finalResult.length > index + 1 ? "Or" : ""
      }`
    );
  });
}
