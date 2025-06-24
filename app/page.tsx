import React from 'react'
import TeacherCard from '@/components/TeacherCard'
import TeachersList from '@/components/TeachersList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'


const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Teachers</h1>
      <section className='home-section'>
        <TeacherCard 
            id="123"
            name="Neura the Brainy Explorer"
            topic="Neural Network of the Brain"
            subject="science"
            duration={45}
            color="#ffdae6"
        />
        <TeacherCard 
            id="456"
            name="Countsy the Number Wizard"
            topic="Derivatives and Integrals"
            subject="maths"
            duration={30}
            color="#e5d0ff"
        />
        <TeacherCard 
            id="789"
            name="Verba the Vocabulary Builder" 
            topic="English Literature"
            subject="language"
            duration={60}
            color="#bde7ff"
        />
      </section>

      <section className='home-section'>
        <TeachersList 
            title="Recently Completed Sessions"
            teachers={recentSessions}
            classNames="w-2/3 max-lg:w-full"
        />
        <CTA /> 
      </section>
    </main>
  )
}

export default Page