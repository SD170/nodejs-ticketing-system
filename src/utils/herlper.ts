import PRIORITIES from './prioriyList';
export const getHigherPriorityTitles =(priority:string) => {
    const sortedPriorities = Object.values(PRIORITIES).sort((p1, p2) => {
        return p2.PRIORITY - p1.PRIORITY;
    })

    const sortedPrioritiesTitles = sortedPriorities.map(p=>p.TITLE);
    console.log("sortedPrioritiesTitles", sortedPrioritiesTitles);
    const priorityIdx = sortedPrioritiesTitles.indexOf(priority);
    
    if(priorityIdx === -1){
        throw("invalidvalid priority")
    }
    console.log("sortedPrioritiesTitles.slice(priorityIdx+1)", sortedPrioritiesTitles.slice(priorityIdx+1));

    return sortedPrioritiesTitles.slice(priorityIdx+1);
    
}