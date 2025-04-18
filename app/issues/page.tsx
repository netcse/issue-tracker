import {prisma} from "@/prisma/client";
import {Table} from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import {Link, IssueStatusBadge} from "@/app/components";
import {Status} from "@prisma/client";

interface Props {
    searchParams: { status?: string }
}

const IssuesPage = async ({searchParams}: Props) => {
    const status = searchParams?.status;

    // console.log(searchParams)

    const issues = await prisma.issue.findMany({
        where: {
            status: status as Status
        }
    });

    return (
        <div>
            <IssueActions/>
            <Table.Root variant="surface" className="mb-4">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status}/>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status}/>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssuesPage;
