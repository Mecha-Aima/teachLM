import TeacherComponent from "@/components/TeacherComponent";
import { getTeacher } from "@/lib/actions/teacher.actions"
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

interface TeacherSessionProps {
    params: Promise<{ id: string }>
}

const TeacherSession = async ({ params }: TeacherSessionProps) => {
    const { id } = await params;
    const teacher = await getTeacher(id);
    const user = await currentUser();

    if (!user) redirect("/sign-in");
    if (!teacher) redirect("/teachers");



    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div className="size-[72px] flex items-center justify-center rounded-md max-md:hidden" style={{ backgroundColor: getSubjectColor(teacher.subject)}}>
                        <Image src={`/icons/${teacher.subject}.svg`} alt={teacher.subject} width={24} height={24} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 ">
                            <p className="font-bold text-2xl">
                                {teacher.name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {teacher.subject}
                            </div>
                        </div>
                        <p className="text-md">{teacher.topic}</p>
                    </div>
                </div>
                <div className="flex items-start text-2xl max-md:hidden">
                    {teacher.duration} min 
                </div>
            </article>
            <TeacherComponent 
                {...teacher}
                teacherId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default TeacherSession;