import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSubjectColor } from "@/lib/utils";
import { getUserLessons, deleteLessonAction } from "@/lib/actions/lesson.actions";

const LessonsPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const lessons = await getUserLessons(user.id);

  return (
    <main className="mb-16">
      <div className="mb-12">
        <h1 className="mb-3 tracking-tighter">Your Past Lessons</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
      </div>

      <section className="rounded-border bg-white shadow-xl p-8">
        {lessons.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6">
              <Image 
                src="/icons/clock.svg" 
                alt="No lessons" 
                width={64} 
                height={64} 
                className="mx-auto opacity-50"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No lessons yet</h3>
            <p className="text-gray-500 mb-6">Start a session with a tutor to see your lesson history here.</p>
            <Link 
              href="/teachers" 
              className="btn-primary inline-flex"
            >
              Find a Tutor
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Subject</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Lesson Title</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Teacher</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-4 px-2 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                        <span className="subject-badge text-xs" style={{ background: getSubjectColor(lesson.teacher?.subject || 'maths') }}>
                            {lesson.teacher?.subject || 'Unknown'}
                        </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-base text-gray-600">{lesson.title}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm text-gray-600">{lesson.teacher?.name || 'Unknown Teacher'}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm text-gray-600">
                        {new Date(lesson.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <Link 
                          href={`/lessons/${lesson.id}`}
                          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-2 hover:underline transition-colors"
                        >
                          View Transcript
                        </Link>
                        <form action={deleteLessonAction}>
                          <input type="hidden" name="lessonId" value={lesson.id} />
                          <button 
                            type="submit"
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            title={`Delete lesson: ${lesson.title}`}
                          >
                            <Image 
                              src="/icons/delete.svg" 
                              alt="Delete lesson" 
                              width={16} 
                              height={16} 
                            />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};

export default LessonsPage;
