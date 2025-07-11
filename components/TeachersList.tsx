import {
    Table,
    TableBody,
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
            <div className="mb-8">
                <h2 className="font-bold text-3xl mb-3 text-gray-800">{title}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="border-gray-100 hover:bg-gray-50/50">
                    <TableHead className="text-lg font-semibold text-gray-700 w-2/3 py-4">Lessons</TableHead>
                    <TableHead className="text-lg font-semibold text-gray-700 py-4">Subject</TableHead>
                    <TableHead className="text-lg font-semibold text-gray-700 text-right py-4">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers?.map(({id, subject, name, topic, duration}) => (
                        <TableRow key={id} className="border-gray-100 hover:bg-gray-50/50 transition-colors group">
                           <TableCell className="w-[70%] max-w-[0] overflow-hidden py-4">
                            <Link href={`/teachers/${id}`}>
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex items-center justify-center rounded-xl max-md:hidden shadow-sm group-hover:shadow-md transition-shadow"
                                        style={{
                                            background: `linear-gradient(135deg, ${getSubjectColor(subject)} 0%, ${getSubjectColor(subject)}dd 100%)`,
                                            width: '72px',
                                            height: '72px',
                                            minWidth: '72px',
                                            minHeight: '72px',
                                            maxWidth: '72px',
                                            maxHeight: '72px',
                                            flex: '0 0 72px'
                                        }}
                                    >
                                        <Image src={`/icons/${subject}.svg`} alt={subject} width={26} height={26}/>
                                    </div>
                                    <div className="flex flex-col gap-2  min-w-0">
                                        <p className="font-bold text-xl truncate text-gray-800 group-hover:text-gray-900 transition-colors">
                                            {name}
                                        </p>
                                        <p className="text-sm break-words whitespace-normal text-gray-600 leading-relaxed" style={{wordBreak: 'break-word'}}>
                                            {topic}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                           </TableCell>
                           <TableCell className="py-4">
                            <div 
                                className="subject-badge w-fit max-md:hidden" 
                                style={{background: `linear-gradient(135deg, ${getSubjectColor(subject)} 0%, ${getSubjectColor(subject)}dd 100%)`}}
                            >
                                {subject}
                            </div>
                            <div 
                                className="flex items-center justify-center rounded-lg w-fit p-3 md:hidden shadow-sm" 
                                style={{background: `linear-gradient(135deg, ${getSubjectColor(subject)} 0%, ${getSubjectColor(subject)}dd 100%)`}}>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                            </div>
                           </TableCell>
                           <TableCell className="py-4">
                            <div className="flex items-center gap-3 w-full justify-end text-gray-600">
                                <p className="text-lg font-medium">
                                    {duration} {' '}
                                    <span className="max-md:hidden text-sm text-gray-500">mins</span>
                                </p>
                                <Image src="/icons/clock.svg" alt="clock" width={16} height={16} className="md:hidden opacity-70"/>
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