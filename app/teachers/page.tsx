import { getAllTeachers, getUserBookmarks } from "@/lib/actions/teacher.actions";
import TeacherCard from "@/components/TeacherCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TeachersLibrary = async({searchParams}: SearchParams) => {
    const filters = await searchParams;

    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';
    const teachers = await getAllTeachers({ subject, topic });
    const bookmarks = await getUserBookmarks();

    return (
        <main className='mb-16'>
            <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-gray-100 rounded-xl p-1 shadow-sm">
                    <TabsTrigger 
                        value="all" 
                        className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-base font-medium px-6 py-3 rounded-lg transition-all duration-200"
                    >
                        All Tutors
                    </TabsTrigger>
                    <TabsTrigger 
                        value="bookmarked" 
                        className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-base font-medium px-6 py-3 rounded-lg transition-all duration-200"
                    >
                        Bookmarked
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="w-full pt-12">
                    <section className="flex justify-between gap-8 max-sm:flex-col border-b border-gray-200 pb-8 mb-12">
                        <div>
                            <h1 className="mb-3">Tutors Library</h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                        </div>
                        <div className="flex gap-4 max-sm:flex-col">
                            <SearchInput />
                            <SubjectFilter />
                        </div>
                    </section>
                    <section className="companions-grid">
                        {teachers.map((teacher) => (
                            <TeacherCard
                                key={teacher.id}
                                { ... teacher}
                                color={getSubjectColor(teacher.subject)}
                            />
                        ))}
                    </section>
                </TabsContent>
                <TabsContent value="bookmarked" className="w-full pt-12">
                    <section className="flex justify-between gap-8 max-sm:flex-col border-b border-gray-200 pb-8 mb-12">
                        <div>
                            <h1 className="mb-3">Bookmarked Tutors</h1>
                            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                        </div>
                    </section>
                    <section className="companions-grid">
                        {bookmarks.map((bookmark: Teacher) => (
                            <TeacherCard
                                key={bookmark.id}
                                { ... bookmark}
                                color={getSubjectColor(bookmark.subject)}
                            />
                        ))}
                    </section>
                </TabsContent>
            </Tabs>
        </main>
    )
}

export default TeachersLibrary