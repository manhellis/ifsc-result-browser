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
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
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
