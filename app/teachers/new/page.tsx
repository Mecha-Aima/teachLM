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
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreate ? (
                <article>
                    <h1>Tutor Builder</h1>
                    <TeacherForm />
                </article>) :
            (
                <article className="companion-limit">
                    <Image src="/images/limit.svg" alt="Teacher limit reached" width={360} height={240} />
                    <div className="cta-badge">Upgrade your plan</div>
                    <h1>You've reached your limit</h1>
                    <p>You've reached your tutor limit. Upgrade to create more tutors and access premium features</p>
                    <Link href="/subscription" className="btn-primary w-full justify-center">
                        Upgrade my plan
                    </Link>
                </article>
                
        )}
        </main>
    )
}

export default NewTeacher