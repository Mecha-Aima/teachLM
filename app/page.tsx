import React from 'react'
import TeacherCard from '@/components/TeacherCard'
import TeachersList from '@/components/TeachersList'
import CTA from '@/components/CTA'
import { getAllTeachers, getRecentSessions } from '@/lib/actions/teacher.actions'
import { getSubjectColor } from '@/lib/utils'


const Page = async () => {
  const teachers = await getAllTeachers({ limit: 3});
  const recentSessionTeachers = await getRecentSessions(10);
  
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Teachers</h1>
      <section className='home-section'>
        {teachers.map((teacher) => (
          <TeacherCard 
            key={teacher.id}
            { ...teacher }
            color={getSubjectColor(teacher.subject)}
        />
        ))}
        
        
      </section>

      <section className='home-section'>
        <TeachersList 
            title="Recently Completed Sessions"
            teachers={recentSessionTeachers}
            classNames="w-2/3 max-lg:w-full"
        />
        <CTA /> 
      </section>
    </main>
  )
}

export default Page