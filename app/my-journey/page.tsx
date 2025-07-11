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

    return (
        <main className="container mx-auto max-w-6xl p-4">
            {/* Hero Section with Profile */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-8 mb-8 shadow-lg">
                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Profile Info */}
                    <div className="lg:col-span-2 flex items-center gap-6">
                        <div className="relative">
                            <Image 
                                src={user.imageUrl} 
                                alt={user.firstName!} 
                                width={120} 
                                height={120}
                                className="rounded-2xl shadow-xl ring-4 ring-white"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-8 h-8 border-4 border-white"></div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="font-bold text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-lg text-gray-600">
                                {user.emailAddresses[0].emailAddress}
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-indigo-800 text-white rounded-full text-sm font-medium">
                                    Active Learner
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Stats Cards */}
                    <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold text-indigo-700">
                                        {sessionHistory.length}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">Sessions completed</p>
                                </div>
                                <div className="p-3 rounded-lg">
                                    <Image src='icons/check.svg' alt="check" width={36} height={36} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold text-indigo-700">
                                        {teachers.length}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">Tutors created</p>
                                </div>
                                <div className="p-3 rounded-lg">
                                    <Image src='icons/cap.svg' alt="cap" width={36} height={36} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="grid lg:grid-cols-1 gap-8">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value="recent" className="border-none">
                            <AccordionTrigger className="text-xl font-bold px-8 py-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Image src='icons/clock.svg' alt="recent" width={24} height={24} />
                                    </div>
                                    Recent Sessions
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-8 pb-6">
                                <div className="border-t border-gray-200 pt-6">
                                    <TeachersList title={'Recent sessions'} teachers={sessionHistory} classNames=""/>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value='teachers' className="border-none">
                            <AccordionTrigger className="text-xl font-bold px-8 py-6 hover:bg-gray-50 transition-colors border-t border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Image src='icons/cap.svg' alt="tutors" width={24} height={24} />
                                    </div>
                                    My Tutors 
                                    <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-sm font-normal">
                                        {teachers.length}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-8 pb-6">
                                <div className="border-t border-gray-200 pt-6">
                                    <TeachersList title={'My Tutors'} teachers={teachers} classNames=""/>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </main>
    )
}

export default Profile