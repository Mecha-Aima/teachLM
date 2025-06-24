import TeacherForm from "@/components/TeacherForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const NewTeacher = async () => {
    const { userId } = await auth();
    if (!userId) return redirect('/sign-in');

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            <article>
                <h1>Teacher Builder</h1>
                <TeacherForm />
            </article>
        </main>
    )
}

export default NewTeacher