export function chunkArray(array, chunkSize) {
    let index = 0;
    let arrayLength = array.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
        let myChunk = array.slice(index, index + chunkSize);
        tempArray.push(myChunk);
    }

    return tempArray;
}