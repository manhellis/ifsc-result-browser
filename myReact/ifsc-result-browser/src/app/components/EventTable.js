import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import EventRow from "./EventRow";

const EventTable = ({ filteredEvents }) => {
    // Your component logic here

    return (
        // JSX code for rendering the component
        <Table className="">
            <TableCaption>Selected Events</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">City</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Disciplines</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredEvents.map((event, index) => (
                    <EventRow key={index} event={event} />
                ))}
            </TableBody>
        </Table>
    );
};

export default EventTable;
