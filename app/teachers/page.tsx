import { getAllTeachers } from "@/lib/actions/teacher.actions";
import TeacherCard from "@/components/TeacherCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const TeachersLibrary = async({searchParams}: SearchParams) => {
    const filters = await searchParams;

    console.log('FILTERS: ', filters);
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';
    const teachers = await getAllTeachers({ subject, topic });

    console.log('TEACHERS: ', teachers);
    
    return (
        <main>
            <section className="flex justify-between gap-8 max-sm:flex-col">
                <h1>Teacher Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid mt-8">
                {teachers.map((teacher) => (
                    <TeacherCard
                        key={teacher.id}
                        { ... teacher}
                        color={getSubjectColor(teacher.subject)}
                    />
                ))}
            </section>
        </main>
    )
}

export default TeachersLibrary