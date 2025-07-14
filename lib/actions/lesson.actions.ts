'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

// TODO: Implement these functions when Supabase table for lessons is created

export const createLesson = async (lessonData: {
  teacherId: string;
  subject: string;
  topic: string;
  teacherName: string;
  messages: SavedMessage[];
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error('User not authenticated');
  
  const supabase = createSupabaseClient();
  
  // TODO: Implement lesson creation
  // const { data, error } = await supabase
  //   .from('lessons')
  //   .insert({
  //     user_id: userId,
  //     teacher_id: lessonData.teacherId,
  //     title: lessonData.topic,
  //     teacher: {
  //       id: lessonData.teacherId,
  //       name: lessonData.teacherName,
  //       subject: lessonData.subject,
  //       topic: lessonData.topic
  //     },
  //     messages: lessonData.messages,
  //     timestamp: new Date().toISOString(),
  //   })
  //   .select();
  const { data, error } = await supabase
    .from('lessons')
    .insert({
        user_id: userId,
        teacher_id: lessonData.teacherId,
        messages: lessonData.messages,
        title: lessonData.topic,
        created_at: new Date().toISOString(),
    })
    .select();
    
    if (error) throw new Error(error.message);
    console.log('createLesson called with:', lessonData);
    return data;
};

export const getUserLessons = async (userId: string, limit = 50): Promise<Lesson[]> => {
  const supabase = createSupabaseClient();
  
  const { data, error } = await supabase
    .from('lessons')
    .select(`
      *,
      teacher:teachers(id, name, subject, topic)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  
  // Transform data to match Lesson interface
  return (data || []).map(lesson => ({
    ...lesson,
    teacher: Array.isArray(lesson.teacher) ? lesson.teacher[0] : lesson.teacher
  }));
};

export const getLesson = async (lessonId: string): Promise<Lesson | null> => {
  const { userId } = await auth();
  if (!userId) throw new Error('User not authenticated');
  
  const supabase = createSupabaseClient();
  
  const { data, error } = await supabase
    .from('lessons')
    .select(`
      *,
      teacher:teachers(id, name, subject, topic)
    `)
    .eq('id', lessonId)
    .eq('user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw new Error(error.message);
  }
  
  // Transform data to match Lesson interface
  return {
    ...data,
    teacher: Array.isArray(data.teacher) ? data.teacher[0] : data.teacher
  };
};

export const deleteLesson = async (lessonId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error('User not authenticated');
  
  const supabase = createSupabaseClient();
  
  const { data, error } = await supabase 
    .from('lessons')
    .delete()
    .eq('id', lessonId)
    .eq('user_id', userId);
  
  if (error) throw new Error(error.message);
  console.log('deleteLesson called for lesson:', lessonId);
  return data;
};

export const deleteLessonAction = async (formData: FormData) => {
  const lessonId = formData.get('lessonId') as string;
  if (!lessonId) throw new Error('Lesson ID is required');
  
  await deleteLesson(lessonId);
  
  // Redirect back to lessons page
  const { redirect } = await import('next/navigation');
  redirect('/lessons');
}; 