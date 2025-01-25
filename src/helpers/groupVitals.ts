import { Vitals_List } from "@/types/type";

const groupedBYdate = (arr: Vitals_List[] ): { date: string; measure: Vitals_List[] }[] => {

    const groupedArray: { date: string; measure: Vitals_List[] }[] = [];

    for (let elem of arr) {

        const { date } = elem;


        const existingGroup = groupedArray.find(group => group.date === date);

        if (existingGroup) {

            existingGroup.measure.push(elem);
        } else {

            groupedArray.push({ date, measure: [elem] });
        }
    }

    return groupedArray
};

export default groupedBYdate