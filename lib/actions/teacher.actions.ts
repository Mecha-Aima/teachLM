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