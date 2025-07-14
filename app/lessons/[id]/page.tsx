import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSubjectColor } from "@/lib/utils";
import { getLesson } from "@/lib/actions/lesson.actions";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

const LessonPage = async ({ params }: LessonPageProps) => {
  const { id } = await params;
  const user = await currentUser();
  
  if (!user) redirect('/sign-in');

  const lesson = await getLesson(id);
  if (!lesson) {
    return (
      <main className="mb-16">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Lesson not found</h2>
          <p className="text-gray-500 mb-6">The lesson you're looking for doesn't exist or has been removed.</p>
          <Link href="/lessons" className="btn-primary">
            Back to Lessons
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mb-16">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link 
          href="/lessons" 
          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 hover:underline transition-colors"
        >
          <Image src="/icons/back.svg" alt="back" width={16} height={16} />
          Back to Lessons
        </Link>
      </div>

      {/* Lesson Header */}
      <article className="rounded-border bg-white shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
          <div className="flex flex-col items-start justify-start gap-4">
            <div 
              className="w-24 h-24 flex items-center justify-center rounded-xl"
              style={{ backgroundColor: getSubjectColor(lesson.teacher?.subject || 'maths') }}
            >
              <Image 
                src={`/icons/${lesson.teacher?.subject || 'maths'}.svg`} 
                alt={lesson.teacher?.subject || 'maths'}
                width={40} 
                height={40} 
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <div className="flex items-center gap-3 mb-2">
                <span className="subject-badge" style={{ background: getSubjectColor(lesson.teacher?.subject || 'maths') }}>
                  {lesson.teacher?.subject || 'maths'}
                </span>
                <span className="text-gray-600">•</span>
                <span className="font-medium text-gray-700">{lesson.teacher?.name}</span>
              </div>
            </div>
          </div>
          <div className="text-right max-md:text-left max-md:w-full">
            <div className="text-sm text-gray-500 mb-1">Session Date</div>
            <div className="font-medium text-gray-900">
              {new Date(lesson.created_at).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="text-sm text-gray-600">
              {new Date(lesson.created_at).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Session Stats */}
        <div className="flex justify-between items-center w-full px-12 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{lesson.messages.length}</div>
            <div className="text-sm text-gray-600">Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {lesson.messages.filter(m => m.role === 'user').length}
            </div>
            <div className="text-sm text-gray-600">Your Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {lesson.messages.filter(m => m.role === 'assistant').length}
            </div>
            <div className="text-sm text-gray-600">Tutor Responses</div>
          </div>
        </div>
      </article>

      {/* Messages Transcript */}
      <section className="rounded-border bg-white shadow-xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Session Transcript</h2>
          <p className="text-gray-600">Your conversation with {lesson.teacher?.name}</p>
        </div>

        {lesson.messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No messages recorded for this session.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
            {/* Note: messages array is in reverse order (newest first), so we reverse it for display */}
            {[...lesson.messages].reverse().map((message, index) => (
              <div 
                key={index}
                className={`flex gap-4 p-4 rounded-xl ${
                  message.role === 'assistant' 
                    ? 'bg-indigo-50 border border-indigo-100' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  {message.role === 'assistant' ? (
                    <div 
                      className="size-10 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: getSubjectColor(lesson.teacher?.subject || 'maths') }}
                    >
                      <Image 
                        src={`/icons/${lesson.teacher?.subject || 'maths'}.svg`} 
                        alt="tutor"
                        width={20} 
                        height={20} 
                      />
                    </div>
                  ) : (
                    <div className="size-10 flex items-center justify-center rounded-full bg-gray-300">
                      <span className="text-sm font-medium text-gray-700">
                        {user.firstName?.[0] || 'U'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">
                      {message.role === 'assistant' 
                        ? 'Tutor:' 
                        : 'You:'
                      }
                    </span>
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default LessonPage; 