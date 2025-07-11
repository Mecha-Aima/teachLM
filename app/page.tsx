import React from 'react'
import TeacherCard from '@/components/TeacherCard'
import TeachersList from '@/components/TeachersList'
import CTA from '@/components/CTA'
import { getAllTeachers, getRecentSessions } from '@/lib/actions/teacher.actions'
import { getSubjectColor } from '@/lib/utils'

const Page = async () => {
  const teachers = await getAllTeachers({ limit: 4});
  const recentSessionTeachers = await getRecentSessions(10);
  
  return (
    <main className='mb-16'>
      <div className="mb-12">
        <h1 className='mb-3'>Popular Tutors</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
      </div>
      <section className="flex flex-col lg:flex-row gap-4 items-start w-full">
        {/* 2x2 grid of teacher cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2 w-full min-w-[320px]">
          {teachers.map((teacher) => (
            <div className="flex w-full" key={teacher.id}>
              <TeacherCard 
                { ...teacher }
                color={getSubjectColor(teacher.subject)}
              />
            </div>
          ))}
        </div>
        {/* CTA, fixed width on desktop, responsive on mobile */}
        <div className="w-full lg:w-[380px] flex-shrink-0 flex justify-center lg:mt-0">
          <CTA />
        </div>
      </section>

      {/* Recently completed sessions table at the bottom */}
      <section className="flex justify-center">
        <TeachersList 
            title="Recently Completed Sessions"
            teachers={recentSessionTeachers}
            classNames="w-3/4"
        />
      </section>
    </main>
  )
}

export default Page