const SUPABASE_URL = 'https://cnfgxcsilmdanstiixji.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwNzY3MywiZXhwIjoxOTU1MDgzNjczfQ.T4j8T8PmMQvcyTO4egZ0EUIxHwmUeklr4DArTmn6mc0';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchCity() {
    const response = await client
        .from('cities')
        .select()
        .match({ user_id: client.auth.user().id, })
        .single();

    return checkError(response);    
}

export async function createCity(city){
    const response = await client
        .from('cities')
        .insert({
            ...city, 
            user_id: client.auth.user().id, 
        })
        .single();

    return checkError(response);
}

export async function updateWaterfront(value){
    const currentUserId = client.auth.user().id;

    // in supabase, update the waterfront property
    // for the city whose user_id match's the currently logged in user's id
    const response = await client
        .from('cities')
        .update({ waterfront: value })
        .match({ user_id: currentUserId });    

    return checkError(response);    
}

export async function updateSkyline(value){
    const currentUserId = client.auth.user().id;

    // in supabase, update the skyline property
    // for the city whose user_id match's the currently logged in user's id
    const response = await client
        .from('cities')
        .update({ skyline: value })
        .match({ user_id: currentUserId });    

    return checkError(response);    
}


export async function updateCastle(value){
    const currentUserId = client.auth.user().id;

    // in supabase, update the castle property
    // for the city whose user_id match's the currently logged in user's id
    const response = await client
        .from('cities')
        .update({ castle: value })
        .match({ user_id: currentUserId });    

    return checkError(response);    
}

export async function updateSlogans(value){
    const currentUserId = client.auth.user().id;

    // in supabase, update the slogans property
    // for the city whose user_id match's the currently logged in user's id
    const response = await client
        .from('cities')
        .update({ slogans: value })
        .match({ user_id: currentUserId });    

    return checkError(response);    
}

export async function updateName(value){
    const currentUserId = client.auth.user().id;

    // in supabase, update the name property
    // for the city whose user_id match's the currently logged in user's id
    const response = await client
        .from('cities')
        .update({ name: value })
        .match({ user_id: currentUserId });    

    return checkError(response);    
}

// everything below here should be good from the template
export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
