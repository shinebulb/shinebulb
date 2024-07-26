export default function includesDeep(array, value) {
    if (array !== null) {
        return array.some((subArray) => {
            return subArray.every(
                (subArrayElem, index) => subArrayElem === value[index]
            );
        });
    }
}