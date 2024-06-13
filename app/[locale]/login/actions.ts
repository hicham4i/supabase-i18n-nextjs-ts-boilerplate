'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        console.log(`🚀 ~~~~~~~ loginWithGoogle ~~~~~~~ error:`, error);
    }
    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
export async function loginWithGoogle() {
    const supabase = createClient()
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (data?.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
    if (error) {
        console.log(`🚀 ~~~~~~~ loginWithGoogle ~~~~~~~ error:`, error);
    }

    // revalidatePath('/', 'layout')
    // redirect('/dashboard')
}
export async function signup(formData: FormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)
    console.log(`🚀 ~~~~~~~ signup ~~~~~~~ error:`, error);

    if (error) {
        console.log(`🚀 ~~~~~~~ loginWithGoogle ~~~~~~~ error:`, error);
    }

    revalidatePath('/', 'layout')
    redirect('/account')
}