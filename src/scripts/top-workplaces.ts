import { PrismaClient } from '@prisma/client';

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
// I don't think they want a new api call added though, given this isn't a node module or anything


// OR we could make our own calls which would just fetch us all the data and then sort it here
// just to show that I can I'm going to make my own calls to get everything and then sort it + display it

const prisma = new PrismaClient();

export async function getTopWorkplacesFunction() {

	// query shifts: count occurrences for each workplace Id,
	// return array of objects consisting of workplace id and a count of how many shifts are associated with said id
	const shiftCounts = await prisma.shift.groupBy({
      by: ['workplaceId'],
      _count: {
        workplaceId: true
      },
      orderBy: {
        _count: {
          workplaceId: "desc"
        }
      }
    });

	// format the workplaceid/shiftcount objects
    const formattedShiftCounts = Object.fromEntries(
      shiftCounts.map(
        (item) => [item.workplaceId, item._count.workplaceId] // makes things easier for lookup
      )
    );

	// now get workplaces...
	const workplaces = await prisma.workplace.findMany({
		  orderBy: { id: "asc" },
	});

	// transform each workplace object to have a shiftCount property
	// and map its value from the formattedShiftCounts array
	const topWorkplaces = workplaces
		.map((wp) => ({
			...wp,
			shiftCount: formattedShiftCounts[wp.id] || 0 // if workplace has no shifts, set to 0
		})
	).sort((a, b) => b.shiftCount - a.shiftCount);

	return topWorkplaces;
}