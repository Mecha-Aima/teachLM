import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { getUserSessions, getUserTeachers } from "@/lib/actions/teacher.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import Image from "next/image";
import TeachersList from "@/components/TeachersList";

const Profile = async () => {
    const user = await currentUser();
    if (!user) redirect('/sign-in');

    const teachers = await getUserTeachers(user.id);
    const sessionHistory = await getUserSessions(user.id);
    console.log(sessionHistory);

    return (
        <main className="lg:w-3/4">
            <section className="flex justify-between items-center gap-4 max-sm:flex-col">
                <div className="flex gap-4 items-center">
                    <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} />
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="border border-gray-800 rounded-lg p-3 gap-2 flex flex-col h-fit">
                        <div className="flex gap-2 items-center">
                            <Image src='icons/check.svg' alt="check" width={20} height={20} />
                            <p className="text-2xl font-bold">
                                {sessionHistory.length}
                            </p>
                        </div>
                        <div>Sessions completed</div>
                    </div>
                    <div className="border border-gray-800 rounded-lg p-3 gap-2 flex flex-col h-fit">
                        <div className="flex gap-2 items-center">
                            <Image src='icons/cap.svg' alt="cap" width={20} height={20} />
                            <p className="text-2xl font-bold">
                                {teachers.length}
                            </p>
                        </div>
                        <div>Teachers created</div>
                    </div>
                </div>
            </section>
            <Accordion type="multiple">
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-xl font-bold">Recent Sessions</AccordionTrigger>
                    <AccordionContent>
                    <TeachersList title={'Recent sessions'} teachers={sessionHistory} classNames="mt-4"/>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='teachers'>
                    <AccordionTrigger className="text-xl font-bold">
                        Teachers {`(${teachers.length})`}
                    </AccordionTrigger>
                    <AccordionContent>
                        <TeachersList title={'My Teachers'} teachers={teachers} classNames="mt-4"/>
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
        </main>
    )
}

export default Profile