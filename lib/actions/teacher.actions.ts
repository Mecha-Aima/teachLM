'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { create } from "domain";

export const createTeacher = async (formData: CreateTeacher) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('teachers')
        .insert({ ...formData, author })
        .select();

    if ( error || !data ) throw new Error(error?.message || 'Failed to create teacher');
    return data[0];
}

export const getAllTeachers = async ({ limit = 10, page = 1, subject, topic} : GetAllTeachers) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('teachers').select();

    if (subject && topic ) {
        // search for both subject and topic (name, topic)
        query = query.ilike('subject', `%${subject}%`)
                .or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`)
    } else if (subject) {
        // search for only subject
        query = query.ilike('subject', `%${subject}%`);
    } else if (topic) {
        // search for only topic within name or topic
        query = query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}%`);
    }


    query = query.range((page - 1) * limit, page * limit - 1);
    const { data: teachers, error } = await query;
    if (error) throw new Error(error.message);

    return teachers;
}

export const getTeacher = async (id: string) => {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase.from('teachers')
        .select()
        .eq('id', id);

    if (error) return console.log(error);

    return data[0];
}

export const addToSessionHistory = async (teacherId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history').insert({
        teacher_id: teacherId,
        user_id: userId,
    })

    if (error) throw new Error(error.message);
    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`teachers:teacher_id(*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false})
        .limit(limit);

    if (error) throw new Error(error.message);

    // Remove duplicate teachers by id, keeping only the first occurrence (most recent)
    const seen = new Set();
    const uniqueTeachers = [];
    for (const { teachers } of data) {
        // If teachers is an array, use teachers[0], else use teachers
        const teacherObj = Array.isArray(teachers) ? teachers[0] : teachers;
        if (teacherObj && !seen.has(teacherObj.id)) {
            seen.add(teacherObj.id);
            uniqueTeachers.push(teacherObj);
        }
    }
    return uniqueTeachers;
}

export const getUserSessions = async (userId: string, limit = 10) => {
    // 
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`teachers:teacher_id(*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false})
        .limit(limit);

    if (error) throw new Error(error.message);

    // Remove duplicate teachers by id, keeping only the first occurrence (most recent)
    const seen = new Set();
    const uniqueTeachers = [];
    for (const { teachers } of data) {
        const teacherObj = Array.isArray(teachers) ? teachers[0] : teachers;
        if (teacherObj && !seen.has(teacherObj.id)) {
            seen.add(teacherObj.id);
            uniqueTeachers.push(teacherObj);
        }
    }
    return uniqueTeachers;
}

export const getUserTeachers = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('teachers').select('*').eq('author', userId);
    if (error) throw new Error(error.message);

    return data;
}

export const newTeacherLimits = async () => {
    const { userId, has } = await auth();
    
    let limit = 0;
    if (has({plan: 'pro_learner'})) {
        return true;
    } else if (has({ feature: '10_active_teachers'})) {
        limit = 10;
    } else if (has({ feature: '3_active_teachers'})) {
        limit = 3;
    }

    const client = createSupabaseClient();
    const { data, error } = await client.from('teachers').select('id').eq('author', userId);
    if (error) throw new Error(error.message);

    const teacherCount = data.length;
    return teacherCount < limit;
}

export const isSubscribed = async () => {
    const { userId, has } = await auth();
    if (has({plan: 'pro_learner'}) || has({plan: 'core_learner'})) {
        return true;
    }
    return false;
}

export const addBookmark = async (teacherId: string) => {
    console.log('CALLED ADD BOOKMARK');
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('user_bookmarks').insert({
        user_id: userId,
        teacher_id: teacherId
    })

    if (error) throw new Error(error.message);

    return data;
}

export const removeBookmark = async (teacherId: string) => {
    console.log('CALLED REMOVE BOOKMARK');
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('user_bookmarks').delete()
        .eq('user_id', userId)
        .eq('teacher_id', teacherId);

    if (error) throw new Error(error.message);

    return data;
}

export const getUserBookmarks = async (): Promise<Teacher[]> => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('user_bookmarks')
        .select('teachers:teacher_id(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false});

    if (error) throw new Error(error.message);

    return data.map(({ teachers }) => teachers);
}

export const isBookmarked = async (teacherId: string) => {
    console.log('CALLED ISBOOKMARKED');
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('user_bookmarks').select('*')
        .eq('user_id', userId)
        .eq('teacher_id', teacherId);

    if (error) throw new Error(error.message);

    return data.length > 0;
}