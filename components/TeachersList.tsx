import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface TeachersListProps {
    title: string;
    teachers?: Teacher[];
    classNames: string;

}

const TeachersList = ({ title, teachers, classNames }: TeachersListProps) => {
    return (
        <article className={cn('companion-list', classNames)}>
            <h2 className="font-bold text-3xl">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-lg w-2/3">Lessons</TableHead>
                    <TableHead className="text-lg">Subject</TableHead>
                    <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers?.map(({id, subject, name, topic, duration}) => (
                        <TableRow key={id}>
                           <TableCell className="w-[70%] max-w-[0] overflow-hidden">
                            <Link href={`/teachers/${id}`}>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex items-center justify-center rounded-lg max-md:hidden"
                                        style={{
                                            backgroundColor: getSubjectColor(subject),
                                            width: '72px',
                                            height: '72px',
                                            minWidth: '72px',
                                            minHeight: '72px',
                                            maxWidth: '72px',
                                            maxHeight: '72px',
                                            flex: '0 0 72px'
                                        }}
                                    >
                                        <Image src={`/icons/${subject}.svg`} alt={subject} width={24} height={24}/>
                                    </div>
                                    <div className="flex flex-col gap-1.5  min-w-0">
                                        <p className="font-bold text-xl truncate">
                                            {name}
                                        </p>
                                        <p className="text-md break-words whitespace-normal" style={{wordBreak: 'break-word'}}>
                                            {topic}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                           </TableCell>
                           <TableCell>
                            <div className="subject-badge w-fit max-md:hidden">
                                {subject}
                            </div>
                            <div 
                                className="flex items-center justify-center rounded-md w-fit p-2 md:hidden" 
                                style={{backgroundColor: getSubjectColor(subject)}}>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={16} height={16} />
                            </div>
                           </TableCell>
                           <TableCell>
                            <div className="flex items-center gap-2 w-full justify-end">
                                <p className="text-xl">
                                    {duration} {' '}
                                    <span className="max-md:hidden text-sm">mins</span>
                                </p>
                                <Image src="/icons/clock.svg" alt="clock" width={14} height={14} className="md:hidden"/>
                            </div>
                           </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
        </article>
    )
}

export default TeachersList