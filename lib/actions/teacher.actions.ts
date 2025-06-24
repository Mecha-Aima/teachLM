'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

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