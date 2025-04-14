
// features missing?
// I think they want me to infer what this does based on the name
// all the api calls in the readme are working
// I can create workers and workplaces with an api call in postman

// top workplaces: workplaces with the most shifts?
// will need to make an api call for this?
// from shifts we can count workplaceId, make a list of workplaceId, map to name with /workplaces
// but this is in /scripts not modules... so maybe something different?


// just a test function, seeing if I can get this called somewhere else
// I'm pretty sure a call like this would be called in workplaces (e.g. workplaces/top-workplaces)
// I don't think they want a new api call added though...
export function formatWorkerName(name: string): string{
	console.log("TODO: Implement me!");
	return name.trim().toLowerCase();
}
