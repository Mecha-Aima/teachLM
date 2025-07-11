import TeacherForm from "@/components/TeacherForm"
import { newTeacherLimits } from "@/lib/actions/teacher.actions";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

const NewTeacher = async () => {
    const { userId } = await auth();
    if (!userId) return redirect('/sign-in');

    const canCreate = await newTeacherLimits();

    return (
        <main className="min-lg:w-1/2 min-md:w-2/3 items-center justify-center">
            {canCreate ? (
                <article className="space-y-8">
                    <div className="text-center mb-12">
                        <h1 className="mb-4">Tutor Builder</h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mx-auto"></div>
                        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
                            Create your personalized AI teacher with custom personality, voice, and expertise. 
                            Build engaging learning experiences tailored to your needs.
                        </p>
                    </div>
                    <TeacherForm />
                </article>) :
            (
                <article className="companion-limit mb-16">
                    <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100 text-center max-w-md mx-auto">
                        <Image src="/images/limit.svg" alt="Teacher limit reached" width={360} height={240} className="mx-auto mb-8" />
                        <div className="cta-badge mb-6">Upgrade your plan</div>
                        <h1 className="mb-6 text-3xl">You've reached your limit</h1>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            You've reached your tutor limit. Upgrade to create more tutors and access premium features
                        </p>
                        <Link href="/subscription" className="btn-primary w-full justify-center">
                            Upgrade my plan
                        </Link>
                    </div>
                </article>
        )}
        </main>
    )
}

export default NewTeacher